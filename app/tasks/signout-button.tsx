"use client";

import { Button } from "@/components/ui/button";

import { signOut } from "../auth/actions";

export function SignOutButton() {
  return (
    <Button
      type="button"
      onClick={() => signOut()}
      className="w-20 cursor-pointer h-12"
    >
      Log Out
    </Button>
  );
}
