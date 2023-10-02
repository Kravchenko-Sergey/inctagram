import { TOKEN_LOCAL_STORAGE_KEY } from '@/consts/localstorage'

export const tokenSetterToLocalStorage = (token: string) => {
  localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token)
}
