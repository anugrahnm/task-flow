import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function getEnvironmentVariables(): { supabaseUrl: string; supabaseDefaultKey: string } {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseDefaultKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

    if (!supabaseUrl || !supabaseDefaultKey) {
        throw new Error(
            "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!"
        );
    }

    return { supabaseUrl, supabaseDefaultKey };
}

export async function createSupabaseServerClient() {
    const { supabaseUrl, supabaseDefaultKey } = getEnvironmentVariables();
    const cookieStore = await cookies();

    return createServerClient(supabaseUrl, supabaseDefaultKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        },
    });
}