import { LocaleType } from './ru'
import { pluralizeEn } from '@/helpers/createPluralize'

export const en: LocaleType = {
  test: 'Lorem Ipsum is simply dummy text of the printing',
  ok: 'OK',
  yes: 'Yes',
  no: 'No',
  showMore: 'Show more',
  hide: 'Hide',
  languageSelect: {
    russian: 'Russian',
    english: 'English',
  },

  errors: {
    noResponse: 'Server does not response',
    requestFailed: 'Request Failed',
    loginIncorrectData: 'The email or password are incorrect. Try again please',
    loginFailed: 'Login Failed',
    loginIncorrectPassword: `The password is incorrect. Try again please`,
    regexUsername: 'Username must contain  0-9, a-z, A-Z, . _ -',
    regexFirstname: 'Firstname must contain a-z, A-Z',
    regexLastname: 'Lastname must contain a-z, A-Z',
    regexAboutMe: 'Field must contain 0-9, a-z, A-Z, . _ -',
    nonemptyUsername: 'Enter your Username',
    nonemptyFirstname: 'Enter your name',
    nonemptyLastname: 'Enter your last name',
    // minUsername: 'Username must be at least 6 characters',
    minUsername: (min: number) => `Username must be at least ${min} characters`,
    maxUsername: (max: number) => `Maximum number of characters  ${max}`,
    maxFirstname: (max: number) =>
      `The maximum length of the name must not exceed ${max} characters`,
    maxLastname: (max: number) =>
      `The maximum length of the last name must not exceed ${max} characters`,
    maxFieldLength: (max: number) => `Maximum number of characters - ${max}`,
    regexEmail: 'The email must match the format example@example.com',
    nonemptyEmail: 'Enter your email',
    nonemptyPassword: 'Enter your password',
    nonemptyConfirm: 'Confirm your password',
    regexPasswordMustContain:
      'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^' +
      ' _` { | } ~',
    minPassword: (min: number) => `Password must be at least ${min} characters`,
    maxPassword: 'Maximum number of characters 20',
    passwordsMustMatch: 'The passwords must match',
    emailNotFound: "User with this email doesn't exist",
    requiredTerms: 'Terms and Privacy Policy must be true',
    emailExists: 'User with this email is already registered',
    usernameExists: 'User with this username is already registered',
    under13: 'A user under 13 cannot create a profile.',
    imageUploadError: 'Upload error.',
    imageFormatError: 'File must be jpeg or png type',
    imageSizeError: 'File must be less than 10 MB.',
    // under13: (elem: ReactElement) => `A user under 13 cannot create a profile. ${elem} `,
    tellUsSomethingAboutYou: 'The field must not be empty',
    whereAreYouLive: 'Please indicate which city you live in',
    maxLengthPost: 'Max number of characters 500',
  },
  components: {
    selectPlaceholder: 'Select Box',
  },
  auth: {
    emailLabel: 'Email',
    emailSent: 'Email Sent',
    passwordLabel: 'Password',
    forgotPassword: 'Forgot password?',
    restorePassword: 'Forgot Password',
    haveAccount: `Do you have an account?`,
    notHaveAccount: `Don't have an account?`,
    signInTitle: 'Sign In',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    username: 'Username',
    passwordConfirmation: 'Password confirmation',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    termsOfServiceTitle: 'Terms of Service',
    privacyPolicyTitle: 'Privacy Policy',
    loginLoader: 'Logging in...',
    passwordRecoveryTitle: 'Forgot Password',
    passwordRecoveryDescription:
      'Enter your email address and we will send you further instructions',
    passwordRecoveryLinkSent:
      'The link has been sent by email. If you don’t receive an email send link again',
    backToLogin: 'Back to Sign In',
    backToRegistration: 'Back to sign up',
    sendLink: 'Send Link',
    sendLinkAgain: 'Send Link Again',
    sendLoader: 'Sending...',
    signupLoader: 'Signing Up...',
    newPassword: 'New password',
    newPasswordTitle: 'Create New Password',
    newPasswordButton: 'Create new password',
    newPasswordDescription: 'Your password must be between 6 and 20 characters',
    sentCodeToEmail(email: string) {
      return `We have sent a link to confirm your email to ${email}`
    },
    termsPolicyLinks: 'I agree to the <1>terms</1> and <2>policy</2>',
    congratulations: 'Congratulations!',
    emailConfirmed: 'Your email has been confirmed',
    emailExpired: 'Email verification link expired',
    expiredDescription:
      'Looks like the verification link has expired. Not to worry, we can send the link again',
    resendVerificationLink: 'Resend verification link',
    resendLink: 'Resend link',
    policy: '<1>one</1> <2>two</2> <3>three</3> <4>four</4>',
    policy1:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore' +
      ' magna aliqua. Fames ac turpis egestas integer eget aliquet nibh. Amet consectetur adipiscing elit ut aliquam' +
      ' purus sit amet luctus. Tortovitae purus faucibus ornare suspendisse sed nisi. Dolor sit amet consectetur' +
      ' adipiscing.',
    policy2:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et' +
      ' dolore' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore' +
      ' magna aliqua. Fames ac turpis egestas integer eget aliquet nibh. Amet consectetur adipiscing elit ut aliquam' +
      ' purus sit amet luctus. Tortovitae purus faucibus ornare suspendisse sed nisi. Dolor sit amet consectetur' +
      ' adipiscing.',
    policy3:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et' +
      ' dolore' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore' +
      ' magna aliqua. Fames ac turpis egestas integer eget aliquet nibh. Amet consectetur adipiscing elit ut aliquam' +
      ' purus sit amet luctus. Tortovitae purus faucibus ornare suspendisse sed nisi. Dolor sit amet consectetur' +
      ' adipiscing.',
    policy4:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et' +
      ' dolore' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore' +
      ' magna aliqua. Fames ac turpis egestas integer eget aliquet nibh. Amet consectetur adipiscing elit ut aliquam' +
      ' purus sit amet luctus. Tortovitae purus faucibus ornare suspendisse sed nisi. Dolor sit amet consectetur' +
      ' adipiscing.',
    terms: '<1>one</1> <2>two</2> <3>three</3> <4>four</4>',
    terms1:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore' +
      ' magna aliqua. Fames ac turpis egestas integer eget aliquet nibh. Amet consectetur adipiscing elit ut aliquam' +
      ' purus sit amet luctus. Tortovitae purus faucibus ornare suspendisse sed nisi. Dolor sit amet consectetur' +
      ' adipiscing.',
    terms2:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et' +
      ' dolore' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore' +
      ' magna aliqua. Fames ac turpis egestas integer eget aliquet nibh. Amet consectetur adipiscing elit ut aliquam' +
      ' purus sit amet luctus. Tortovitae purus faucibus ornare suspendisse sed nisi. Dolor sit amet consectetur' +
      ' adipiscing.',
    terms3:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et' +
      ' dolore' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore' +
      ' magna aliqua. Fames ac turpis egestas integer eget aliquet nibh. Amet consectetur adipiscing elit ut aliquam' +
      ' purus sit amet luctus. Tortovitae purus faucibus ornare suspendisse sed nisi. Dolor sit amet consectetur' +
      ' adipiscing.',
    terms4:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et' +
      ' dolore' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore' +
      ' magna aliqua. Fames ac turpis egestas integer eget aliquet nibh. Amet consectetur adipiscing elit ut aliquam' +
      ' purus sit amet luctus. Tortovitae purus faucibus ornare suspendisse sed nisi. Dolor sit amet consectetur' +
      ' adipiscing.',
  },
  profile: {
    firstName: 'First Name',
    lastName: 'Last Name',
    citySelect: 'Select your city',
    aboutMe: 'About Me',
    saveChanges: 'Save Changes',
    addAvatar: 'Add a Profile Photo',
    generalInfo: 'General information',
    devices: 'Devices',
    accManagement: 'Account Management',
    myPayments: 'My payments',
    selectImage: 'Select from computer',
    dateOfBirth: 'Date of birth',
    backToProfile: 'Back to profile page',
    logOut: 'Are you really want to log out of your account ',
    titleLogOut: 'Log Out',
    profileSettings: 'Profile Settings',
    avatarAlt: 'User avatar',
    or: 'Or',
    personal: 'Personal',
    business: 'Business',
    accountType: 'Account type',
    yourSubscriptionCosts: 'Your subscription costs',
    tenPerDay: '$10 per 1 Day',
    fiftyPerWeek: '$50 per 7 Day',
    hundredPerMonths: '$100 per month',
    fivePerDay: '$5 per 1 Day',
    twentyFivePerWeek: '$25 per 7 Day',
    fiftyPerMonths: '$50 per month',
    success: 'Success',
    paymentSuccessful: 'Payment was successful!',
    error: 'Error',
    transactionFailed: 'Transaction failed. Please, write to support',
    backToPayment: 'Back to payment',
    currentSubscriptions: 'Current Subscription:',
    expireAt: 'Expire at',
    nextPayment: 'Next payment',
    following(count: number): any {
      const str = pluralizeEn(count)

      switch (str) {
        case 'one':
          return `Following`
        case 'other':
          return `Following`
      }
    },
    followers(count: number): any {
      const str = pluralizeEn(count)

      switch (str) {
        case 'one':
          return `Follower`
        case 'other':
          return `Followers`
      }
    },
    publications(count: number): any {
      const str = pluralizeEn(count)

      switch (str) {
        case 'one':
          return `Publication`
        case 'other':
          return `Publications`
      }
    },
  },
  post: {
    addNewPost: {
      cropping: 'Cropping',
      filters: 'Filters',
      publication: 'Publication',
      addPhoto: 'Add Photo',
      next: 'Next',
      original: 'Original',
      showResult: 'Show Result',
      close: 'Close',
      areYouSure: 'Are You Sure',
      publish: 'Publish',
      addDescription: 'Add Description',
      pictureCropped: 'Picture  successfully cropped',
      discard: 'Discard',
      saveDraft: 'Save Draft',
    },
    edit: {
      title: 'Edit',
      saveChanges: 'Save Changes',
      addDescription: 'Add publication descriptions',
      closePost: 'Close Post',
      areYouSure:
        'Do you really want to close the edition of the publication? If you close changes won’t be saved',
    },
    editPost: 'Index Post',
    deletePost: 'Delete Post',
    areYouSureToDelete: 'Are you sure you want to delete this post?',
  },
  sidebars: {
    home: 'Home',
    create: 'Create',
    myProfile: 'My Profile',
    messenger: 'Messenger',
    search: 'Search',
    statistics: 'Statistics',
    favorites: 'Favorites',
    logout: 'Log Out',
  },
  data: {
    lessMinuteAgo: 'Less than a minute ago',
    minute: 'minute',
    minutes: 'minutes',
    minuteU: 'minutes',
    minuteB: 'minutes',
    minut: 'minutes',
    hour: 'hour',
    hoursA: 'hours',
    hours21: 'hours',
    hours: 'hours',
    ago: 'ago',
    day: 'day',
    days2: 'days',
    days: 'days',
    more2Weeks: 'More than 2 weeks ago',
  },
  months: {
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
  },
}
