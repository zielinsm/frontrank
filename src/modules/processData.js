function compareTotal(a, b) {
  if (a.total < b.total) return 1;
  if (a.total > b.total) return -1;
  return 0;
}

function processData(datasets) {
  let withTotal = datasets.map(el => {
    let { label, downloads, github } = el;
    let { watch, stars, forks } = github;
    let total = downloads + watch + stars + forks;
    return {
      label,
      total,
      downloads,
      github
    };
  });
  let sorted = withTotal.sort(compareTotal);
  return sorted;
}

export default processData;
