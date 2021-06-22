<template>
  <v-container pa-0 ma-0 fluid>
    <div class="mt-6 login-page">
      <v-card class="mx-auto" max-width="500" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div
              :class="
                $vuetify.breakpoint.mdAndUp
                  ? 'primary--text text-h6 mb-4'
                  : 'primary--text text-h6 mb-4 text-center'
              "
            >
              Daftar Akun
            </div>
            <nuxt-link
              to="/auth/login"
              class="font-weight-light text-subtitle-2 blue-lighten-4--text text-decoration-underline"
              >Sudah punya akun ?</nuxt-link
            >
            <v-divider inset></v-divider>
          </v-list-item-content>
        </v-list-item>
        <v-form ref="form">
          <v-row class="ml-6" no-gutters>
            <v-col cols="12" md="8">
              <p class="text-subtitle-2">Nama Anak</p>
              <v-text-field
                ref="child_name"
                v-model="child_name"
                :rules="[(v) => !!v || 'Nama harus diisi']"
                placeholder="Nama Lengkap"
                flat
                outlined
                @keyup.enter="register"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <p class="text-subtitle-2">Nama Orangtua</p>
              <v-text-field
                ref="name"
                v-model="name"
                :rules="[(v) => !!v || 'Nama harus diisi']"
                placeholder="Nama Lengkap"
                flat
                outlined
                @keyup.enter="register"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <p class="text-subtitle-2">Username</p>
              <v-text-field
                v-model="username"
                :rules="[(v) => !!v || 'username harus diisi']"
                placeholder="Username (Digunakan untuk login)"
                flat
                outlined
                @keyup.enter="register"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <p class="text-subtitle-2">Alamat Email</p>
              <v-text-field
                v-model="email"
                :rules="[
                  (v) => !!v || 'alamat email harus diisi',
                  (v) => /.+@.+\..+/.test(v) || 'E-mail tidak valid',
                ]"
                placeholder="Email"
                flat
                outlined
                @keyup.enter="register"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <p class="text-subtitle-2">Umur</p>
              <v-text-field
                v-model="age"
                :rules="[(v) => !!v || 'umur harus diisi']"
                placeholder="Umur"
                flat
                outlined
                @keyup.enter="register"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <p class="text-subtitle-2">Kelas</p>
              <v-text-field
                v-model="grade"
                :rules="[(v) => !!v || 'kelas harus diisi']"
                placeholder="Kelas"
                flat
                outlined
                @keyup.enter="register"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <p class="text-subtitle-2">Sekolah Asal</p>
              <v-text-field
                v-model="school"
                :rules="[(v) => !!v || 'sekolah harus diisi']"
                placeholder="Sekolah asal"
                flat
                outlined
                @keyup.enter="register"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <p class="text-subtitle-2">Nomor Whatsapp</p>
              <v-text-field
                v-model="phone_number"
                :rules="[(v) => !!v || 'nomor WA harus diisi']"
                placeholder="Nomor Whatsapp"
                flat
                outlined
                @keyup.enter="register"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <p class="text-subtitle-2">Password</p>
              <v-text-field
                v-model="password"
                :rules="[(v) => !!v || 'password harus diisi']"
                type="password"
                placeholder="Password"
                flat
                outlined
                @keyup.enter="register"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <p class="text-subtitle-2">Konfirmasi Password</p>
              <v-text-field
                v-model="password_confirm"
                :rules="[
                  (v) => !!v || 'konfirmasi harus diisi',
                  (v) => v === password || 'Password tidak cocok',
                ]"
                type="password"
                placeholder="Konfirmasi Password"
                flat
                outlined
                @keyup.enter="register"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions>
          <v-btn
            class="btn"
            color="primary"
            large
            block
            :loading="loading"
            @click="register"
            >Daftar</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    loading: false,
    name: '',
    email: '',
    password: '',
    password_confirm: '',
    username: '',
    age: '',
    phone_number: '',
    child_name: '',
    school: '',
    grade: '',
  }),
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
    }),
    register() {
      this.$refs.form.validate()
      // eslint-disable-next-line no-undef
      this.loading = !this.loading
      const data = new FormData()
      data.set('name', this.name)
      data.set('email', this.email)
      data.set('password', this.password)
      data.set('username', this.username)
      data.set('age', this.age)
      data.set('phone_number', this.phone_number)
      data.set('child_name', this.child_name)
      data.set('school', this.school)
      data.set('grade', this.grade)
      this.$axios
        .post('/api/v2/register', data)
        .then(() => {
          this.$refs.form.reset()
          this.loading = !this.loading
          window.scrollTo(0, 0)
          this.setAlert({
            status: true,
            text: 'berhasil daftar, silahkan login',
            type: 'success',
          })
        })
        .catch((error) => {
          if (
            error.response.data.email[0] === 'The email has already been taken.'
          ) {
            this.setAlert({
              status: true,
              text: 'Email Sudah Terdaftar',
              type: 'error',
            })
          } else {
            this.setAlert({
              status: true,
              text: 'gagal daftar, hubungi admin atau coba lagi ',
              type: 'error',
            })
          }
          this.loading = !this.loading
        })
    },
  },
}
</script>

<style>
.login-page {
  background-color: snow;
  width: 100%;
  height: 100vh;
}
.btn {
  text-transform: unset !important;
}
</style>
