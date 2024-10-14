import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const tokenId = getRouterParam(event, 'tokenId')

  const adminClient = serverSupabaseServiceRole(event)
  const { data, error } = await adminClient.from('bridgeTokenWrap')
    .select()
    .eq('tokenId', tokenId)
    .single()
  
  if (error) {
    console.log(`====> error :`, error)
  }
  
  return data
})
