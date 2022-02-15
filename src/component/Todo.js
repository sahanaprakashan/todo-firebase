import React, { useState } from "react";
import { Firebase } from "../firebase/Config";
import { addDoc, getFirestore, collection } from "firebase/firestore";
import "./style/dasboard.css";
import image from "../assets/Vector.png";
function Todo({trigger,setTrigger}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user =JSON.parse(localStorage.getItem('user'))
  
  const db = getFirestore(Firebase);
  const handleSubmit = () => {
    
    const todoCollection = collection(db, "todos");
    addDoc(todoCollection, {
      title,
      description,
      uid:user.uid
    });
    setTrigger(!trigger)
  };
  


  return (
    <div>
      <div className="logo   mb-5">
        <img src={image} alt="" />
      </div>
      <div className="main">
        <div className="main-head">TODO</div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet at
          eleifend feugiat vitae faucibus nibh dolor dui. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Aliquet at eleifend feugiat vitae
          faucibus nibh dolor dui.
        </p>
        <div className="text-center mb-3 ">
          <input
            className="form-control"
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="text-center mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="text-center">
          <button
            onClick={() => {
              handleSubmit();
            }}
            type="button"
            className="btn btn-custom"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
