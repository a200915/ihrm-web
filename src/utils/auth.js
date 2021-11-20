import Cookies from 'js-cookie'

const TokenKey = 'ihrm_token'

export function getToken (key = TokenKey) {
  return Cookies.get(key)
}

export function setToken (token, key = TokenKey) {
  return Cookies.set(key, token)
}

export function removeToken (key = TokenKey) {
  return Cookies.remove(key)
}
