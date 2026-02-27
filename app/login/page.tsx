import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function LoginPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/tasks");
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm user={null} />
    </div>
  );
}
