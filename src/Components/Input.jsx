import React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { deleteTodo, getTodo, errorTodo } from "../Redux/action";

export const TodoInput = () => {
  const [title, setTitle] = React.useState("");
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(getTodo());
      const response = await fetch("https://fake-server-app-by-atul.herokuapp.com/lists");
      const data = await response.json();
      dispatch(deleteTodo(data));

    } catch (error) {
      dispatch(errorTodo());
      console.log(error)
    }
  };

  const addData = async (payload) => {
    try {
      dispatch(getTodo());
      await fetch(`https://fake-server-app-by-atul.herokuapp.com/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      alert("Task Added")
    } catch (error) {
      dispatch(errorTodo());
      console.log(error);
    }
  }

  const handleAdd = () => {
    const payload = {
      id: uuid(),
      title: title,
      status: false
    };
    addData(payload).then(() => {
      getData();
    });

    setTitle("");
  };

  return (
    <div>
      <h1>Add Todos</h1>
      <div style={{width: "20%",
                   margin: "auto" , 
                   border: "2px solid gray",
                   padding: "10px",
                   borderRadius: "10px",
                   height:"auto"}}>
        <input style={{
          width: "90%",
          border: "2px solid green",
          fontSize: "20px",
          borderRadius: "10px",
          padding: "10px",
          marginBottom: "20px"
        }}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          placeholder="Enter To-Do"
        />
        <button 
        style={{
          width:"100%",
          padding: "10px",
          fontSize: "20px",
          backgroundColor: "green",
          color: "white",
          fontWeight: "700",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer"
        }}
        onClick={handleAdd}>Add To-Do</button>
      </div>
    </div>
  );
};
