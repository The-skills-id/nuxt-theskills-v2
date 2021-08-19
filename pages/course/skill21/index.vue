<template>
  <v-app>
    <v-container grid-list-md>
      <v-row dense>
        <v-col cols="12">
          <v-breadcrumbs :items="items"></v-breadcrumbs>
          <v-card color="#385F73" dark>
            <v-card-title class="headline"
              >Course untuk Fondasi Skill Abad 21</v-card-title
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <div v-if="!guest">
        <h3 class="text-center px-4 mb-6">Course saya</h3>
        <v-row v-if="loading" class="mt-6">
          <v-col v-for="i in 3" :key="i" cols="12" md="4">
            <v-skeleton-loader
              class="mx-auto"
              max-width="300"
              type="card"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-if="!loading">
          <v-col v-if="mycourses.length < 1">
            <h3 class="text-center">Belum ada course yang diikuti</h3>
          </v-col>
          <v-col
            v-for="(c, index) in mycourses"
            v-else
            :key="index"
            cols="12"
            md="4"
          >
            <v-lazy v-model="c.isActive" :options="{ threshold: 0.5 }">
              <v-card class="mx-auto" color="white" elevation="3" outlined>
                <!-- :to="'/course/skill21/' + c.courses[0].id" -->
                <v-img
                  lazy-src="/loader.svg"
                  :src="baseUrl + c.crs_thumbnail.replace('.', '_')"
                  contain
                  @load="imgLoad = !imgLoad"
                ></v-img>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      class="text-wrap text-wrap h5 mb-1"
                      v-text="c.course_name"
                    ></v-list-item-title>
                    <v-list-item-subtitle class="subtitle font-weight-bold">
                      Harga : {{ c.price == 0 ? 'Gratis' : 'Rp. ' + c.price }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions class="mb-2">
                  <nuxt-link :to="'/course/skill21/listcard/' + c.id">
                    <v-btn color="amber" class="ml-2" small rounded dark
                      >Lanjutkan belajar</v-btn
                    >
                  </nuxt-link>
                </v-card-actions>
              </v-card>
            </v-lazy>
          </v-col>
        </v-row>
      </div>
      <h3 class="text-center mb-6">List course</h3>
      <v-row v-if="loading" class="mt-6">
        <v-col v-for="i in 3" :key="i" cols="12" md="4">
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-if="!loading">
        <v-col v-for="(c, index) in classes" :key="index" cols="12" md="4">
          <v-lazy v-model="c.isActive" :options="{ threshold: 0.5 }">
            <v-card class="mx-auto" color="white" elevation="3" outlined>
              <!-- :to="'/course/skill21/' + c.courses[0].id" -->
              <v-img
                lazy-src="/loader.svg"
                :src="baseUrl + c.crs_thumbnail.replace('.', '_')"
                contain
                @load="imgLoad = !imgLoad"
              ></v-img>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    class="text-wrap text-wrap h5 mb-1"
                    v-text="c.course_name"
                  ></v-list-item-title>
                  <v-list-item-subtitle class="subtitle font-weight-bold">
                    Harga : {{ c.price == 0 ? 'Gratis' : 'Rp. ' + c.price }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions class="mb-2">
                <v-btn
                  color="green"
                  class="ml-2"
                  small
                  rounded
                  dark
                  @click="preorder(c)"
                  >Pre-Order Kelas</v-btn
                >
                <nuxt-link :to="'/course/skill21/' + c.id">
                  <v-btn color="amber" class="ml-2" small rounded dark
                    >Lihat Detail</v-btn
                  >
                </nuxt-link>
              </v-card-actions>
            </v-card>
          </v-lazy>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="show" transition="dialog-top-transition" max-width="800">
      <v-card>
        <v-toolbar class="text-center" color="white" flat
          >Pilih tipe paket</v-toolbar
        >
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col
              v-for="(s, index) in selectedCourse"
              :key="s.id"
              cols="12"
              md="6"
            >
              <v-card>
                <v-card-title>Paket {{ index + 1 }}</v-card-title>
                <v-card-title>{{ formatter.format(s.price) }}</v-card-title>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="caption"
                      >Fitur yang didapat:</v-list-item-title
                    >
                    <v-spacer></v-spacer>
                    <v-list-item-subtitle
                      v-for="j in JSON.parse(s.feature)"
                      :key="j"
                    >
                      + {{ j }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-card-actions class="text-center">
                  <v-btn
                    color="blue"
                    class="text-capitalize"
                    small
                    rounded
                    dark
                    @click="saveCourse(s)"
                    >Pilih Paket Belajar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn class="text-capitalize" text @click="show = false"
            >Tutup</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    baseUrl: 'https://sapi.the-skills.id/api/v2/storage/',
    classes: [],
    mycourses: [],
    loading: true,
    imgLoad: true,
    show: false,
    formatter: new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }),
    selectedCourse: null,
    selectedCourseId: null,
    selectedPaket: null,
    items: [
      {
        text: 'Beranda',
        disabled: false,
        href: '/',
      },
      {
        text: 'Fondasi Skill 21',
        disabled: true,
      },
    ],
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      guest: 'auth/guest',
    }),
  },
  created() {
    this.$axios.get(encodeURI('/api/v2/membership')).then((response) => {
      this.selectedCourse = response.data
    })
    if (!this.guest) {
      this.$axios
        .get('/api/v2/course/mycourse', {
          headers: {
            Authorization: `Bearer ${this.user.token.plainTextToken}`,
          },
        })
        .then((response) => {
          this.mycourses = response.data.courses
        })
    }
    this.$axios
      .get('/api/v2/course/pondasi-skill-abad-21')
      .then((response) => {
        this.classes = response.data
        this.loading = !this.loading
      })
      .catch((error) => {
        this.setAlert({
          status: true,
          text: 'Gagal memuat Data ' + error,
          type: 'error',
        })
      })
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
    }),
    preorder(id) {
      if (this.guest) {
        this.$router.push('/auth/login')
      } else {
        this.selectedCourseId = id
        this.show = !this.show
      }
    },
    saveCourse(id) {
      this.selectedPaket = id
      const confirmation = confirm(
        'Anda akan membeli course' +
          JSON.stringify(this.selectedCourseId.course_name) +
          ' dengan pilihan paket seharga' +
          JSON.stringify(this.selectedPaket.price) +
          ' ?'
      )

      if (!confirmation) {
        return
      }
      const data = new FormData()
      data.set('membership_id', this.selectedPaket.id)
      data.set('user_id', this.user.user.id)
      data.set('course_id', this.selectedCourseId.id)

      this.$axios
        .post('/api/v2/usermembership', data)
        .then((response) => {
          alert(
            response.data +
              'Anda telah pre-order, admin akan menghubungi anda melalui whatsapp sesuai dengan nomor yang telah anda daftarkan'
          )
        })
        .catch(() => {
          alert('Gagal mendaftar course ini, coba lagi atau hubungi admin')
        })
    },
  },
}
</script>
