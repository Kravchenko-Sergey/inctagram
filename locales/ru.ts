export const ru = {
  test: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати ',
  languageSelect: {
    russian: 'Русский',
    english: 'Английский',
  },

  errors: {
    noResponse: 'Сервер не отвечает',
    requestFailed: 'Ошибка при выполнении запроса',
    loginIncorrectData: 'Неправильный email или пароль',
    loginFailed: 'Ошибка входа',
    loginIncorrectPassword: `Неправильный пароль. Попробуйте ещё раз`,
    regexUsername: 'Имя пользователя должно содержать 1-9, a-z, A-Z, . _ -',
    nonemptyUsername: 'Введите имя пользователя',
    minUsername: (min: number) => `Длинна имени пользователя должна быть не менее ${min} символов`,
    maxUsername: (max: number) =>
      `Максимальная длинна имени пользователя не должна превышать  ${max} символов`,
    regexEmail: 'Электронная почта должна соответствовать типу example@example.com',
    nonemptyEmail: 'Введите адрес электронной почты',
    nonemptyPassword: 'Введите пароль',
    nonemptyConfirm: 'Повторно введите пароль',
    regexPasswordMustContain:
      'Пароль должен содержать следующие символы 1-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / :' +
      ' ; < = > ? @ [ \\ ] ^ _` { | } ~',
    minPassword: (min: number) => `Пароль должен должен быть длинной не менее ${min} символов`,
    maxPassword: 'Пароль должен быть не более 20 символов',
    passwordsMustMatch: 'Пароли должны совпадать',
    emailNotFound: 'Пользователь с такими электронным адресом не существует',
    requiredTerms: 'Нужно подтвердить согласие с правилами сервиса и политикой безопасности',
    emailExists: 'Пользователь с такой электронной почтой уже существует',
    usernameExists: 'Пользователь с таким именем уже существует',
  },

  auth: {
    emailLabel: 'Электронная почта',
    emailSent: 'Письмо с подтверждением отправлено',
    passwordLabel: 'Пароль',
    forgotPassword: 'Забыли пароль?',
    haveAccount: `Уже есть аккаунт?`,
    notHaveAccount: `Ещё нет аккаунта?`,
    signInTitle: 'Вход',
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
    username: 'Имя пользователя',
    passwordConfirmation: 'Подтверждение пароля',
    termsOfService: 'Условиями сервиса',
    privacyPolicy: 'Политикой конфиденциальности',
    termsOfServiceTitle: 'Условия Сервиса',
    privacyPolicyTitle: 'Политика Конфиденциальности',
    loginLoader: 'Вход...',
    passwordRecoveryTitle: 'Забыл Пароль',
    passwordRecoveryDescription:
      'Введите свой адрес электронной почты и мы вышлем вам дальнейшие инструкции',
    backToLogin: 'Вернуться к Входу',
    backToRegistration: 'Вернуться к регистрации',
    sendLink: 'Отправить Ссылку',
    sendLinkAgain: 'Отправить Ссылку ещё раз',
    sendLoader: 'Отправка...',
    signupLoader: 'Регистрация...',
    newPasswordTitle: 'Создание Нового Пароля',
    newPasswordButton: 'Создать новый пароль',
    newPasswordDescription: 'Пароль должен быть от 6 до 20 символов',
    sentCodeToEmail(email: string) {
      return `Мы отправили ссылку для подтверждения на электронную почту ${email}`
    },
    termsPolicyLinks: 'Я согласен с  <1>terms</1> и <2>policy</2>',
    congratulations: 'Поздравляем!',
    emailConfirmed: 'Ваша почта была подтверждена',
    emailExpired: 'Время жизни ссылки подтверждения истекло',
    expiredDescription:
      'Похоже что время жизни ссылки истекло. Не переживайте, мы можем выслать ссылку повторно',
    resendLink: 'Повторно отправить ссылку',
  },
}

export type LocaleType = typeof ru
