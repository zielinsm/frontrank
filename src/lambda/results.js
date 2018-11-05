// -----
// Dependencies
// -----
const MongoClient = require("mongodb").MongoClient;

// -----
// Modules
// -----
const ghStats = require("./modules/github");
const npmDownloads = require("./modules/npm");

// -----
// Utilities
// -----
const range = require("./utils/range");

// -----
// Dataset
// -----
const frameworks = require("../../frameworks");

// -----

let client = new MongoClient(process.env.DB_URI, { useNewUrlParser: true });

async function ensureConnection(dbClient) {
  try {
    if (!dbClient.isConnected()) {
      await dbClient.connect();
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

async function getResults() {
  try {
    const dateRange = range.lastWeek();
    let datasets = await Promise.all(
      frameworks.map(async single => {
        let downloads = await npmDownloads(single.npmModule, dateRange);
        let github = await ghStats(single.repository);
        return {
          label: single.label,
          downloads,
          github
        };
      })
    );
    return datasets;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function processRequest(dbClient) {
  try {
    await ensureConnection(dbClient);
    let db = dbClient.db();
    const cache = db.collection("dataCache");
    const cached = await cache.findOne({ type: "cachedResults" });
    if (!cached || cached.updated !== range.today()) {
      let prepared = {
        type: "cachedResults",
        updated: range.today(),
        results: await getResults()
      };
      if (!cached) {
        if (prepared !== undefined) {
          await cache.insertOne(prepared);
        }
      } else {
        await cache.replaceOne({ type: "cachedResults" }, prepared);
      }
      let { updated, results } = prepared;
      return {
        updated,
        results
      };
    } else {
      let { updated, results } = cached;
      return {
        updated,
        results
      };
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

exports.handler = async (event, context) => {
  try {
    let data = await processRequest(client);
    let response = {
      statusCode: 200,
      body: JSON.stringify(data)
    };
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
