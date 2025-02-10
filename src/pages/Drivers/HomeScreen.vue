<template>
  <div class="min-h-screen p-4">
    <!-- Loading skeleton -->
    <div v-if="is_loaded == 0" class="flex flex-1 flex-col gap-4">
      <div class="grid auto-rows-min gap-4 md:grid-cols-3">
        <div class="aspect-video rounded-xl bg-muted/50" />
        <div class="aspect-video rounded-xl bg-muted/50" />
        <div class="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>

    <div v-else>
      <!-- PhonePe Test Section -->
      <div class="mb-4">
        <p class="mt-2">{{ message }}</p>
        <Button @click="startPayment" variant="secondary" class="mt-2">Start Payment</Button>
      </div>

      <!-- Welcome Card -->
      <Card class="mb-4">
        <CardHeader>
          <div class="flex items-center space-x-4">
            <img
              v-if="datetime_now.getHours() >= 4 && datetime_now.getHours() <= 8"
              alt="sunrise"
              src="https://img.icons8.com/color/30/000000/sunrise.png"
            />
            <!-- ... other time-based icons ... -->
            <div>
              <CardTitle>
                {{
                  datetime_now.getHours() >= 0 && datetime_now.getHours() <= 11
                    ? 'Good morning'
                    : datetime_now.getHours() >= 12 && datetime_now.getHours() <= 15
                    ? 'Good afternoon'
                    : 'Good evening'
                }}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-2xl font-semibold">
                Welcome back, <span v-if="$session.exists()">{{ Firstname }} {{ Lastname }}</span>
              </h2>
              <p class="text-muted-foreground">
                Here's what's happening with your deliveries today.
              </p>
            </div>
            <!-- <Button @click="websiteTour">Take a Tour</Button> -->
          </div>
        </CardContent>
      </Card>

      <!-- Features Section -->
      <h2 class="text-xl font-semibold mb-4">Features</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <!-- Store Deliveries Card -->
        <Card class="hover:shadow-lg transition-shadow cursor-pointer" @click="Assignments">
          <CardHeader>
            <CardTitle>Store Deliveries</CardTitle>
            <CardDescription>
              Details about all your new as well as previous deliveries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img src="delivery.png" alt="Delivery" class="w-16 h-16 mx-auto" />
          </CardContent>
        </Card>

        <!-- Restaurant Deliveries Card -->
        <Card
          class="hover:shadow-lg transition-shadow cursor-pointer"
          @click="RestaurantAssignments"
        >
          <CardHeader>
            <CardTitle>Restaurant Deliveries</CardTitle>
            <CardDescription>
              Details about all your new as well as previous deliveries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img src="delivery.png" alt="Delivery" class="w-16 h-16 mx-auto" />
          </CardContent>
        </Card>

        <!-- Floating Cash Card -->
        <Card class="hover:shadow-lg transition-shadow cursor-pointer" @click="FloatingCashDriver">
          <CardHeader>
            <CardTitle>Floating Cash</CardTitle>
            <CardDescription>
              Check details about your Earnings and Floating cash.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img src="cash-flow.png" alt="Cash Flow" class="w-16 h-16 mx-auto" />
          </CardContent>
        </Card>

        <!-- Login History Card -->
        <Card class="hover:shadow-lg transition-shadow cursor-pointer" @click="LoginHistory">
          <CardHeader>
            <CardTitle>Login History</CardTitle>
            <CardDescription> You can check your previous Login details here. </CardDescription>
          </CardHeader>
          <CardContent>
            <img src="login.png" alt="Login" class="w-16 h-16 mx-auto" />
          </CardContent>
        </Card>
      </div>

      <v-tour :steps="steps" name="myTour"></v-tour>
    </div>
  </div>
</template>

<script lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from 'src/components/ui/card'
import { Button } from 'src/components/ui/button'
import VueSession from 'vue-session'
import axios, { type AxiosInstance } from 'axios'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'


interface AllData {
  user: {
    first_name: string
    last_name: string
  }
}

