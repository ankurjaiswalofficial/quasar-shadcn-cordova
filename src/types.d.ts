import { type Plugin } from 'vue'
interface CordovaPlugins {
  PhonePePGPlugin: {
    startPayment: (payload: any, success: (result: any) => void, error: (error: any) => void) => void;
  }
}

interface Window {
  cordova: {
    plugins: CordovaPlugins;
  }
}

// Vue Session
declare module 'vue-session' {
  const VueSession: Plugin
  export default VueSession
}

// Vue Moment
declare module 'vue-moment' {
  const VueMoment: Plugin
  export default VueMoment
}

// Vue OTP Input
declare module '@bachdgvn/vue-otp-input' {
  const OtpInput: Component
  export default OtpInput
}

// Vue Awesome Countdown
declare module 'vue-awesome-countdown' {
  const vueAwesomeCountdown: Plugin
  export default vueAwesomeCountdown
}

// Vue Tour
declare module 'vue-tour' {
  const VueTour: Plugin
  export default VueTour
}
