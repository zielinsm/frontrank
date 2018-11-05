const axios = require("axios");

module.exports = function npmDownloads(packageName, dateRange) {
    return axios
      .get(`https://api.npmjs.org/downloads/range/${dateRange}/${packageName}`)
      .then(response => {
        return response.data;
      })
      .then(data => {
        let totalDownloads = 0;
        data.downloads.forEach(day => {
          totalDownloads += day.downloads;
        });
        return totalDownloads;
      })
      .catch(err => {
        throw new Error(err);
      });
  }