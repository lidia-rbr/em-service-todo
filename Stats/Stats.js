document.addEventListener("DOMContentLoaded", function () {
  const dataArray = JSON.parse(localStorage.getItem("dataArray"));

  const result = dataArray.reduce((acc, item) => {
    console.log(item.is_complete)
    if (item.is_complete === "true" || item.is_complete === true) {
        acc.trueCount++;
    } else if (item.is_complete === "false" || item.is_complete === false) {
        acc.falseCount++;
    }
    return acc;
  }, { trueCount: 0, falseCount: 0 });

  document.getElementById("nbOfTasks").textContent =
  dataArray.length;
  document.getElementById("nbOfOpenTasks").textContent =
  result.trueCount;
  document.getElementById("nbOfCloseTasks").textContent =
  result.falseCount;
});

function goToDo() {
  window.location.href = `../todo/todo.html`;
}
