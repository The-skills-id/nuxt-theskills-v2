<template>
  <v-app>
    <v-container>
      <div class="d-flex justify-start align-center">
        <v-avatar size="40">
          <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
        </v-avatar>
        <p class="mt-3 ml-2 caption">Takiya Genij</p>
      </div>
      <p class="mt-2 caption" v-text="article.created_at"></p>
      <h1 v-text="article.article_title"></h1>
      <div class="pa-4">
        <v-chip-group active-class="primary--text" column>
          <v-chip small> Merdeka Belajar </v-chip>
          <v-chip small>Teknologi</v-chip>
        </v-chip-group>
      </div>
      <div
        class="ma-auto d-flex justify-center align-center"
        style="width: 70%"
      >
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://picsum.photos/id/11/500/300"
        ></v-img>
      </div>
      <div class="mt-10">
        <div class="article-content">
          <div v-html="'&emsp;' + article.content"></div>
        </div>
      </div>
      <v-divider class="mt-10"></v-divider>
      <div class="mt-10">
        <h2>Artikel Terkait</h2>
        <v-row>
          <v-col cols="12" md="3">
            <v-card class="mx-auto" max-width="344">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                height="200px"
              ></v-img>
              <v-card-title> Top western road trips </v-card-title>
              <v-card-subtitle
                ><v-icon>clock-time-five-outline</v-icon> 10/mei/2021 |
                <v-icon>account-circle</v-icon> Admin</v-card-subtitle
              >
              <v-card-text class="caption"
                >Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Facere animi aliquid optio molestias tempore id minus eaque
                provident fuga ea maxime distinctio totam iste consequatur in
                repudiandae assumenda, autem inventore!....</v-card-text
              >
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    article: [],
    items: [
      {
        text: 'Artikel',
        disabled: false,
        href: '/articles',
      },
      {
        text: 'Tes',
        disabled: true,
      },
    ],
  }),
  created() {
    const id = this.$route.params.id
    const uri = encodeURI('/api/v2/article/' + id)
    this.$axios
      .get(uri)
      .then((response) => {
        this.article = response.data.data[0]
      })
      .catch(() => {
        console.log('p')
      })
  },
}
</script>

<style>
div.article-content::first-letter {
  font-size: 70px;
  text-align: justify;
}
</style>