export default defineComponent({
  components: {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Button,
  },
  beforeCreate: function () {
    if (this.$session.exists()) {
      if (this.$session.get('user_type') === 'admin') {
        this.$router.replace({ name: 'Delivery Admin' })
      } else if (this.$session.get('user_type') === 'driver') {
        this.$router.replace({ name: 'Delivery Agent' })
      } else {
        this.$router.replace({ name: 'Login' })
      }
    } else {
      this.$router.replace({ name: 'Login' })
    }
  },
  data() {
    const router = useRouter()
    return {
      drawer: false,
      value: true,
      progress: 0.5,
      Firstname: null as string | null,
      Lastname: null as string | null,
      is_loaded: 0,
      working_hours: [] as string[],
      totalTime: null as string | null,
      finalTime: null as string | null,
      datetime_now: new Date(),
      show: true,
      steps: [
        {
          target: '[data-v-step="0"]',

          content: 'Welcome to SOI Driver Dashboard',
          params: {
            highlight: true,
            enableScrolling: true,
            placement: 'top',
          },
        },
        {
          target: '[data-v-step="1"]',
          content: 'Here you will get all your store deliveries',
          params: {
            highlight: true,
            enableScrolling: true,
            placement: 'top',
          },
        },
        {
          target: '[data-v-step="2"]',
          content: 'Here you will get all your Restaurant deliveries',
          params: {
            placement: 'top',
            highlight: true,
            enableScrolling: true,
          },
        },
        {
          target: '[data-v-step="3"]',
          content: 'Click the button to get Floating cash history',
          params: {
            placement: 'top',
            highlight: true,
            enableScrolling: true,
          },
        },
        {
          target: '[data-v-step="4"]',
          content: 'You will get your Login History here  ',
          params: {
            placement: 'top',
            highlight: true,
            enableScrolling: true,
          },
        },
      ],
      demodata: 'ONE',
      message: 'Click the button to test the plugin.',
      isDeviceReady: false,
      pluginError: null as string | null,
      AllData: null as AllData | null,
      sum: 0,
      globalMixin: {
        api_url: process.env.API_URL || '',
      },
      $axios: axios as AxiosInstance,
      $router: router,
      $session: VueSession,
    }
  },
  methods: {
    onDeviceReady() {
      console.log('Device is ready')
      this.isDeviceReady = true
      this.initializePlugin()
    },
    initializePlugin() {
      if (!window.cordova?.plugins?.PhonePePGPlugin) {
        console.error('PhonePePGPlugin not found')
        this.pluginError = 'Plugin not available'
        return false
      }
      console.log('PhonePePGPlugin is available')
    },

    startPayment() {
      this.initializePlugin()

      const jsonData = {
        amount: 234,
        mobileNumber: 3242342343,
        orderId: 'sdfsdfsdf',
        userId: 'dsrgdfrgdfgv87dfygv87df',
        businessType: 'delivery',
        source: 'localhost',
        businessId: 'dfgsdfgdfg',
        merchantUserId: 'TSDFCKJBSGDFKSD',
        status_update_endpoint: 'dsfgvdfvsdfvsd',
      }

      // this.globalMixin.api_url + 'phonepay/start_payment_android_delivery/'
      let payload = null
      this.$axios
        .post('http://127.0.0.1:8000/phonepay/start_payment_android_delivery/', jsonData)
        .then((response) => {
          console.log('Payment initiated:', response.data)
          payload = response.data['payload']
        })
        .catch((error) => {
          console.error('Payment initiation error:', error)
        })

      window.cordova.plugins.PhonePePGPlugin.startPayment(
        payload,
        (success) => {
          console.log('Payment success:', success)
        },
        (error) => {
          console.error('Payment error:', error)
        }
      )
    },
    // websiteTour() {
    //   this.$tours['myTour'].start()
    // },
    Assignments() {
      this.$router.push({ path: 'Assignments' })
    },
    RestaurantAssignments() {
      this.$router.push({ path: 'AssignmentsRestaurant' })
    },
    FloatingCashDriver() {
      this.$router.push({ path: 'FloatingCashDriver' })
    },
    LoginHistory() {
      this.$router.push({ path: 'LoginHistory' })
    },
    updateTime() {
      this.datetime_now = new Date()
    },
    sumDurations(durations) {
      return durations.reduce((sum, string) => {
        let mins, secs
        ;[mins, secs] = string
          .split(':')
          .slice(-2)
          .map((n) => parseInt(n, 10))
        return sum + mins * 60 + secs
      }, 0)
    },

    formatDuration(duration) {
      function pad(number) {
        return `${number}`.slice(-2)
      }

      let hours = (duration / 3600) | 0
      let minutes = ((duration % 3600) / 60) | 0
      let seconds = duration % 60
      let minsSecs = `${pad(minutes)}:${pad(seconds)}`

      return hours + ':' + minsSecs
    },
    getData() {
      console.log(this.$session.get('user_id'))
      this.$axios
        .get(this.globalMixin.api_url + `delivery-agent/` + this.$session.get('ak_delivery_agent'))
        .then((response) => {
          this.AllData = response.data
          this.Firstname = this.AllData?.user.first_name ?? null
          this.Lastname = this.AllData?.user.last_name ?? null

          this.$axios
            .get(
              this.globalMixin.api_url +
                `delivery-agent-working-hour/?delivery_agent=` +
                this.$session.get('ak_delivery_agent')
            )
            .then((response) => {
              for (const hour of response.data) {
                this.working_hours.push(hour.working_hours)
              }
              this.sum = this.sumDurations(this.working_hours)
              this.totalTime = this.formatDuration(this.sum)
              const time = this.totalTime.split(':')
              let hr, min, seconds
              if (time[0].length < 2) hr = '0' + time[0]
              else hr = time[0]

              if (time[1].length < 2) min = '0' + time[1]
              else min = time[1]

              if (time[2].length < 2) seconds = '0' + time[2]
              else if (time[2].length < 1) seconds = '00'
              else seconds = time[2]

              this.finalTime = hr + ':' + min + ':' + seconds
              this.is_loaded = 1
            })
            .catch((error) => {
              console.log(error)
              this.is_loaded = -1
            })
        })
        .catch((error) => {
          console.log(error)
          this.is_loaded = -1
        })
    },
  },
  created() {
    document.addEventListener('deviceready', this.onDeviceReady, false)
    this.getData()
    this.datetime_now = new Date()
    setInterval(this.updateTime, 60000)
  },
})
</script>
