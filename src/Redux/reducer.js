import {
  DeleteTodo,
  GetTodo,
  ErrorTodo
} from "./actionType";

const initailState = {
  todos: [],
  isLoading: false,
  isError: false
};

export const reducer = (state = initailState, { type, payload }) => {
  switch (type) {

    case ErrorTodo: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        todos: []
      };
    }
    case GetTodo: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        todos: []
      };
    }

    case DeleteTodo: {
      return {
        ...state,
        todos: payload,
        isLoading: false,
        isError: false,
      };
    }
    default: {
      return state;
    }
  }
};
