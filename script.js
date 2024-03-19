var todos = [];
var savedTodos = localStorage.getItem("todos");
savedTodos = JSON.parse(savedTodos);

const createTodo = (judul, desc) => {
  const id = todos.length + 1;
  todos.push({
    judul: judul,
    desc: desc,
    id: id,
    isEdit: false,
    tittleEdit: "",
    descEdit: "",
  });
};

const removeTodo = (idToDelete) =>
  (todos = todos.filter((todo) => !(todo.id == idToDelete)));

const setIsEdit = (todoToEdit) => {
  todos.forEach((todo) => {
    if (todo.id == todoToEdit.id) {
      todo.isEdit = true;
    }
  });
};

const updateProperties = (todoToUpdate, inputTittle, inputDesc) => {
  todos.forEach((todo) => {
    if (todo.id === todoToUpdate.id) {
      todo.judul = inputTittle.value;
      todo.desc = inputDesc.value;
      todo.isEdit = false;
    }
  });
};

const saveTodos = () => localStorage.setItem("todos", JSON.stringify(todos));

const onAddTodo = () => {
  const tittleTodo = document.getElementById("judul");
  const judul = tittleTodo.value;
  const descTodo = document.getElementById("desc");
  const desc = descTodo.value;
  createTodo(judul, desc);
  tittleTodo.value = "";
  descTodo.value = "";
  renderTodo();
};

const onDeleteTodo = (todoToDelete) => {
  return () => {
    removeTodo(todoToDelete.id);
    renderTodo();
  };
};

const onEditTodo = (todoToEdit) => {
  return () => {
    setIsEdit(todoToEdit);
    renderTodo();
  };
};

const onUpdateTodo = (todoToUpdate, inputTittle, inputDesc) => {
  return () => {
    updateProperties(todoToUpdate, inputTittle, inputDesc);
    renderTodo();
  };
};

const renderTodo = () => {
  const todoList = document.getElementById("list");
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const TodoItems = document.createElement("li");
    TodoItems.classList.add("Todoitem");

    const TodoText = document.createElement("div");
    TodoText.classList.add("text");
    TodoItems.appendChild(TodoText);

    const TodoBtn = document.createElement("div");
    TodoBtn.classList.add("btn");
    TodoItems.appendChild(TodoBtn);

    if (todo.isEdit !== true) {
      const TodoTittle = document.createElement("label");
      TodoTittle.classList.add("TittleItem");
      TodoTittle.innerText = todo.judul;
      TodoText.appendChild(TodoTittle);

      const TodoDesc = document.createElement("label");
      TodoDesc.classList.add("DescItem");
      TodoDesc.innerText = todo.desc;
      TodoText.appendChild(TodoDesc);

      const EditBtn = document.createElement("span");
      EditBtn.classList.add("btn-edit");
      EditBtn.classList.add("material-symbols-outlined");
      EditBtn.innerText = "edit";
      EditBtn.onclick = onEditTodo(todo);
      TodoBtn.appendChild(EditBtn);

      const DeleteBtn = document.createElement("span");
      DeleteBtn.classList.add("btn-delete");
      DeleteBtn.classList.add("material-symbols-outlined");
      DeleteBtn.innerText = "delete";
      DeleteBtn.onclick = onDeleteTodo(todo);
      TodoBtn.appendChild(DeleteBtn);
    } else {
      const EditTxt = document.createElement("h2");
      EditTxt.innerText = "Edit Todo";
      TodoText.appendChild(EditTxt);

      const inputTittleEdit = document.createElement("input");
      inputTittleEdit.placeholder = "Edit title";
      inputTittleEdit.value = todo.judul;
      TodoText.appendChild(inputTittleEdit);

      const inputDescEdit = document.createElement("input");
      inputDescEdit.placeholder = "Edit description";
      inputDescEdit.value = todo.desc;
      TodoText.appendChild(inputDescEdit);

      const UpdateBtn = document.createElement("button");
      UpdateBtn.innerText = "Update";
      UpdateBtn.onclick = onUpdateTodo(
        todo,
        inputTittleEdit,
        inputDescEdit
      );
      TodoText.appendChild(UpdateBtn);
    }
    todoList.appendChild(TodoItems);
  });

  saveTodos();
};

renderTodo();