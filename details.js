document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get("id");
  const dataArray = JSON.parse(localStorage.getItem("dataArray"));
  const taskDetails = dataArray.find(task => task.id == taskId);
  const button = document.getElementById("change-status");
  console.log("taskId", taskId);
  console.log("dataArray", dataArray);
  console.log("taskDetails", taskDetails)
  if (taskDetails) {
    document.getElementById("description-details").textContent =
      taskDetails.text;
    document.getElementById("tags-details").textContent = taskDetails.Tags;
    document.getElementById("status-details").textContent =
      taskDetails.is_complete;
    document.getElementById("date-details").textContent =
      taskDetails.created_at;
      console.log(taskDetails)
      if (taskDetails.is_complete == true) {
        button.textContent = "Mark as not complete";
      } else {
        button.textContent = "Mark as complete";
      }
  }


  // document
  //   .getElementById("change-status")
  //   .addEventListener("click", function () {
  //     // Replace the <p> element for the status with a <select> element
  //     document.getElementById("status-details").innerHTML = `
  //       <select id="status-input">
  //           <option value="true" ${taskDetails.status === "true" ? "selected" : ""}>true</option>
  //           <option value="false" ${taskDetails.status === "false" ? "selected" : ""}>false</option>
  //       </select>
  //   `;

  //     // Change button text and click handler
  //     const modifyButton = document.getElementById("modify-button");
  //     modifyButton.textContent = "Save";
  //     modifyButton.removeEventListener("click", arguments.callee);
  //     modifyButton.addEventListener("click", function () {
  //       saveChanges(dataArray);
  //     });
  //   });

  // function saveChanges(taskDetails) {
  //   const updatedStatus = document.getElementById("status-input").value;
  //   console.log("taskDetails", taskDetails);

  //   const dataArray = JSON.parse(localStorage.getItem("dataArray"));
  //   console.log("dataArray",dataArray);
  //   dataArray[taskDetails.id].is_complete = updatedStatus;
  //   localStorage.setItem("dataArray", JSON.stringify(dataArray));

  //   // Update the details page
  //   document.getElementById("status-details").innerHTML = updatedStatus;

  //   // Update database
  //   fetch(`http://localhost:3000/todos/${taskId}`, {
  //     method: "PUT", // Use PUT method for updating existing data
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(dataArray[taskDetails.id]), // Convert updatedData to JSON string
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to modify task");
  //       }
  //       return response.json(); // Parse response JSON
  //     })
  //     .then((data) => {
  //       // Handle success response
  //       console.log("Task modified successfully:", data);
  //     })
  //     .catch((error) => {
  //       // Handle error
  //       console.error("Error modifying task:", error);
  //     });

  //   // Change button text and click handler back to "Modify"
  //   const modifyButton = document.getElementById("modify-button");
  //   modifyButton.textContent = "Modify";
  //   modifyButton.removeEventListener("click", arguments.callee);
  //   modifyButton.addEventListener("click", function () {
  //     document.getElementById("status-details").innerHTML = `
  //           <select id="status-input">
  //               <option value="true" ${dataArray[taskId].status === "true" ? "selected" : ""}>true</option>
  //               <option value="false" ${dataArray[taskId].status === "false" ? "selected" : ""}>false</option>
  //           </select>
  //       `;
  //     modifyButton.textContent = "Save";
  //     modifyButton.removeEventListener("click", arguments.callee);
  //     modifyButton.addEventListener("click", function () {
  //       saveChanges(taskId);
  //     });
  //   });
  // }
});

function updateStatusButton() {
  const button = document.getElementById("change-status");
  const status = document.getElementById("status-details").textContent;
  if (status === 'false') {
    updateStatus('true');
    // document.getElementById("status-details").textContent = 'true';
    // button.textContent = "Mark as not complete";
  } else {    
    updateStatus('false');
    // document.getElementById("status-details").textContent = 'false';
    // button.textContent = "Mark as complete";
  }
}

async function updateStatus(status) {
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get("id");
  const dataArray = JSON.parse(localStorage.getItem("dataArray"));
  const taskDetails = dataArray.find(task => task.id == taskId);
  taskDetails["is_complete"] = status;
  try {
  fetch(`http://localhost:3000/todos/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to modify task");
        }
        return response.json(); // Parse response JSON
      })
      .then((data) => {
        // Handle success response
        console.log("Task modified successfully:", data);
        window.location.href = "index.html";
      })
      .catch((error) => {
        // Handle error
        console.error("Error modifying task:", error);
      });
  } catch (e) {
    console.log(e);
  }
}