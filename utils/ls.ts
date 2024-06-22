export const setLsItem = (key: string | any, val = '') => {
  if (typeof window === 'undefined')
    return false

  if (typeof key === 'object') {
    for (const _key in key)
      setLsItem(_key, key[_key])

    return true
  }
  // console.log(`====> set val :`, val)
  val = JSON.stringify(val)
  window.localStorage.setItem(key, val)
}

export const getLsItem = (key: string, defaultVal = '') => {
  if (typeof window === 'undefined')
    return defaultVal

  let val = window.localStorage.getItem(key)
  if (val === 'undefined' || val === null || val === '')
    return defaultVal

  val = JSON.parse(val)
  // console.log(`getItem ====> ${key}:`, val)

  return val
}

export const removeLsItem = (key: string) => {
  window.localStorage.removeItem(key)
}

// ls.setLsItem('aString', 'a string')
// ls.setLsItem('aInt', 10)
// ls.setLsItem('aFloat', 10.00001)
// ls.setLsItem('anArray', ['aaa', 'bbbb'])
// ls.setLsItem('anObject', { aaa: 'valA', bbbb: 'valB' })
// const key = 'key value'
// setItem('aaaa', 'bbb')
// setItem({ key })

// const rz1 = ls.getLsItem('aString', 'a string')
// const rz2 = ls.getLsItem('aInt', 10)
// const rz3 = ls.getLsItem('aFloat', 10.00001)
// const rz4 = ls.getLsItem('anArray', ['aaa', 'bbbb'])
// const rz5 = ls.getLsItem('anObject', { aaa: 'valA', bbbb: 'valB' })
