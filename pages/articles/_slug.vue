<template>
  <v-app>
    <v-container class="mt-6">
      <h1>{{ article.title }}</h1>
      <p class="font-weight-bold">Author: {{ article.author.name }}</p>
      <p class="font-weight-bold">{{ formatDate(article.updatedAt) }}</p>
      <div class="text-center">
        <img :src="article.img" alt="" width="70%" />
      </div>
      <article class="mt-5">
        <nuxt-content :document="article" />
      </article>
    </v-container>
  </v-app>
</template>
<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600&display=swap');
.v-application {
  font-family: 'Nunito', sans-serif;
  color: #2f495e;
}
</style>
