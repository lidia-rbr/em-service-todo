// Function to add a new to-do item
function addNewTodo() {
  // Get the value from the input field
  const description = document.getElementById("description").value;
  const tags = document.getElementById("tags").value.split(",");

  // Check if the input is not empty
  if (description !== "" && tags.length > 0) {
    const newTask = {
      text: description,
      created_at: new Date(),
      Tags: tags,
      is_complete: false,
    };

    try {
      fetch(`http://localhost:3000/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => {
          console.log("dzedze");
          if (!response.ok) {
            throw new Error("Failed to add the task");
          }
          return response.json(); // Parse response JSON
        })
        .then((data) => {
          // Handle success response
          console.log("Added succesfully");
          window.location.href = `../index/index.html`;
        })
        .catch((error) => {
          // Handle error
          console.error("Error adding task:", error);
        });
    } catch (e) {
      console.log(e);
    }
  } else {
    alert("Please enter a to-do item.");
  }
}

function goToIndex() {
  window.location.href = `../index/index.html`;
}