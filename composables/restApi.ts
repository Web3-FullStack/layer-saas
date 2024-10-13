export const usePost = async (url, body = {}, headers = {}) => {
    if (!url.startsWith('http')) {
    headers = {
      ...headers,
      ...useRequestHeaders(['cookie'])
    }
  }
  const opts = {
    headers,
    method: 'POST',
    body,
  }
  return useFetch(url, opts)
}

export const useGetRequest = async (url, query = {}, headers = {}) => {
  if (!url.startsWith('http')) {
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

export const getRequest = async (url, query = {}, headers = {}) => {
  if (!url.startsWith('http')) {
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
  return $fetch(url, opts)
}

export const postRequest = async (url, body = {}, headers = {}) => {
  if (!url.startsWith('http')) {
    headers = {
      ...headers,
      ...useRequestHeaders(['cookie'])
    }
  }

  const opts = {
    headers,
    method: 'POST',
    body,
  }
  try{
    const rz = await $fetch(url, opts)
    return rz
  }catch(error){
    return {
      error
    }
  }
}