import { pluralizeRu } from '@/helpers/createPluralize'

export const ru = {
  test: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати ',
  ok: 'OK',
  yes: 'Да',
  no: 'Нет',
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
    regexUsername: 'Имя пользователя должно содержать 0-9, a-z, A-Z, . _ -',
    regexFirstname: 'Имя должно содержать а-я, А-Я',
    regexLastname: 'Фамилия должна содержать а-я, А-Я',
    regexAboutMe: 'Поле должно содержать 0-9, a-z, A-Z, . _ -',
    nonemptyUsername: 'Введите имя пользователя',
    nonemptyFirstname: 'Введите имя',
    nonemptyLastname: 'Введите фамилию',
    minUsername: (min: number) => `Длина имени пользователя должна быть не менее ${min} символов`,
    maxUsername: (max: number) =>
      `Максимальная длина имени пользователя не должна превышать  ${max} символов`,
    maxFirstname: (max: number) => `Максимальная длинна имени не должна превышать  ${max} символов`,
    maxLastname: (max: number) => `Максимальная длина фамилии не должна превышать  ${max} символов`,
    maxFieldLength: (max: number) => `Максимальное количество символов - ${max}`,
    regexEmail: 'Электронная почта должна соответствовать типу example@example.com',
    nonemptyEmail: 'Введите адрес электронной почты',
    nonemptyPassword: 'Введите пароль',
    nonemptyConfirm: 'Повторно введите пароль',
    regexPasswordMustContain:
      'Пароль должен содержать следующие символы 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / :' +
      ' ; < = > ? @ [ \\ ] ^ _` { | } ~',
    minPassword: (min: number) => `Пароль должен должен быть длиной не менее ${min} символов`,
    maxPassword: 'Пароль должен быть не более 20 символов',
    passwordsMustMatch: 'Пароли должны совпадать',
    emailNotFound: 'Пользователь с такими электронным адресом не существует',
    requiredTerms: 'Нужно подтвердить согласие с правилами сервиса и политикой безопасности',
    emailExists: 'Пользователь с такой электронной почтой уже существует',
    usernameExists: 'Пользователь с таким именем уже существует',
    under13: 'Возраст пользователя должен быть старше 13 лет.',
    imageUploadError: 'Ошибка загрузки файла.',
    imageFormatError: 'Файл должен иметь формат jpg или png.',
    imageSizeError: 'Файл должен быть не больше 10 мб.',
    // under13: (elem: ReactElement) => `Возраст пользователя должен быть старше 13 лет. ${elem} `,
    tellUsSomethingAboutYou: 'Поле не должно быть пустым',
    whereAreYouLive: 'Укажите в каком городе вы живете',
    maxLengthPost: 'Максимальное количество символов для поста равно 500',
  },
  components: {
    selectPlaceholder: 'Выберете опцию',
  },
  auth: {
    emailLabel: 'Электронная почта',
    emailSent: 'Письмо с подтверждением отправлено',
    passwordLabel: 'Пароль',
    forgotPassword: 'Забыли пароль?',
    restorePassword: 'Восстановление пароля',
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
    passwordRecoveryLinkSent:
      'Ссылка для восстановление пароля была отправлена на почту. Если Вы не получили ссылку, отправьте её еще раз',
    backToLogin: 'Вернуться к Входу',
    backToRegistration: 'Вернуться к регистрации',
    sendLink: 'Отправить Ссылку',
    sendLinkAgain: 'Отправить Ссылку ещё раз',
    sendLoader: 'Отправка...',
    signupLoader: 'Регистрация...',
    newPassword: 'Новый пароль',
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
    resendVerificationLink: 'Повторно отправить ссылку для проверки почты',
    resendLink: 'Повторно отправить ссылку',
    policy: '<1>one</1> <2>two</2> <3>three</3> <4>four</4>',
    policy1:
      'Равным образом начало повседневной работы по формированию позиции создаёт предпосылки' +
      'качественно новых шагов для новых предложений. Соображения высшего порядка, а также новая' +
      ' модель организационной деятельности представляет собой интересный эксперимент проверки' +
      ' форм воздействия! Задача организации, в особенности же новая модель организационной' +
      ' деятельности способствует повышению актуальности.',
    policy2:
      'Равным образом начало повседневной работы по формированию позиции создаёт предпосылки' +
      'качественно новых шагов для новых предложений. Соображения высшего порядка, а также новая' +
      ' модель организационной деятельности представляет собой интересный эксперимент проверки' +
      ' форм воздействия! Задача организации, в особенности же новая модель организационной' +
      ' деятельности способствует повышению актуальности.',
    policy3:
      'Равным образом начало повседневной работы по формированию позиции создаёт предпосылки' +
      'качественно новых шагов для новых предложений. Соображения высшего порядка, а также новая' +
      ' модель организационной деятельности представляет собой интересный эксперимент проверки' +
      ' форм воздействия! Задача организации, в особенности же новая модель организационной' +
      ' деятельности способствует повышению актуальности.',
    policy4:
      'Равным образом начало повседневной работы по формированию позиции создаёт предпосылки' +
      'качественно новых шагов для новых предложений. Соображения высшего порядка, а также новая' +
      ' модель организационной деятельности представляет собой интересный эксперимент проверки' +
      ' форм воздействия! Задача организации, в особенности же новая модель организационной' +
      ' деятельности способствует повышению актуальности.',
    terms: '<1>one</1> <2>two</2> <3>three</3> <4>four</4>',
    terms1:
      'Равным образом начало повседневной работы по формированию позиции создаёт предпосылки' +
      'качественно новых шагов для новых предложений. Соображения высшего порядка, а также новая' +
      ' модель организационной деятельности представляет собой интересный эксперимент проверки' +
      ' форм воздействия! Задача организации, в особенности же новая модель организационной' +
      ' деятельности способствует повышению актуальности.</1>',
    terms2:
      'Равным образом начало повседневной работы по формированию позиции создаёт предпосылки' +
      'качественно новых шагов для новых предложений. Соображения высшего порядка, а также новая' +
      ' модель организационной деятельности представляет собой интересный эксперимент проверки' +
      ' форм воздействия! Задача организации, в особенности же новая модель организационной' +
      ' деятельности способствует повышению актуальности.',
    terms3:
      'Равным образом начало повседневной работы по формированию позиции создаёт предпосылки' +
      'качественно новых шагов для новых предложений. Соображения высшего порядка, а также новая' +
      ' модель организационной деятельности представляет собой интересный эксперимент проверки' +
      ' форм воздействия! Задача организации, в особенности же новая модель организационной' +
      ' деятельности способствует повышению актуальности.',
    terms4:
      'Равным образом начало повседневной работы по формированию позиции создаёт предпосылки' +
      'качественно новых шагов для новых предложений. Соображения высшего порядка, а также новая' +
      ' модель организационной деятельности представляет собой интересный эксперимент проверки' +
      ' форм воздействия! Задача организации, в особенности же новая модель организационной' +
      ' деятельности способствует повышению актуальности.',
  },
  profile: {
    firstName: 'Имя',
    lastName: 'Фамилия',
    citySelect: 'Выберите свой город',
    aboutMe: 'Обо мне',
    saveChanges: 'Сохранить',
    addAvatar: 'Добавить фото',
    generalInfo: 'Общая информация',
    devices: 'Устройства',
    accManagement: 'Управление счетами',
    myPayments: 'Мои платежи',
    selectImage: 'Выбрать изображение с этого компьютера',
    dateOfBirth: 'День рождения',
    backToProfile: 'Вернуться на страницу профиля',
    logOut: 'Вы действительно хотите выйти из аккаунта ',
    titleLogOut: 'Выйти',
    profileSettings: 'Настройки профиля',
    avatarAlt: 'Аватар пользователя',
    following(count: number) {
      const str = pluralizeRu(count)

      switch (str) {
        case 'one':
          return `подписка`
        case 'few':
          return `подписки`
        case 'many':
          return `подписок`
      }
    },
    followers(count: number) {
      const str = pluralizeRu(count)

      switch (str) {
        case 'one':
          return `подписчик`
        case 'few':
          return `подписчика`
        case 'many':
          return `подписчиков`
      }
    },
    publications(count: number) {
      const str = pluralizeRu(count)

      switch (str) {
        case 'one':
          return `пост`
        case 'few':
          return `поста`
        case 'many':
          return `постов`
      }
    },
  },
  post: {
    addNewPost: {
      cropping: 'Редактирование',
      filters: 'Фильтры',
      publication: 'Публикация',
      addPhoto: 'Добавить фото',
      next: 'Далее',
      original: 'Оригинал',
      showResult: 'Показать результаты',
      close: 'Закрыть',
      areYouSure: 'Вы уверены?',
      publish: 'Опубликовать',
      addDescription: 'Добавить описание',
      pictureCropped: 'Изображение успешно обрезано',
      discard: 'Сбросить',
      saveDraft: 'Сохранить',
    },
    editPost: 'Peдактировать',
    edit: {
      saveChanges: 'Сохранить изменения',
      title: 'Peдактировать',
      addDescription: 'Добавить описание поста',
      closePost: 'Закрыть пост',
      areYouSure:
        'Вы уверены, что хотите закрыть редактирование поста? После закрытия изменения не сохранятся',
    },
    deletePost: 'Удалить пост',
    areYouSureToDelete: 'Вы уверены что хотите удалить этот пост?',
  },
  sidebars: {
    home: 'Главная',
    create: 'Создать пост',
    myProfile: 'Мой профиль',
    messenger: 'Мессенджер',
    search: 'Поиск',
    statistics: 'Статистика',
    favorites: 'Избранное',
    logout: 'Выйти',
  },
}

export type LocaleType = typeof ru
