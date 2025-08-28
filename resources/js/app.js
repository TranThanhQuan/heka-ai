import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

// thư viện ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import VueScrollPicker from "vue-scroll-picker";
import "vue-scroll-picker/style.css";


// SweetAlert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// i18n
import i18n from './i18n'

const appName = import.meta.env.VITE_APP_NAME || 'Heka AI';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) })

        app.use(plugin)
        app.use(ZiggyVue)
        app.use(ElementPlus)
        app.use(VueSweetalert2)
        app.use(VueScrollPicker)
        app.use(i18n)

        window.Swal = app.config.globalProperties.$swal
        app.mount(el)
    },
    progress: {
        color: '#4B5563',
    },
});
