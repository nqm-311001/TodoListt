import React, { useState, useEffect } from "react";
import "./addNew.css";

let uudi = 1;

export default function AddNewTodo({ todos, setNewTodos, setShowAdd, fixTodo, setFixTodo}) {
  const [newTodo, setNewTodo] = useState({
    id: 0,
    name: "",
    status: "Nguy cấp",
  })

  const [isEdit, setIsEdit] = useState(false)
  const [showAlert, setShowAlert] = useState(true)

  useEffect(() => {
    if (fixTodo != null) {
      setNewTodo(fixTodo);
      setIsEdit(true);
    }
  }, [fixTodo])

  const updateNewTodo = (e) => {
    const {name, value} = e.target;
//    console.log(e.target);
    setNewTodo({
      ...newTodo,
      [name]: value,
    })
  }

  const addNewTodo = () => {
    if(newTodo.name.trim() === '') {
      setShowAlert(false)
      return
    }
    newTodo.id = uudi
    setNewTodos([...todos, newTodo]);
    uudi += 1
    setNewTodo({
      id: 0,
      name: "",
      status: "Nguy cấp",
    })
    setShowAlert(true)
  }

  const handleFixBtn = () => {
    if(newTodo.name.trim() === '') {
      setShowAlert(false)
      return
    }
    const index = todos.findIndex(todo => todo.id === newTodo.id)
    todos[index] = newTodo
    setNewTodo({
      id: 0,
      name: "",
      status: "Nguy cấp"
    })
    setIsEdit(false)
    setFixTodo(null)
    setNewTodos([...todos])
    setShowAlert(true)
  }

  return (
    <div className="todoAdd">
      <div className="add_container">
        <span onClick={() => setShowAdd(false)}>X</span> 
        <div className="add_header">
          <h3>{isEdit ? "Sửa công việc" : "Thêm công việc mới"}</h3>
        </div>
        <div className="body">
          <div className="section">
            <label> Tên công việc</label>
            <input className="input_dt" type="text" name="name" value={newTodo.name} onChange={updateNewTodo}/>
            <h3 hidden={showAlert} className="alert">*Tên công việc không được để trống</h3>
          </div>
          <div className="section">
            <label>Mức độ</label>
            <select className="input_dt" name="status" id="status" onChange={updateNewTodo} value={newTodo.status}>
              <option value="Nguy cấp">Nguy cấp</option>
              <option value="Phải làm nhưng chưa cần gấp">Phải làm nhưng chưa cần gấp</option>
              <option value="Lúc nào cũng được">Lúc nào cũng được</option>
              <option value="Không làm cũng được">Không làm cũng được</option>
            </select>
          </div>
        </div>

        <div className="btns">
          <button className="addBtn" onClick={isEdit ? handleFixBtn : addNewTodo}>
            {isEdit ? "SỬA" : "THÊM"}
          </button>
          <button className="cancelBtn" onClick={() => setShowAdd(false)}>
            HỦY BỎ
          </button>
        </div>
      </div>
    </div>
  );
}