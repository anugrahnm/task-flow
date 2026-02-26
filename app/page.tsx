import LoginComponent from "@/components/LoginComponent";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export default async function Login() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log({ user });
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginComponent user={user} />
    </div>
  );
}
