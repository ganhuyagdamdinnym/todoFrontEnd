"use client";

import { UserType, TodoType } from "@/lib/todoTypes";
import axios from "axios";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Back_End_url } from "../utils/Back_url";
import { useGetTodoFromUserQuery } from "../generated";
import { ApolloQueryResult } from "@apollo/client";

type Props = {
  children: ReactNode;
};

type ContextType = {
  userTodos: TodoType[];
  setUserTodos: (todos: TodoType[]) => void;
  name: string;
  refetch: (variables?: Partial<any>) => Promise<ApolloQueryResult<any>>;
};

const UserTodoContext = createContext<ContextType | undefined>(undefined);

export const useUserTodo = (): ContextType => {
  const context = useContext(UserTodoContext);
  if (!context) {
    throw new Error("useUserTodo must be used within a UserTodoProvider");
  }
  return context;
};

const UserTodoProvider = ({ children }: Props) => {
  const [userTodos, setUserTodos] = useState<TodoType[]>([]);
  const [deleteTodo, setDeleteTodo] = useState<TodoType[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    setToken(localToken);
  }, []);

  const { data, loading, error, refetch } = useGetTodoFromUserQuery({
    variables: {
      input: {
        token: token ?? "", // Ensure token is a string
      },
    },
    skip: !token, // Skip the query if token is null
  });

  useEffect(() => {
    if (data && data.getTodoFromUser) {
      setUserTodos(data.getTodoFromUser[0]?.todos as TodoType[]);
    }
  }, [data]);

  useEffect(() => {
    if (userTodos) {
      const deleted = userTodos.filter((e) => e?.status === false);
      setDeleteTodo(deleted);
    }
  }, [userTodos]);

  const name = data?.getTodoFromUser?.[0]?.name || "";

  return (
    <UserTodoContext.Provider
      value={{ userTodos, name, setUserTodos, refetch }}
    >
      {children}
    </UserTodoContext.Provider>
  );
};

export default UserTodoProvider;
