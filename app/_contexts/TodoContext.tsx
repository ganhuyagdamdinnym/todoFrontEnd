"use client";

import { TodoType } from "@/lib/todoTypes";
import axios from "axios";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Back_End_url } from "../utils/Back_url";
import { useGetTodoQueryQuery } from "../generated";
import { ApolloQueryResult } from "@apollo/client";
// const { data, loading, error } = useGetTodoQueryQuery();
// if (loading) {
//   return <div>This is loading</div>;
// }

// if (!loading) {
//   return <div style={{ color: "white", fontSize: "40px" }}>hi</div>;
// }
type Props = {
  children: ReactNode;
};
type contextType = {
  todos: TodoType[];
  setTodos: (todos: any) => void;
  loading: boolean;
  error: any;
  refetch: (variables?: Partial<any>) => Promise<ApolloQueryResult<any>>;
};
const todoContext = createContext({} as contextType);
export const useTodo = () => {
  return useContext(todoContext);
};
//wrap component gaduurn oroodog
const TodoProvider = (props: Props) => {
  // const [todos, setTodos] = useState<TodoType[]>([]);
  const { data, loading, error, refetch } = useGetTodoQueryQuery();
  //console.log("queryData", data);
  //const todos = data?.todoQuery as TodoType[];
  const { children } = props;
  const [todos, setTodos] = useState<TodoType[]>([]);
  const fetch = () => {
    refetch();
  };
  // useEffect(() => {
  //   fetch();
  //   if (data && data.todoQuery) {
  //     setTodos(data.todoQuery as TodoType[]);
  //   }
  // }, [data]);

  return (
    <todoContext.Provider value={{ todos, setTodos, loading, error, refetch }}>
      {children}
    </todoContext.Provider>
  );
};
export default TodoProvider;
