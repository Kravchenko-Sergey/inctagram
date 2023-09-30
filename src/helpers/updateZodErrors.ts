// type FormType = LoginFormType | RegisterFormType | ProfileSettingFormType | PasswodsMatchFormType
import { LoginFormType } from '@/api/auth-api/types'
import { ProfileSettingsFormValues } from '@/schemas/profile-settings-schema'
import { RegisterFormType } from '@/schemas/registrationSchema'

type FormType = RegisterFormType | LoginFormType | ProfileSettingsFormValues
// add your form manual type

export type FormFields = keyof FormType

/**
 * reset error messenger from zod on touched by user fields (trigger validation)
 * @param touchedFieldNames names from touched fields in react hook form
 * @param trigger trigger func from react hook form
 */
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
