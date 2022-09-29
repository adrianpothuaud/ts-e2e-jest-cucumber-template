import { TBrowserLanguage } from '@/web/TBrowserLanguage'

export const getLanguageParams = (browserLang: TBrowserLanguage): { acceptLang: string, countryCode: string, lang: string } => {
  if (browserLang === 'dutch') return { acceptLang: 'nl-NL', countryCode: 'NL', lang: 'nl' }
  else if (browserLang === 'english') return { acceptLang: 'nl-NL', countryCode: 'NL', lang: 'nl' }
  else if (browserLang === 'french') return { acceptLang: 'fr-FR', countryCode: 'FR', lang: 'fr' }
  else if (browserLang === 'german') return { acceptLang: 'de-DE', countryCode: 'DE', lang: 'de' }
  else if (browserLang === 'italian') return { acceptLang: 'it-IT', countryCode: 'IT', lang: 'it' }
  else if (browserLang === 'spanish') return { acceptLang: 'es-ES', countryCode: 'ES', lang: 'es' }
  else return { acceptLang: 'en-GB', countryCode: 'GB', lang: 'en' }
}
