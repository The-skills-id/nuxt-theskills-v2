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
              Buat password barumu
            </div>

            <v-divider inset></v-divider>
          </v-list-item-content>
        </v-list-item>
        <v-form ref="form">
          <v-row class="ml-6" align="center" justify="center" no-gutters>
            <v-col cols="12" md="8">
              <span class="text-subtitle-2">Email</span>
              <v-text-field
                v-model="email"
                :rules="[
                  (v) => !!v || 'Email harus diisi',
                  (v) => /.+@.+\..+/.test(v) || 'E-mail tidak valid',
                ]"
                placeholder="Email"
                flat
                outlined
                @keyup.enter="reset"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <span class="text-subtitle-2">Password Baru</span>
              <v-text-field
                v-model="password"
                :rules="[(v) => !!v || 'password harus diisi']"
                type="password"
                placeholder="Password"
                flat
                outlined
                @keyup.enter="reset"
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
            @click="reset"
            >Simpan</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    loading: false,
    email: '',
    password: '',
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      guest: 'auth/guest',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    reset() {
      this.loading = true

      const token = this.$route.params.token
      const validate = this.$refs.form.validate()

      if (!validate) {
        return
      }

      // eslint-disable-next-line no-undef
      const data = new FormData()
      data.set('token', token)
      data.set('email', this.email)
      data.set('password', this.password)
      // eslint-disable-next-line no-undef
      const uri = encodeURI('/api/v2/reset-password/' + token)
      this.$axios
        .post(uri, data)
        .then((response) => {
          this.setAlert({
            status: true,
            text: 'Password berhasil diubah',
            type: 'success',
          })
          this.loading = !this.loading
          this.$router.push('/auth/login')
        })
        .catch(() => {
          this.setAlert({
            status: true,
            text: 'Password gagal diubah',
            type: 'warning',
          })
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
