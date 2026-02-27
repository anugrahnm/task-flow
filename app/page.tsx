import LoginComponent from "@/app/login/LoginForm";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Login() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log({ user });
  if (user) redirect("/tasks");
  redirect("/login");
  return <div className="flex min-h-screen items-center justify-center"></div>;
}
