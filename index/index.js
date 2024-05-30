async function getToDoList() {
  try {
    const response = await fetch("http://localhost:3000/todos");
    const res = await response.json();

    // Store the data in localStorage
    localStorage.setItem("dataArray", JSON.stringify(res[0].todolist));

    updateTable(res[0].todolist);
  } catch (e) {
    console.log(e);
  }
}

// Function to update the table
function updateTable(toDoMap) {
  const tableBody = document.querySelector("#data-table tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  toDoMap.forEach((item, index) => {
    const row = document.createElement("tr");
    row.dataset.id = item.id;
    row.style.cursor = "pointer";

    const cellDescription = document.createElement("td");
    cellDescription.textContent = item.text;

    const cellDate = document.createElement("td");
    cellDate.textContent = item.created_at;

    const cellStatus = document.createElement("td");
    cellStatus.textContent = item.is_complete;

    const cellTags = document.createElement("td");
    cellTags.textContent = item.Tags;

    const cellActions = document.createElement("td");
    cellActions.className = "centered";
    const seeDetailsIcon = document.createElement("i");
    seeDetailsIcon.className = "fas fa-eye see-details-icon";
    seeDetailsIcon.style.cursor = "pointer";

    seeDetailsIcon.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent row click event from firing
      localStorage.setItem("taskDetails", JSON.stringify(item));
      window.location.href = `../details/details.html?id=${item.id}`;
    });

    row.appendChild(cellDescription);
    row.appendChild(cellTags);
    row.appendChild(cellStatus);
    cellActions.appendChild(seeDetailsIcon);
    row.appendChild(cellActions);
    tableBody.appendChild(row);
  });
}

function displayAddForm() {
  window.location.href = `../add/add.html`;
}

document.addEventListener("DOMContentLoaded", function () {
  getToDoList();

  // Display user name in title
  let userName = localStorage.getItem("userName");
  if (userName.startsWith('"') && userName.endsWith('"')) {
    userName = userName.slice(1, -1);
  }
  document.getElementById("userName").innerText = userName;
  console.log(userName);
});
