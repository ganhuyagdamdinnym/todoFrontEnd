"use client";
import { useState } from "react";
import { useTodo } from "../_contexts/TodoContext";
import { useAdvice } from "../_contexts/AdviceContext";
import { TodoType } from "@/lib/todoTypes";
import axios from "axios";
import { title } from "process";
import { Back_End_url } from "../utils/Back_url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTodoMutationMutation } from "../generated";
import { useCreateTodoToUserMutation } from "../generated";
import { useUserTodo } from "../_contexts/UserTodoContext";
export const AddTodo = () => {
  const { refetch } = useUserTodo();
  const [status, setStatus] = useState<number>(0);
  const [selectTeam, setSelectTeam] = useState<string>("Team-1");
  const [titleVal, setTitleval] = useState<string>("");
  const TeamArray = ["Team-1", "Team-2", "Team-3"];
  ///const [AddTodoMutation, { data, loading, error }] = useTodoMutationMutation();
  const [AddTodo, { data, loading, error }] = useCreateTodoToUserMutation();
  const HandleAdd = async () => {
    toast("Creating todo!");
    const date = Date.now();
    console.log(new Date().toISOString());
    const todoInput = {
      title: titleVal,
      team: selectTeam,
      date: new Date().toISOString(),
      token: localStorage.getItem("token"),
    };

    await AddTodo({
      variables: { input: todoInput },
    }).then((res) => {
      refetch();
    });
    // fetch();
  };
  return (
    <div className="flex gap-2 max-w-[700px] m-auto ">
      {/* <div className="w-4 h-4 bg-[red]" onClick={() => ref()}></div> */}
      <input
        className="w-[525px] border-[1px] rounded-xl px-2"
        onChange={(e) => setTitleval(e.target.value)}
        value={titleVal}
      />
      <button
        // variant={"outline"}
        onClick={() => HandleAdd()}
        className="border-[1px] px-2 py-1 rounded-xl"
      >
        Add
      </button>
      <select
        onChange={(e) => setSelectTeam(e.target.value)}
        value={selectTeam}
        className="border-[1px] px-2 py-1 rounded-xl w-[100px]"
      >
        {TeamArray.map((e) => (
          <option value={e}>{e}</option>
        ))}
      </select>
      <ToastContainer />
    </div>
  );
};
