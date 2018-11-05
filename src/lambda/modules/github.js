const axios = require("axios");

module.exports = function ghStats(repository) {
    return axios
      .get(`http://api.github.com/repos/${repository}`)
      .then(response => {
        return response.data;
      })
      .then(data => {
        return {
          stars: data.stargazers_count,
          watch: data.subscribers_count,
          forks: data.forks_count,
        };
      })
      .catch(err => {
        throw new Error(err);
      });
  }