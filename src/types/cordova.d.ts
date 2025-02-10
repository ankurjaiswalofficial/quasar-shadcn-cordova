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
