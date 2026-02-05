import { supabase } from "@/lib/supabase";
export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

const getAuthProvider = () => {
  return (import.meta.env.VITE_SUPABASE_AUTH_PROVIDER as string | undefined) ?? "google";
};

export const startLogin = async (returnPath?: string) => {
  const redirectTo = `${window.location.origin}${returnPath ?? window.location.pathname}`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: getAuthProvider(),
    options: {
      redirectTo,
    },
  });

  if (error) {
    console.error("[Auth] Supabase login failed", error);
    return;
  }

  if (data?.url) {
    window.location.href = data.url;
  }
};
