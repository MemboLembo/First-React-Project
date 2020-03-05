import React, { useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import Loader from "./Loader"

//представим что компонент AddTodo очень большой, и мы хотим загрузить его 
//отдельно от всего контента.
//Чтоб увидеть что оно реально работает добавим задержку.
const AddTodo = React.lazy(() => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./Todo/AddTodo'));
    }, 3000)
  })
);

function App() {
  const [todos, setTodos] = React.useState([
    // { id: 1, completed: false, title: "Купить хлеб" },
    // { id: 2, completed: false, title: "Купить масло" },
    // { id: 3, completed: false, title: "Купить маргарин" }
  ]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(response => response.json())
    .then(todos => {
      setTimeout(() => {
        setTodos(todos)
        setLoading(false)
      }, 2000)
    })
  }, [])

  function toogleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }

        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false
        }
      ])
    );
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React</h1>
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo}></AddTodo>
        </React.Suspense>

        {loading && <Loader/>}
        {/* передаём свойства, что в массиве */}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toogleTodo}></TodoList>
        ) : (
          loading ? null : <p>No todos!</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
