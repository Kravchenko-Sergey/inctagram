import React from 'react'
import Image from 'next/image'
import { Avatar } from '@/components/ui/avatar'
import { useGetProfileQuery } from '@/services/profile'
import { useMeQuery } from '@/services/auth'
import { Button, ControlledSelect, ControlledTextArea, Loader, Typography } from '@/components'
import s from './publication.module.scss'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { publicationSchema, PublicationSchemaSchemaType } from '@/schemas/publication-schema'
import { useTranslation } from '@/hooks'

type PublicationProps = {
  imageUrl: string
}
const Cities = [
  // временный вариант
  { label: 'Grodno', value: 'Grodno' },
  { label: 'Chita', value: 'Chita' },
  { label: 'Baghdad', value: 'Baghdad' },
]

export const Publication = ({ imageUrl }: PublicationProps) => {
  const { data: me } = useMeQuery()
  const { data: profile, isLoading, isFetching } = useGetProfileQuery({ profileId: me?.userId })
  const { t } = useTranslation()

  const { handleSubmit, control, getValues } = useForm<PublicationSchemaSchemaType>({
    resolver: zodResolver(publicationSchema(t)),
    mode: 'onBlur',
    defaultValues: {
      comment: '',
      location: 'Grodno',
    },
  })
  const onSubmit = (data: PublicationSchemaSchemaType) => {
    console.log('data', data)
  }

  if (isLoading || isFetching) {
    return <Loader />
  }

  return (
    <div className={s.container}>
      <div className={s.imageContaner}>
        {imageUrl && (
          <Image className={s.image} width={485} height={504} src={imageUrl} alt="post image" />
        )}
      </div>
      {/*Header*/}
      <form onSubmit={handleSubmit(onSubmit)} className={s.content}>
        <div className={s.mainContent}>
          <div className={s.header}>
            <Avatar photo={profile?.avatars[0].url} className={s.avatar} size={36} />
            <Typography className={s.headerTitle} variant="regular_text_16">
              {profile?.firstName}
            </Typography>
          </div>

          {/*  Content Section*/}
          <ControlledTextArea
            classNameTextArea={s.textAreaContainer}
            placeholder={'Add comment'}
            label={'Add publication descriptions'}
            control={control}
            name="comment"
          />
        </div>
        {/*Location Section*/}
        {/*<div>*/}
        {/*  <Button style={{ position: 'relative', zIndex: 1000 }} type={'submit'} variant="primary">*/}
        {/*    Publish*/}
        {/*  </Button>*/}
        {/*</div>*/}
        <div className={s.locationPart}>
          <ControlledSelect
            options={Cities}
            label={t.profile.citySelect}
            control={control}
            placeholder={t.profile.citySelect}
            name="location"
            className={s.selectWrapper}
          />
          <div className={s.locationItem}>
            <div className={s.locationTitleWrapper}>
              <Typography variant="regular_text_16">{getValues().location}</Typography>
            </div>
            <Typography color="secondary" variant="small_text">
              Washington Square Park
            </Typography>
          </div>
          <div className={s.locationItem}>
            <div className={s.locationTitleWrapper}>
              <Typography variant="regular_text_16">{getValues().location}</Typography>
            </div>
            <Typography color="secondary" variant="small_text">
              Washington Square Park
            </Typography>
          </div>
        </div>
      </form>
    </div>
  )
}
