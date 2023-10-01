import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCreateNewPasswordMutation } from '@/api/auth-api/auth.api'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { ControlledTextField } from '@/components/controlled/controlled-text-field'
import { Typography } from '@/components/typography'
import { useTranslation } from '@/hooks/use-translation'
import {
  passwordRecoverySchema,
  PasswordRecoverySchemaType,
} from '@/schemas/passwordRecoverySchema'

import s from './create-new-password.module.scss'

type CreateNewPasswordProps = {
  code: string
}

export const CreateNewPassword: FC<CreateNewPasswordProps> = ({ code: recoveryCode }) => {
  const { t } = useTranslation()
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<PasswordRecoverySchemaType>({
    resolver: zodResolver(passwordRecoverySchema(t)),
    mode: 'onBlur',
  })
  const [createNewPassword] = useCreateNewPasswordMutation()

  const onSubmit = async ({ newPassword }: PasswordRecoverySchemaType) => {
    try {
      await createNewPassword({ newPassword, recoveryCode })
    } catch (error) {
      console.log('Error occured', error) // TODO display error notification
    }
  }

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
