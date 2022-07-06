import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTodo, getTodo, errorTodo } from "../Redux/action";


const ToDoList = () => {
  const { todos, isLoading, isError } = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
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
    getDataFromDB();
  }, [dispatch]);
  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center' }}>
    </div>
  }
  if (isError) {
    return <div>
      <h1>Error..</h1>
    </div>
  }
  return (
    <>
    <div style={{margin: "auto",width: "80%"}}>
      <h1>To Do List</h1>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Todo's</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {todos?.map((ele,i) => {
            return (
              <tr key={ele.id}>
                <td>{i + 1}</td>
                <td id="title">{ele.title}</td>
                <td><Link to={`/todo/${ele.id}`}>Edit</Link></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    </>
  );
};

export { ToDoList };
