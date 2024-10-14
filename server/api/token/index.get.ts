import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const { page=  1, limit = 10, sourceChain} = getQuery(event)
  const start = (page - 1) * limit

  const adminClient = serverSupabaseServiceRole(event)
  const db = adminClient.from('bridgeTokenWrap')
  const theSelect = db.select()

  const { count } = await db.select('', { count: 'exact', head: true })
    .eq('sourceChain', sourceChain)
    // .or(`sourceChain.eq.${chainKey},targetChain.eq.${chainKey}`)
  
  const { data, error } = await theSelect.order('created_at', { ascending: true }).range(start, start + limit -1)
                                  
  if (error) return { error }
  
  return {
    items: data,
    count,
  }
})
