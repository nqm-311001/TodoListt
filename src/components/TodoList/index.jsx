import React, {useState, useEffect} from "react";
import "./todoList.css";
import {Badge} from 'react-bootstrap'

const TodoList = ({todos, setNewTodos, showAdd, setShowAdd, setFixTodo, deleteTodo, setNextLevel, filter, setFilter, status, filterList, setFilterList}) => {

  const [sort, setSort] = useState(false)
  const [textSearch, setTextSearch] = useState("")
  
  useEffect(() => {
    sorted()
  }, [todos.length])

  const getColor = (status) => {
    if(status === "Nguy cấp") return "danger"
    else if(status === "Phải làm nhưng chưa cần gấp") return "warning"
    else if(status === "Lúc nào cũng được") return "success"
    else if(status === "Không làm cũng được") return "primary"
  }
  
  const sorted = () => {
    const newTodo = [...todos]
    if(sort === "Sắp xếp theo ID") {
      newTodo.sort((a,b) => {
        return a.id > b.id ? 1 : -1
      })
    }
    else if(sort === "Sắp xếp theo tên công việc") {
      newTodo.sort((a,b) => {
        return a.name > b.name ? 1 : -1
      })
    }
    else if(sort === "Sắp xếp theo mức độ") {
      newTodo.sort((a,b) => {
        const indexA = status.findIndex(item => item === a.status)
        const indexB = status.findIndex(item => item === b.status)
        return indexA > indexB ? 1 : -1
      })
    }
    setNewTodos(newTodo)
  }

  const onChangeSort = (e) => {
    setSort(e.target.value)
  }

  const filterLevel = (status) => {
    if(status === 'all') setFilterList(todos)
    else setFilterList(todos.filter(item => item.status === status))
  }

  const onChangeSearch = (e) => {
    setTextSearch(e.target.value)
  }

  const search = () => {
    setFilterList(todos.filter(
      function(item){
        return item.name.indexOf(textSearch) !== -1 || item.status.indexOf(textSearch) !== -1
      }
    ))
  }

  return (
    <div className="todoList">
      <div className="btns">
        <button className="addBTn" onClick={() => setShowAdd(!showAdd)}>
          THÊM CÔNG VIỆC MỚI
        </button>
        <select name="sort" id="sort" onChange={onChangeSort} value={sort}>
          <option value="Sắp xếp theo ID">Sắp xếp theo ID</option>
          <option value="Sắp xếp theo tên công việc">Sắp xếp theo tên công việc</option>
          <option value="Sắp xếp theo mức độ">Sắp xếp theo mức độ</option>
        </select>
        <button className="sortBtn" onClick={() => sorted()}>SẮP XẾP</button>
        <br />
        <input type="text" className="search_text" onChange={onChangeSearch} />
        <button className="searchBtn" onClick={search}>TÌM KIẾM</button>   
      </div>

      <table className="todo_table">
        <tr>
          <td className="title">STT</td>
          <td className="title">Tên công việc</td>
          <td className="title">Mức độ</td>
          <td className="title">Hành động</td>
        </tr>
        {filterList.map((item, index) => {
          return(
            <>
              <tr key={`${item.id}`}>
              
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                  {/* <span className="status"
                    style={{ backgroundColor: updateStatusColor(item.status) }}
                    onClick={() => changeStatus(item)}
                  >
                    {item.status}
                  </span> */}
                  <Badge bg= {getColor(item.status)} onClick={() => setNextLevel(item.id)}>{item.status}</Badge>

                </td>
                <td>
                  <button className="changeBtn" onClick={() => setFixTodo(index)}>
                    Sửa
                  </button>
                  <button className="deleteBtn" onClick={() => deleteTodo(item.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            </>
          )
        })}          
      </table>


      <div className="filter">
        <span className="filterr" onClick={() => filterLevel('all')}>Tất cả</span>
        <span className="filterr" onClick={() => filterLevel('Nguy cấp')}>Nguy cấp</span>
        <span className="filterr" onClick={() => filterLevel('Phải làm nhưng chưa cần gấp')}>Phải làm nhưng chưa cần gấp</span>
        <span className="filterr" onClick={() => filterLevel('Lúc nào cũng được')}>Lúc nào cũng được</span>
        <span className="filterr" onClick={() => filterLevel('Không làm cũng được')}>Không làm cũng được</span>
      </div> 
    </div>
  )
}

export default TodoList;