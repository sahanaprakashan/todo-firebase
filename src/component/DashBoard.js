import React, { useState } from "react";
import Todo from "./Todo";
import TodoList from "./TodoList";
import "./style/dasboard.css"; 
function DashBoard() {
  const [trigger,setTrigger]=useState('false')
  return (
    <div className="container">
      <div className="dash-board row">
        <div className="col-6">
          <Todo trigger={trigger} setTrigger={setTrigger}/>
        </div>
        <div className="col-6">
          <TodoList trigger={trigger}/>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
