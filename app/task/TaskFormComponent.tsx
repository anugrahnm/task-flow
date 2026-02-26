import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import React from "react";

export default function TaskForm() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Task</CardTitle>
        <CardDescription className="text-center">
          Add a new task and due date to your task list
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Add a new task"
            className="w-full"
            aria-label="Add a new task"
            aria-required="true"
            required
          />
          <Input
            type="date"
            className="w-full mt-4 mb-4"
            aria-label="Add a due date - dd/mm/yyyy"
            aria-required="true"
            required
          />
          <Button type="submit" className="w-full cursor-pointer text-white">
            <PlusIcon className="w-4 h-4 mr-2" /> Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
