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
              Reset Password
            </div>

            <v-divider inset></v-divider>
          </v-list-item-content>
        </v-list-item>
        <v-form ref="form">
          <v-row class="ml-6" align="center" justify="center" no-gutters>
            <v-col cols="12" md="8">
              <span class="text-subtitle-2">Email</span>
              <v-text-field
                v-model="credential"
                :rules="[(v) => !!v || 'Credential harus diisi']"
                placeholder="Email"
                flat
                outlined
                @keyup.enter="resetpw"
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
            @click="resetpw"
            >Reset Password</v-btn
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
    credential: '',
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
    resetpw() {
      this.loading = true
      const validate = this.$refs.form.validate()
      if (!validate) {
        return
      }

      // eslint-disable-next-line no-undef
      const data = new FormData()
      data.set('credential', this.credential)

      this.$axios
        .post('/api/v2/reset-password', data)
        .then((response) => {
          this.$swal({
            text: response.data.message,
            icon: response.data.status,
          })
          this.loading = !this.loading
        })
        .catch(() => {
          this.setAlert({
            status: true,
            text: 'Ada yang bermasalah nih, coba lagi yaa..',
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
