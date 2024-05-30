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

// function displayTaskDetails(taskDetails) {
//   document.getElementById("description-details").textContent = taskDetails.text;
//   document.getElementById("tags-details").textContent = taskDetails.Tags;
//   document.getElementById("status-details").textContent =
//     taskDetails.is_complete;
//   document.getElementById("date-details").textContent = taskDetails.created_at;

//   const modifyButton = document.getElementById("modify-button");
//   modifyButton.textContent = "Modify";
//   modifyButton.removeEventListener("click", saveChangesHandler);
//   modifyButton.addEventListener("click", modifyHandler);
// }

// function modifyHandler() {
//   const descriptionDetails = document.getElementById("description-details");
//   const tagsDetails = document.getElementById("tags-details");
//   const statusDetails = document.getElementById("status-details");
//   const dateDetails = document.getElementById("date-details");

//   descriptionDetails.innerHTML = `<input type="text" id="description-input" value="${descriptionDetails.textContent}">`;
//   tagsDetails.innerHTML = `<input type="text" id="tags-input" value="${tagsDetails.textContent}">`;
//   statusDetails.innerHTML = `<input type="text" id="status-input" value="${statusDetails.textContent}">`;
//   dateDetails.innerHTML = `<input type="text" id="date-input" value="${dateDetails.textContent}">`;

//   const modifyButton = document.getElementById("modify-button");
//   modifyButton.textContent = "Save";
//   modifyButton.removeEventListener("click", modifyHandler);
//   modifyButton.addEventListener("click", saveChangesHandler);
// }

// function saveChangesHandler() {
//   const dataArray = JSON.parse(localStorage.getItem("dataArray")) || [];

//   const index = parseInt(
//     document.querySelector("#data-table tbody tr[data-index]").dataset.index
//   );
//   dataArray[index].text = document.getElementById("description-input").value;
//   dataArray[index].Tags = document.getElementById("tags-input").value;
//   dataArray[index].is_complete = document.getElementById("status-input").value;
//   dataArray[index].created_at = document.getElementById("date-input").value;

//   localStorage.setItem("dataArray", JSON.stringify(dataArray));

//   updateTable(dataArray);
//   document.getElementById("myModal").style.display = "none";
// }

document.addEventListener("DOMContentLoaded", function () {
  getToDoList();

  // const modal = document.getElementById("myModal");
  // const span = document.getElementsByClassName("close")[0];

  // span.onclick = function () {
  //   modal.style.display = "none";
  // };

  // window.onclick = function (event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  // };
});
