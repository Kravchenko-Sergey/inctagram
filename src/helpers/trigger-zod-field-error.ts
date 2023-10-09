import { LoginFormType } from '@/api/auth-api/types'
import { PasswordRecoveryFormType, ProfileSettingsFormType, RegisterFormType } from '@/schemas'

// add your form manual type
type FormType =
  | RegisterFormType
  | LoginFormType
  | PasswordRecoveryFormType
  | ProfileSettingsFormType

export type FormFields = keyof FormType

export const triggerZodFieldError = (
  touchedFieldNames: FormFields[],
  trigger: (name?: FormFields | FormFields[]) => Promise<boolean>
) => {
  if (touchedFieldNames.length > 0) {
    touchedFieldNames.forEach(fieldName => {
      trigger(fieldName as FormFields)
    })
  }
}
