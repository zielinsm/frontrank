module.exports.lastWeek = function lastWeekRange() {
    let firstDay = new Date();
    firstDay.setDate(firstDay.getDate() - 8);
    let lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 2);
  
    const fullDate =
      firstDay.toISOString().split("T")[0] +
      ":" +
      lastDay.toISOString().split("T")[0];
    return fullDate;
  }

module.exports.today = function formattedDate() {
  let today = new Date();
  return today.toISOString().split("T")[0];
}