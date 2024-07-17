export const usePost = async (url, body = {}) => {
  const opts = {
    headers: useRequestHeaders(['cookie']),
    method: 'POST',
    body,
  }
  return useFetch(url, opts)
}

export const useGetRequest = async (url, query = {}, headers = {}) => {
  if (url.startsWith('http')) {
    headers = {
      ...headers,
      ...useRequestHeaders(['cookie'])
    }
  }

  const opts = {
    headers,
    method: 'GET',
    query,
  }
  return useFetch(url, opts)
}