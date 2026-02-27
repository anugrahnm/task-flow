"use client";

import { Button } from "@/components/ui/button";

import { signOut } from "../auth/actions";

export function SignOutButton() {
  return (
    <Button
      type="button"
      onClick={() => signOut()}
      className="w-24 cursor-pointer h-14"
    >
      LogOut
    </Button>
  );
}
