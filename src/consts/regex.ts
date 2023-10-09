export const passwordRegex =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/
export const usernameRegex = /^[0-9A-Za-z.\-_]+$/
export const firstNameRegex = /[A-Za-zА-Яа-я]/
export const lastNameRegex = /[A-Za-zА-Яа-я]/
export const aboutMeRegex = /[0-9A-Za-zА-Яа-я\s\S]|/
export const tagsRegex = /(<\d+>[^<>]*<\/\d+>)/
export const openCloseTagRegex = /<(\d+)>([^<>]*)<\/(\d+)>/
