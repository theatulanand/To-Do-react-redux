import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteTodo,
  errorTodo,
  getTodo
} from "../Redux/action";

export const ToDoDetails = () => {
  const { id } = useParams();
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getDataFromDB = async () => {
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

  const toggleDataInDb = async (payload) => {
    try {
      dispatch(getTodo());
      payload.status = !payload.status;
      await fetch(`https://fake-server-app-by-atul.herokuapp.com/lists/${payload.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      getDataFromDB();
    } catch (error) {
      dispatch(errorTodo());
      console.log(error);
    }
  }

  const deleteDataInDb = async (id) => {
    try {
      dispatch(getTodo());
      await fetch(`https://fake-server-app-by-atul.herokuapp.com/lists/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      dispatch(errorTodo());
      console.log(error);
    }
  }

  const handleToggle = (item) => {
    toggleDataInDb(item);
  };

  const handleDelete = (itemId) => {
    deleteDataInDb(itemId);
    navigate("/alltodos");
  };

  return (
    <div>
      <h1>Details Page</h1>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Todo's</th>
            <th>Status</th>
            <th>Toggle</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>

          {todos
            ?.filter((item) => {
              return item.id === id;
            })
            .map((item,i) => {
              return (
                <tr key={item.id}>
                  <td>{i+1}</td>
                  <td>{item.title}</td>
                    {item.status ? <td>Completed</td> : <td>Not Completed</td>}
                  <td><button onClick={() => handleToggle(item)}>Toggle</button></td>
                  <td><button onClick={() => handleDelete(item.id)}>DELETE</button></td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
