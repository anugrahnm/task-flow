"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface Task {
  id: number;
  created_at: string;
  task_name: string;
  task_desc: string;
  due_date: string | null;
}

export default function TaskItem() {
  const supabase = useMemo(() => createClient(), []);

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true })
      .then(({ error, data }) => {
        if (cancelled) return;
        if (error) {
          console.log("Error Reading Task: ", error.message);
          return;
        }
        console.log(data);
        setTasks(data ?? []);
      });
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  function formatDate(date: string | null) {
    if (!date) return "No date";

    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  const deleteTask = async (id: number) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Error Deleting Task: ", error.message);
      return;
    }
  };

  return (
    <div className="w-full max-w-3xl ">
      {tasks.map((task) => (
        <Card key={task.id} className="  mb-4 border-6 border-black">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Task: {task.task_name}
            </CardTitle>
            <CardDescription className="text-center">
              Due: {formatDate(task.due_date)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-black border wrap-break-word hyphens-auto rounded-md p-2 mb-6 ">
              <p>{task.task_desc}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 items-center justify-center">
              <Button
                type="button"
                variant="default"
                className="grow p-2 cursor-pointer text-white"
              >
                <Edit2Icon className="w-4 h-4 sm:mr-2" />
                <p className="hidden min-[420px]:flex">Edit</p>
              </Button>
              <Button
                type="button"
                onClick={() => deleteTask(task.id)}
                variant="destructive"
                className="grow p-2 cursor-pointer text-white"
              >
                <Trash2Icon className="w-4 h-4 sm:mr-2" />
                <p className="hidden min-[420px]:flex">Delete</p>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
