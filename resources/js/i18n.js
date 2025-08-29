import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import vi from './locales/vi.json'

// 🔹 Load tất cả file JSON trong thư mục locales
const localeFiles = import.meta.glob('./locales/*.json', { eager: true })

// 🔹 Xử lý và gom thành object messages
const messages = Object.fromEntries(
  Object.entries(localeFiles).map(([path, module]) => {
    const locale = path.split('/').pop().replace('.json', '') // -> "en", "vi"...
    const data = module.default || module                   // unwrap nếu có default
    console.log(`✅ Loaded locale: ${locale}`, data)
    return [locale, data]
  })
)

// 🔹 Khởi tạo i18n
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  warnHtmlMessage: false,
  locale: 'en',          // mặc định
  fallbackLocale: 'vi',  // fallback nếu thiếu
  messages: { en, vi }
})

export default i18n
