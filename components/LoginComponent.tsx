"use client";

import { User } from "@supabase/supabase-js";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type EmailPasswordProps = {
  user: User | null;
};

export default function LoginComponent({ user }: EmailPasswordProps) {
  const router = useRouter();
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                aria-label="Enter your email"
                aria-required="true"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                placeholder="Enter your password"
                aria-label="Enter your password"
                aria-required="true"
                required
                type="password"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          variant="outline"
          type="submit"
          className="w-full cursor-pointer text-white"
        >
          Login
        </Button>
        <Button
          type="button"
          className="w-full cursor-pointer text-white"
          onClick={() => router.push("/signup")}
        >
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  );
}
