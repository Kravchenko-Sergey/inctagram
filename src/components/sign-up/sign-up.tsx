import React, { memo, useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { register } from 'tsconfig-paths'
import { z } from 'zod'

import { useRegistrationMutation } from '../../../api/auth-api/auth.api'

import s from './sign-up.module.scss'

import { GitHubIcon } from '@/assets/icons/github-icon'
import { GoogleIcon } from '@/assets/icons/google-icon'
import { Button } from '@/components/button'
import { ControlledCheckbox } from '@/components/controlled/controlled-checkbox'
import { ControlledTextField } from '@/components/controlled/controlled-text-field'
import { Modal } from '@/components/modal'
import { Typography } from '@/components/typography'
import { passwordRegex, usernameRegex } from '@/consts/regex'
import { PATH } from '@/consts/route-paths'
import { ErrorType } from '@/types'

const registrationSchema = z
  .object({
    username: z
      .string()
      .trim()
      .nonempty('Enter Username')
      .min(6, 'Username must be at least 6 characters')
      .max(30, 'Maximum number of characters 30')
      .regex(usernameRegex),
    email: z
      .string()
      .trim()
      .nonempty('Enter your email')
      .email('The email must match the format example@example.com'),
    password: z
      .string()
      .regex(
        passwordRegex,
        'Password must contain 1-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^' +
          ' _` { | } ~'
      )
      .trim()
      .nonempty('Enter password')
      .min(6, 'Password must be at least 6 characters'),
    confirm: z
      .string()
      .regex(
        passwordRegex,
        'Password must contain 1-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^' +
          ' _` { | } ~'
      )
      .trim()
      .nonempty('Enter password')
      .min(6, 'Password must be at least 6 characters'),
    read: z.boolean(),
  })
  .refine(data => data.password === data.confirm, {
    message: 'The passwords must match',
    path: ['confirm'],
  })
  .superRefine((data, ctx) => {
    if (!data.read) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Terms and Privacy Policy must be true',
        path: ['read'],
      })
    }
  })

export type RegisterFormType = z.infer<typeof registrationSchema>

export const SignUp = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { push } = useRouter()
  const [register] = useRegistrationMutation()
  const {
    reset,
    formState: { errors, isValid },
    control,
    setError,
    getValues,
    handleSubmit,
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registrationSchema),
    mode: 'onBlur',
    defaultValues: { username: '', email: '', password: '', confirm: '', read: false },
  })

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    reset()
  }, [reset])

  const handleChangeModal = useCallback(() => {
    setIsModalOpen(false)
    push(PATH.LOGIN)
  }, [push])

  const onSubmit = useCallback(
    async (data: RegisterFormType) => {
      try {
        await register({
          username: data.username,
          email: data.email,
          password: data.password,
        }).unwrap()
        setIsModalOpen(true)
      } catch (e: unknown) {
        const error = e as ErrorType

        // if (error?.data?.message === 'User with this email is already registered') {
        //   setError('email', { type: 'email', message: t.errors.emailExists })
        // } else if (error?.data?.message === 'User with this username is already registered') {
        //   setError('username', { type: 'username', message: t.errors.usernameExists })
        // } else if (error.status === 500) {
        //   // setErrorServer('noResponse')
        //   // dispatch(setAppError(t.errors.noResponse))
        // } else {
        //   // setErrorServer('requestFailed')
        //   // dispatch(setAppError(t.errors.requestFailed))
        // }
      }
    },
    [register]
  )

  return (
    <>
      <div className={s.root}>
        <Typography variant="h1" className={s.title}>
          Sign Up
        </Typography>
        <div className={s.icons}>
          <GoogleIcon className={s.icon} />
          <GitHubIcon className={s.icon} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <ControlledTextField label={'Username'} control={control} name={'username'} />
          <ControlledTextField
            // placeholder={'Epam@epam.com'}
            label={'Email'}
            control={control}
            name={'email'}
          />
          <ControlledTextField
            type={'password'}
            label={'Password'}
            control={control}
            name={'password'}
          />
          <ControlledTextField
            type={'password'}
            label={'Password confirmation'}
            control={control}
            name={'confirm'}
          />
          <div className={s.checkboxWrap}>
            <ControlledCheckbox
              errorMessage={errors.read?.message}
              control={control}
              name={'read'}
            />

            <Typography variant="small_text"></Typography>
          </div>

          <Button
            disabled={!isValid}
            className={s.btnSingUp}
            fullWidth
            variant="primary"
            type={'submit'}
          >
            <Typography color="inherit" variant="h3">
              Sign Up
            </Typography>
          </Button>
        </form>
        <Typography className={s.footerTitle} variant="regular_text_16">
          Do you have an account?
        </Typography>
        <Button className={s.btnSignIn} variant="link" href={PATH.LOGIN} as="a" fullWidth>
          <Typography color="primary" variant="h3">
            Sign In
          </Typography>
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        title={'Email sent'}
        className={s.modal}
        onOpenChange={handleCloseModal}
      >
        {/*{t.auth.sentCodeToEmail(getValues('email'))}*/}
        <Button variant="primary" onClick={handleChangeModal} className={s.modalButton}>
          <Typography color="inherit" variant="h3">
            OK
          </Typography>
        </Button>
      </Modal>
    </>
  )
})
