function goToTodoIfNameIsValid() {
    const nameInput = document.getElementById("name");
    const name = nameInput.value;
    if (name !=="") {
        // Store name in local storage
        localStorage.setItem("userName", name);
        window.location.href = `../todo/todo.html`;
    } else {
        nameInput.classList.add("invalid");
        nameInput.setAttribute("placeholder", "please enter a name")
    }
}