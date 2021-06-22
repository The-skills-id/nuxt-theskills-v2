<template>
  <div>
    <v-snackbar v-model="alert" :color="type" top>
      {{ text }}
      <v-btn dark text @click="close" v-text="'Tutup'"></v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CAlert',
  computed: {
    ...mapGetters({
      status: 'alert/status',
      text: 'alert/text',
      type: 'alert/type',
    }),

    alert: {
      get() {
        return this.status
      },
      set(value) {
        this.setAlert({
          status: value,
          text: 'test',
          type: 'error',
        })
      },
    },
  },

  methods: {
    ...mapActions({
      setAlert: 'alert/set',
    }),
    close() {
      this.setAlert({
        status: false,
      })
    },
  },
}
</script>
