"use client";

import type { User } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { SubmitButton } from "./submit-button";
import { signUp } from "../auth/actions";
// import { useState } from "react";
// import { createBrowserClient } from "@supabase/ssr";

type EmailPasswordProps = {
  user: User | null;
};

export default function SignUpForm({ user }: EmailPasswordProps) {
  const router = useRouter();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const supabase = createBrowserClient();

  useEffect(() => {
    if (!user) return;
    router.replace("/tasks");
  }, [router, user]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Signup to your account</CardTitle>
        <CardDescription>
          Enter your email below to signup to your account
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
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
                name="password"
                type="password"
                placeholder="Enter your password"
                aria-label="Enter your password"
                aria-required="true"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 pt-2">
          <SubmitButton
            formAction={signUp}
            variant="outline"
            type="submit"
            className="w-full cursor-pointer text-white"
          >
            Signup
          </SubmitButton>
          <Button
            type="button"
            className="w-full cursor-pointer text-white"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
