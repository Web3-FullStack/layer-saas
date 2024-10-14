import {
  serverSupabaseUser,
  serverSupabaseServiceRole,
} from "#supabase/server";

export default defineEventHandler(async (event) => {
  const { network } = getQuery(event);

  const adminClient = serverSupabaseServiceRole(event);

  const user = await serverSupabaseUser(event);
  const userId = user?.id;

  const { data } = await adminClient
    .from("addressBind")
    .select()
    .eq("userId", userId)
    .eq("network", network)
    .single();

  if(!data) {
    return {
      error: 'Not found',
    }
  }

  return { data };
});
