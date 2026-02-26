import AddTask from "@/app/task/TaskFormComponent";
import { Button } from "@/components/ui/button";

export default function TaskPage() {
  return (
    <div className="min-h-screen">
      <div className="flex items-end w-full justify-end p-4">
        <Button className="w-24 h-14">LogOut</Button>
      </div>

      <div className="flex items-start justify-center">
        <AddTask />
      </div>
    </div>
  );
}
