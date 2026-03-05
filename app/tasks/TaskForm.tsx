"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { createClient } from "@/lib/supabase/client";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";

export default function TaskForm() {
  const supabase = createClient();
  const [newTask, setNewTask] = useState({
    task_name: "",
    task_desc: "",
    due_date: "",
  });

  async function handleSubmit(
    e: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    const row = {
      task_name: newTask.task_name,
      task_desc: newTask.task_desc,
      due_date: newTask.due_date || null,
    };
    const { error } = await supabase.from("tasks").insert(row).single();

    if (error) {
      console.log(error.message);
      return;
    }

    setNewTask({
      task_name: "",
      task_desc: "",
      due_date: "",
    });
  }

  return (
    <Card className="w-full max-w-3xl border-6 border-black">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Tasks</CardTitle>
        <CardDescription className="text-center">
          Add a new task and due date to your task list
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <InputGroup>
            <InputGroupAddon
              align="inline-start"
              className="w-1/7 px-6 sm:px-2 bg-black rounded-l-[7px] border-black border"
            >
              <InputGroupText className="text-white">Title</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              type="text"
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, task_name: e.target.value }))
              }
              placeholder="Add a Task Title"
              className="w-full"
              aria-label="Add a new Task Title"
              aria-required="true"
              required
            />
          </InputGroup>

          <InputGroup>
            <InputGroupAddon
              align="inline-start"
              className="w-1/7 px-6 min-[465px]:px-2 bg-black rounded-l-[7px] border-black border"
            >
              <InputGroupText className="text-white hidden min-[465px]:flex min-[400px]:truncate">
                Description
              </InputGroupText>
              <InputGroupText className="text-white min-[465px]:hidden flex">
                Desc
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              type="text"
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, task_desc: e.target.value }))
              }
              placeholder="Description"
              className="w-full"
              aria-label="Add a new task"
              aria-required="true"
              required
            />
          </InputGroup>

          <InputGroup>
            <InputGroupAddon
              align="inline-start"
              className="w-1/7 px-6 sm:px-2 bg-black rounded-l-[7px] border-black border"
            >
              <InputGroupText className="text-white">Date</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              type="date"
              name="duedate"
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, due_date: e.target.value }))
              }
              className="w-full my-2"
              aria-label="Add a due date - dd/mm/yyyy"
              aria-required="true"
              required
            />
          </InputGroup>
          <Button type="submit" className="w-full cursor-pointer text-white">
            <PlusIcon className="w-4 h-4 mr-2" /> Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
