<template>
  <router-view />
</template>

<script lang="ts">
import { createApp } from 'vue'
import VueSession from 'vue-session'
// import VueMoment from 'vue-moment'
// import moment from 'moment-timezone'
import OtpInput from '@bachdgvn/vue-otp-input'
import vueAwesomeCountdown from 'vue-awesome-countdown'
import VueTour from 'vue-tour'
import 'vue-tour/dist/vue-tour.css'

const app = createApp({
  name: 'App',
})

app.use(VueSession, { persist: true })
// app.use(VueMoment, { moment })
app.component('v-otp-input', OtpInput)
app.use(vueAwesomeCountdown, 'vac')
app.use(VueTour)

app.mixin({
  data() {
    return {
      globalMixin: {
        source: 'https://qa.storesofindia.com/',
        api_url: 'https://qa.storesofindia.com/store/api-v1/',
      },
    }
  },
})

export default app
</script>
