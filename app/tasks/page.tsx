import TaskForm from "@/app/tasks/TaskForm";
import { SignOutButton } from "./signout-button";
import TaskItem from "./TaskItem";

export default function TaskPage() {
  return (
    <div className="min-h-screen min-w-[250px]">
      <div className="flex items-end w-full justify-end m-1 p-4">
        <SignOutButton />
      </div>

      <div className="flex flex-col items-center justify-start gap-4 m-1 p-4">
        <TaskForm />
        <TaskItem />
      </div>
    </div>
  );
}
