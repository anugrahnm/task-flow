import TaskForm from "@/app/tasks/TaskForm";
import { SignOutButton } from "./signout-button";

export default function TaskPage() {
  return (
    <div className="min-h-screen">
      <div className="flex items-end w-full justify-end p-4">
        <SignOutButton />
      </div>

      <div className="flex items-start justify-center">
        <TaskForm />
      </div>
    </div>
  );
}
