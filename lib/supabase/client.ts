import { createBrowserClient } from "@supabase/ssr";


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

export function createClient() {
    const { supabaseUrl, supabaseDefaultKey } = getEnvironmentVariables();
    return createBrowserClient(
        supabaseUrl, supabaseDefaultKey
    )
}