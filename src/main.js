import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from '@/components/ui'
import initSentry from "@/helpers/sentry/sentry.js";
import {createI18n} from "vue-i18n";
import ruText from '@/translate/ru.json'
import enText from '@/translate/en.json'

const i18n = createI18n({
    locale: 'ru',
    fallbackLocale: 'en',
    messages: {
        ru: ruText,
        en: enText
    }
})

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app.use(store)
    .use(i18n)
    .use(router)
    .mount('#app')
