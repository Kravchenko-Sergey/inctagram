import { LocaleType } from './ru'

export const en: LocaleType = {
  test: 'Lorem Ipsum is simply dummy text of the printing',
  ok: 'OK',
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
    regexUsername: 'Username must contain  1-9, a-z, A-Z, . _ -',
    regexFirstname: 'Firstname must contain a-z, A-Z',
    regexLastname: 'Lastname must contain a-z, A-Z',
    regexAboutMe: 'Field must contain 1-9, a-z, A-Z, . _ -',
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
      'Password must contain 1-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^' +
      ' _` { | } ~',
    minPassword: (min: number) => `Password must be at least ${min} characters`,
    maxPassword: 'Maximum number of characters 20',
    passwordsMustMatch: 'The passwords must match',
    emailNotFound: "User with this email doesn't exist",
    requiredTerms: 'Terms and Privacy Policy must be true',
    emailExists: 'User with this email is already registered',
    usernameExists: 'User with this username is already registered',
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
  },
}
