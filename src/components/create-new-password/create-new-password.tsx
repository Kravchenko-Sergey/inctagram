import { FC, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { useCreateNewPasswordMutation } from '@/api/auth-api/auth.api'
import { Button, Card, ControlledTextField, Typography } from '@/components'
import { PATH } from '@/consts/route-paths'
import { useTranslation } from '@/hooks/use-translation'
import { PasswordRecoveryFormType, passwordRecoverySchema } from '@/schemas'

import { FormFields, triggerZodFieldError } from '@/helpers/updateZodErrors'

import s from './create-new-password.module.scss'

type CreateNewPasswordProps = {
  code: string
}

export const CreateNewPassword: FC<CreateNewPasswordProps> = ({ code: recoveryCode }) => {
  const { t } = useTranslation()
  const { push } = useRouter()
  const {
    handleSubmit,
    control,
    trigger,
    formState: { isValid, touchedFields },
  } = useForm<PasswordRecoveryFormType>({
    resolver: zodResolver(passwordRecoverySchema(t)),
    mode: 'onBlur',
    defaultValues: {
      newPassword: '',
      passwordConfirmation: '',
    },
  })
  const [createNewPassword] = useCreateNewPasswordMutation()

  const onSubmit = async ({ newPassword }: PasswordRecoveryFormType) => {
    try {
      await createNewPassword({ newPassword, recoveryCode }).unwrap()
      push(PATH.LOGIN)
    } catch (error) {
      console.log('Error occured', error) // TODO display error notification
    }
  }

  useEffect(() => {
    const touchedFieldNames: FormFields[] = Object.keys(touchedFields) as FormFields[]

    triggerZodFieldError(touchedFieldNames, trigger)
  }, [t, touchedFields, trigger])

  return (
    <Card className={s.passwordRecovery}>
      <Typography variant="h1" className={s.title}>
        {t.auth.newPasswordTitle}
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          control={control}
          type="password"
          name="newPassword"
          label={t.auth.newPassword}
        />
        <ControlledTextField
          control={control}
          type="password"
          name="passwordConfirmation"
          label={t.auth.passwordConfirmation}
        />
        <Typography variant="regular_text_14" className={s.instructions}>
          {t.auth.newPasswordDescription}
        </Typography>
        <Button
          variant="primary"
          fullWidth
          className={s.submitBtn}
          type="submit"
          disabled={!isValid}
        >
          <Typography variant="semi-bold_small_text">{t.auth.newPasswordButton}</Typography>
        </Button>
      </form>
    </Card>
  )
}
