import { createI18n } from 'vue-i18n'

// Dùng glob để load tất cả file json trong /locales
const messages = Object.fromEntries(
  Object.entries(import.meta.glob('./locales/*.json', { eager: true }))
    .map(([key, value]) => {
      const locale = key.match(/([A-Za-z0-9-_]+)\.json$/i)[1]
      return [locale, value.default]
    })
)

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    warnHtmlMessage: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages
  })


export default i18n
