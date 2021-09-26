import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from "./components/TodoList";
import AddNewTodo from "./components/AddNewTodo";
import { useState, useEffect} from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [fixTodo, setFixTodo] = useState(null);
  const [filterList, setFilterList] = useState(todos);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setFilterList(todos)
  }, [todos])

  const status = [
    "Nguy cấp",
    "Phải làm nhưng chưa cần gấp",
    "Lúc nào cũng được",
    "Không làm cũng được"
  ] 

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id != id))
  }

  const setNextLevel = (id) => {
    const newTodo = [...todos]
    const index = newTodo.findIndex(todo => todo.id === id)
    if(newTodo[index].status === "Nguy cấp") newTodo[index].status = "Phải làm nhưng chưa cần gấp"
    else if(newTodo[index].status === "Phải làm nhưng chưa cần gấp") newTodo[index].status = "Lúc nào cũng được"
    else if(newTodo[index].status === "Lúc nào cũng được") newTodo[index].status = "Không làm cũng được"
    else if(newTodo[index].status === "Không làm cũng được") newTodo[index].status = "Nguy cấp"
    setTodos(newTodo)
  }
  return (

    <div className="container">
      <h1>To Do List - Team Web D19</h1>
      <div className="content">
        {showAdd ? <AddNewTodo todos={todos} setNewTodos={setTodos} setShowAdd={setShowAdd} fixTodo={fixTodo} setFixTodo={setFixTodo}/> : null}
        
        <TodoList todos={todos} setNewTodos={setTodos} setShowAdd={setShowAdd} showAdd={showAdd} deleteTodo={deleteTodo} setFixTodo={setFixTodo} setNextLevel={setNextLevel}
                  filterList={filterList} setFilterList={setFilterList} status={status} filter={filter} setFilter={setFilter}/>
      
      </div>
    </div>
    
  )
}

export default App;