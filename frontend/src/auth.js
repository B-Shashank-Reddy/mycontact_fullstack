const TOKEN_KEY = 'accessToken'

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
  window.dispatchEvent(new Event('authChanged'))
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
  window.dispatchEvent(new Event('authChanged'))
}

function decodeToken() {
  const token = getToken()
  if (!token) return null
  try {
    const parts = token.split('.')
    if (parts.length < 2) return null
    return JSON.parse(atob(parts[1]))
  } catch {
    return null
  }
}

function isTokenExpired(payload) {
  if (!payload?.exp) return true
  return Date.now() >= payload.exp * 1000
}

function getUserFromToken() {
  const payload = decodeToken()
  if (!payload) return null
  if (isTokenExpired(payload)) {
    removeToken()
    return null
  }
  return payload.user || null
}

function isAuthenticated() {
  return getUserFromToken() !== null
}

export default {
  setToken,
  getToken,
  removeToken,
  getUserFromToken,
  isAuthenticated,
}
