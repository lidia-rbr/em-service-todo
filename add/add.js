// Function to add a new to-do item
function addNewTodo() {
  // Get the value from the input field
  const description = document.getElementById("description").value;
  const tagInputs = document.querySelectorAll(".add-table .tag-cell input");
  const tagsArray = [];

  tagInputs.forEach((input) => {
    if (input.value != "") {
      tagsArray.push(input.value);
    }
  });

  // Check if the input is not empty
  if (description !== "" && tagsArray.length > 0) {
    const newTask = {
      text: description,
      created_at: new Date(),
      Tags: tagsArray,
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
          if (!response.ok) {
            throw new Error("Failed to add the task");
          }
          return response.json();
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

function addTagRow() {
  // Get the table body where the rows will be added
  const tbody = document.querySelector(".add-table tbody");
  const nbrOfRows = tbody.getElementsByTagName("tr").length;

  // Create a new row element
  const newRow = document.createElement("tr");

  // Create the first column for "Tags:"
  const firstCol = document.createElement("td");
  firstCol.className = "add-firstCol";
  firstCol.textContent = `Tag ${nbrOfRows}:`;

  // Create the second column for the input and button
  const secondCol = document.createElement("td");
  secondCol.className = "tag-cell";

  // Create the input element
  const input = document.createElement("input");
  input.className = "add-input";
  input.type = "text";
  input.name = "description";
  input.id = `tag-${nbrOfRows}`;

  // Create the button element
  const button = document.createElement("button");
  button.className = "add-tag";
  button.textContent = "+";
  button.onclick = addTagRow;

  // Append the input and button to the second column
  secondCol.appendChild(input);
  secondCol.appendChild(button);

  // Append both columns to the new row
  newRow.appendChild(firstCol);
  newRow.appendChild(secondCol);

  // Append the new row to the table body
  tbody.appendChild(newRow);
}
