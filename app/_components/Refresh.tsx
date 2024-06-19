"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useStatus } from "../_contexts/StatusContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
// import { useDeletedTodo } from "../_contexts/DeletedTodoContext";
import { useRefreshTodoMutation } from "../generated";
type TodoType = {
  id: string;
  title: string;
};
export function Refresh(props: TodoType) {
  // const { refetch } = useDeletedTodo();
  const [refreshTodo, { data }] = useRefreshTodoMutation();
  const { id, title } = props;
  //const { Fetch } = useTodo();
  const handleRefresh = async () => {
    try {
      // const res = await fetch("http://localhost:8080/refresh", {
      //   method: "POST",
      //   mode: "no-cors",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ id: id }),
      // }).then(function (res) {
      //   // Fetch();
      //   setInprogressStatus(true);
      // });
      const input = {
        id: id,
      };
      // await refreshTodo({ variables: { input: input } }).then((res) =>
      //   // refetch()
      // );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <FontAwesomeIcon icon={faArrowsRotate} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to refresh "{title}" from trash
          </AlertDialogTitle>
          <AlertDialogDescription>
            {/* This action cannot be undone. This will permanently delete your
              account and remove your data from our servers. */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleRefresh()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
