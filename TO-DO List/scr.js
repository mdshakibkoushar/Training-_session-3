document.addEventListener("DOMContentLoaded", () => {
  const titleInput = document.querySelector(".task-input .title");
  const descriptionInput = document.querySelector(".task-input .description");
  const dueDateInput = document.querySelector(".task-input .due-date");
  const filters = document.querySelectorAll(".filters span");
  const searchInput = document.getElementById("search");
  const taskBox = document.querySelector(".task-box");
  const addBtn = document.querySelector(".add-btn");
  let editId;
  let isEditTask = false;

  // Retrieve tasks from local storage or initialize as empty array
  let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

  // Display tasks based on filter and search
  function showTodo(filter = "all", search = "") {
    let li = "";
    todos
      .filter((todo) => {
        return (
          (filter === "all" || filter === todo.status) &&
          (todo.title.toLowerCase().includes(search.toLowerCase()) ||
            todo.description.toLowerCase().includes(search.toLowerCase()))
        );
      })
      .forEach((todo, id) => {
        let isCompleted = todo.status === "completed" ? "checked" : "";
        li += `<li class="task">
            <label for="${id}">
              <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted} />
              <h3>${todo.title}</h3>
              <p>${todo.description}</p>
              <small>${todo.dueDate}</small>
            </label>
            <div class="settings">
              <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
              <ul class="task-menu">
                <li onclick="editTask(${id},'${todo.title}','${todo.description}','${todo.dueDate}')"><i class="uil uil-pen"></i>Edit</li>
                <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
              </ul>
            </div>
          </li>`;
      });
    taskBox.innerHTML = li || "There is no Task Here";
  }

  showTodo("all");

  // Toggle the visibility of task menu
  function showMenu(selectedTask) {
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.toggle("show");
    document.addEventListener("click", (e) => {
      if (e.target.tagName !== "I" || e.target !== selectedTask) {
        taskMenu.classList.remove("show");
      }
    });
  }

  // Edit task functionality
  window.editTask = function (taskId, title, description, dueDate) {
    if (confirm("Are you sure you want to Edit this task?")) {
      editId = taskId;
      isEditTask = true;
      titleInput.value = title;
      descriptionInput.value = description;
      dueDateInput.value = dueDate;
    }
  };

  // Delete task functionality
  window.deleteTask = function (taskId) {
    if (confirm("Are you sure you want to delete this task?")) {
      todos.splice(taskId, 1);
      localStorage.setItem("todo-list", JSON.stringify(todos));
      showTodo();
    }
  };

  // Update task status (completed/pending)
  window.updateStatus = function (selectedTask) {
    let taskIndex = selectedTask.id;
    let task = todos[taskIndex];
    task.status = selectedTask.checked ? "completed" : "pending";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(); // Refresh task list to reflect the changes
  };

  // Handle task input (add/edit task)
  addBtn.addEventListener("click", () => {
    let title = titleInput.value.trim();
    let description = descriptionInput.value.trim();
    let dueDate = dueDateInput.value.trim();

    if (title && description && dueDate) {
      if (isEditTask) {
        todos[editId] = {
          title,
          description,
          dueDate,
          status: todos[editId].status,
        };
        isEditTask = false;
      } else {
        todos.push({ title, description, dueDate, status: "pending" });
      }
      titleInput.value = "";
      descriptionInput.value = "";
      dueDateInput.value = "";
      localStorage.setItem("todo-list", JSON.stringify(todos));
      showTodo();
    }
  });

  // Filter tasks based on status
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector("span.active").classList.remove("active");
      btn.classList.add("active");
      showTodo(btn.id, searchInput.value);
    });
  });

  // Search functionality
  searchInput.addEventListener("input", () => {
    showTodo(document.querySelector("span.active").id, searchInput.value);
  });
});
