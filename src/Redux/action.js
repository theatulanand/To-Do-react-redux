import { 
  DeleteTodo,
  ErrorTodo,
  GetTodo
} from "./actionType";


export const deleteTodo = (payload) => {
  return {
    type: DeleteTodo,
    payload
  };
};

export const getTodo = () => ({
  type: GetTodo
});

export const errorTodo = () => ({
  type: ErrorTodo
});

