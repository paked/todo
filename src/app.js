const TODO_SHOW_ALL = "todo-mode-all"
const TODO_SHOW_TODO= "todo-mode-todo"
const TODO_SHOW_DONE = "todo-mode-done"

class App {
  constructor() {
    this.todoTextBox = document.getElementById("todo-text")
    this.todoList = document.getElementById("todo-list")

    window.data = {
      todos: [
        {
          text: 'Buy foodoodle',
          done: false
        },
        {
          text: 'Use toodoodle',
          done: false
        },
        {
          text: 'Create *insert thing here later*',
          done: true
        }
      ]
    }

    this.renderTodos()
  }

  addTodo() {
    let newTodoText = this.todoTextBox.value

    console.log(`Adding a todo: ${newTodoText}`)

    if (!this.validTodo(newTodoText)) {
      alert("That's not a valid todo! Make sure you actually wrote a thing!")

      return
    }

    window.data.todos.push({ text: newTodoText, done: false })

    this.renderTodos()
  }

  validTodo(str) {
    return str.length > 0
  }

  clearTodos() {
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }
  }

  renderTodos() {
    this.clearTodos()

    for (let i = 0; i < window.data.todos.length; i++) {
      let todo = window.data.todos[i]

      let shouldRender = false

      switch(this.getRenderMode()) {
      case TODO_SHOW_ALL:
          shouldRender = true
          break
      case TODO_SHOW_TODO:
          shouldRender = !todo.done
          break
      case TODO_SHOW_DONE:
          shouldRender = todo.done
          break
      }

      if (shouldRender) {
        this.renderTodo(i, todo)
      }
    }
  }

  renderTodo(i, todo) {
    // Done button
    let doneButton = document.createElement("button")
    doneButton.innerText = "Mark as done"

    if (todo.done) {
      doneButton.innerText = "Mark as not done"
    }

    doneButton.onclick = this.createTodoDoneHandler(i)

    // Edit button
    let editButton = document.createElement("button")
    editButton.innerText = "Edit"
    editButton.onclick = this.createTodoEditHandler(i)

    editButton.className = doneButton.className = "button"

    let todoElem = document.createElement("span")
    todoElem.appendChild(document.createTextNode(todo.text))
    todoElem.appendChild(doneButton)
    todoElem.appendChild(editButton)

    // Assemble the monstrosity
    let li = document.createElement("li")
    li.appendChild(todoElem)

    this.todoList.appendChild(li)
  }

  createTodoDoneHandler(i) {
    return () => {
      let todo = window.data.todos[i]

      todo.done = !todo.done

      this.renderTodos()
    }
  }

  createTodoEditHandler(i) {
    return () => {
      // Get todo
      let todo = window.data.todos[i]

      let newText = prompt('What would you like to replace that text with?')

      todo.text = newText

      this.renderTodos()
    }
  }

  getRenderMode() {
    if (document.getElementById(TODO_SHOW_ALL).checked) {
      return TODO_SHOW_ALL
    } else if (document.getElementById(TODO_SHOW_TODO).checked) {
      return TODO_SHOW_TODO
    } else if (document.getElementById(TODO_SHOW_DONE).checked) {
      return TODO_SHOW_DONE
    } 
  }
}
