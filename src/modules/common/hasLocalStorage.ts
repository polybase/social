export function hasLocalStorage () {
  try {
    localStorage.getItem('test')
    return true
  } catch (e) {
    return false
  }
}
