import React, { useEffect, useState } from "react";
import { Firebase } from "../firebase/Config";
import { getFirestore } from "firebase/firestore";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import Dropdown from "react-bootstrap/Dropdown";
import "./style/dasboard.css";
import { FaEllipsisV, FaBan, FaCheckCircle, FaRegHeart, FaListAlt } from "react-icons/fa";

function TodoList({trigger}) {
  const [todo, setTodo] = useState([]);
  const db = getFirestore(Firebase);
  const todoCollection = collection(db, "todos");
  const [searchKey,setSearchKey]=useState("")
  const [filterKey,setFilterKey]=useState("all")

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    getTodos();
  }, [trigger]);
 
  
  const getTodos = async () => { 
    const q = query(todoCollection, where('uid', "==", user.uid)); 
      const querySnapshot = await getDocs(q); 
      const todoList = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
          show:true
        };
      }); 
      searchAction(searchKey, todoList)
 
  };

  const filterChange = async (e) => {
    const option = e.target.value; 
    setFilterKey(option)
    if (option === "all") {
      getTodos();
    } else {
      const q = query(collection(db, "todos"), where(option, "==", true), where('uid', "==", user.uid)); 
      const querySnapshot = await getDocs(q); 
       const todoList = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
          show:true
        };
      }); 
      searchAction(searchKey, todoList)
    }
   
  };

  const handleSearch=(e)=>{
    const text=e.target.value
    setSearchKey(text)
    searchAction(text, todo)
  }

  const searchAction =(text,list)=>{
    list.map((el)=>{
      if(el.title.includes(text)){
          el.show = true
      }else{
        el.show = false
      }
    })
    setTodo([...list]);
  }
  
  const updateRecord = async (id, field) => {
    const updatedTodo = doc(db, "todos", id);
    try {
      await updateDoc(updatedTodo, field); 
      todo.map(el=>{ 
        if(el.id==id){ 
          el[Object.keys(field)[0]] = true
        }
      }) 
     
      setTodo([...todo])
    } catch (error) {
      console.log(error);
    } 
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  return (
    <div>
      <div className="list-head  mt-5 ">TODO LIST</div>
      <div className="row">
        <div className="col-6 mb-5" search-box>
          <div class="inner-addon right-addon">
            <input type="text" class="form-control" placeholder="Search" onChange={handleSearch} />
            <i class="far fa-search"></i>
          </div>
        </div>
        <div className="col-6">
          <select className="form-select" onChange={filterChange}>
            <option value="all">filter by</option>
            <option value="completed">completed</option>
            <option value="favourite">favourite</option>
            <option value="deleted">deleted</option>
          </select>
        </div>

        <div>
          {todo.map((doc) => {
            if(doc.show){
              return (
              <div className="cards">
                <div>  
                  <h1 className="sub-title"> {doc.title}</h1>
                  <h2 className="description">{doc.description}</h2>
                </div>
                <div className="description">
                  {doc.deleted ? (
                    <div className="todo-icons">
                      <FaBan />
                    </div>
                  ) : (
                    ""
                  )}
                  {doc.favourite ? (
                    <div className="todo-icons">
                      <FaRegHeart />
                    </div>
                  ) : (
                    ""
                  )}
                  {doc.completed ? (
                    <div className="todo-icons">
                      <FaCheckCircle />
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="todo-icons">
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                        <FaEllipsisV />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          href="#/action-1"
                          onClick={(e) => {
                            updateRecord(doc.id, { completed: true });
                          }}
                        >
                          Completed
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-2"
                          onClick={(e) => {
                            updateRecord(doc.id, { favourite: true });
                            console.log("Favourite clicked");
                          }}
                        >
                          Favourite
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/action-3"
                          onClick={(e) => {
                            updateRecord(doc.id, { deleted: true });
                          }}
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
              )
             } 
          })}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
