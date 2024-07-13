document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get("id");
  const dataArray = JSON.parse(localStorage.getItem("dataArray"));
  const taskDetails = dataArray.find((task) => task.id == taskId);
  const button = document.getElementById("change-status");
  console.log("taskId", taskId);
  console.log("dataArray", dataArray);
  console.log("taskDetails", taskDetails);
  if (taskDetails) {
    document.getElementById("id-details").textContent =
    taskDetails.id;
    document.getElementById("description-details").textContent =
      taskDetails.text;
    document.getElementById("tags-details").textContent = taskDetails.Tags;
    document.getElementById("status-details").textContent =
      taskDetails.is_complete;
    document.getElementById("date-details").textContent =
      taskDetails.created_at;
    if (taskDetails.is_complete === "true") {
      button.textContent = "Mark as not complete";
    } else {
      button.textContent = "Mark as complete";
    }
  }
});

function updateStatusButton() {
  const button = document.getElementById("change-status");
  const status = document.getElementById("status-details").textContent;
  if (status === "false") {
    updateStatus("true");
  } else {
    updateStatus("false");
  }
}

async function updateStatus(status) {
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get("id");
  const dataArray = JSON.parse(localStorage.getItem("dataArray"));
  const taskDetails = dataArray.find((task) => task.id == taskId);
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
        window.location.href = `../index/index.html`;
      })
      .catch((error) => {
        // Handle error
        console.error("Error modifying task:", error);
      });
  } catch (e) {
    console.log(e);
  }
}

function deleteThisTodo() {
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get("id");
  console.log(taskId)
  try {
    fetch(`http://localhost:3000/todos/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete task");
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((data) => {
        // Handle success response
        console.log("Task modified deleted:", data);
        window.location.href = `../index/index.html`;
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting task:", error);
      });
  } catch (e) {
    console.log(e);
  }
}

function goToIndex() {
  window.location.href = `../index/index.html`;
}