<template>
  <v-dialog>
    <v-card v-model="show">
      <v-card-title>Konfirmasi</v-card-title>
      <v-card-actions class="justify-end">
        <v-btn class="text-capitalize" text @click="show = false">Tutup</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
