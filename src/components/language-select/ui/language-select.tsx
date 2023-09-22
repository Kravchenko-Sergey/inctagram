import { memo, useMemo, useState } from 'react'

import { useRouter } from 'next/router'

import { GreatBritainComponent } from '@/components/language-select/ui/great-britain-component'
import { RussiaComponent } from '@/components/language-select/ui/russia-component'
import { Select } from '@/components/select'

type LocalType = 'ru' | 'en'

export const LanguageSelect = memo(() => {
  const { locale, push, pathname, query, asPath, locales } = useRouter()
  const typedLocale = locale as LocalType
  const [value, setValue] = useState(typedLocale)

  const changeLangHandler = (value: string) => {
    const locale = value as LocalType

    push({ pathname, query }, asPath, { locale })
    setValue(locale)
  }

  const countries = {
    en: <GreatBritainComponent />,
    ru: <RussiaComponent />,
  }
  const options = useMemo(() => {
    return Array.isArray(locales)
      ? locales.map(el => ({
          value: el,
          label: el == 'ru' ? <RussiaComponent /> : <GreatBritainComponent />,
        }))
      : []
  }, [locales])

  return (
    <div>
      <Select
        placeholder={locale ? countries[typedLocale] : countries.ru}
        options={options}
        value={countries[value]}
        onChange={changeLangHandler}
      />
    </div>
  )
})

//
// export const LanguageSelect = memo(() => {
//   const { locale, push, pathname, query, asPath, locales } = useRouter()
//
//   const changeLangHandler = (event: ChangeEvent<HTMLSelectElement>) => {
//     const locale = event.currentTarget.value
//
//     push({ pathname, query }, asPath, { locale })
//   }
//
//   return (
//     <div className={cls.languageSelect}>
//       <select onChange={changeLangHandler} defaultValue={locale}>
//         {locales?.map(locale => {
//           return (
//             <option value={locale} key={locale}>
//               {locale}
//             </option>
//           )
//         })}
//       </select>
//     </div>
//   )
// })
