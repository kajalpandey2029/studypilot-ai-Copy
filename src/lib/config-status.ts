// Client-safe configuration status checker (zero server SDK dependency)
export function getClientConfigStatus() {
  const hasGemini = typeof window !== 'undefined'
    ? Boolean(localStorage.getItem('studypilot_gemini_key') || process.env.NEXT_PUBLIC_HAS_GEMINI === 'true')
    : false;

  const hasSupabase = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')
  );

  return {
    isGeminiConfigured: hasGemini,
    isSupabaseConfigured: hasSupabase,
  };
}
