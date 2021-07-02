<template>
  <v-app>
    <v-container>
      <div class="d-flex justify-start align-center">
        <v-avatar size="40">
          <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
        </v-avatar>
        <p class="mt-3 ml-2 caption">Takiya Genij</p>
      </div>
      <p class="mt-2 caption">Sabtu, 12 Mei 2021</p>
      <h1>Judul Artikel</h1>
      <div class="pa-4">
        <v-chip-group active-class="primary--text" column>
          <v-chip small> Merdeka Belajar </v-chip>
          <v-chip small>Teknologi</v-chip>
        </v-chip-group>
      </div>
      <div class="d-flex justify-center align-center">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          src="https://picsum.photos/id/11/500/300"
        ></v-img>
      </div>
      <div class="mt-10">
        <div class="article-content">
          &emsp;Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Deserunt eveniet quas porro, quisquam quibusdam eaque, totam itaque
          ullam repellat, magni neque soluta deleniti ex mollitia vero tenetur
          excepturi cum modi. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Cupiditate labore quibusdam reiciendis nisi
          praesentium maiores! Cum fuga temporibus praesentium. Cum velit quasi
          ex repudiandae consequuntur veritatis sed nesciunt suscipit quos?
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam
          corporis fugiat maxime, neque quam iure, saepe quas iusto minima eum
          voluptatum perspiciatis labore id dolores quod, earum hic nulla error!
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore
          culpa, quis quae laboriosam reprehenderit tempore odit vitae
          voluptatem illo cum consectetur aliquid totam ipsa deserunt animi!
          Neque placeat aliquam harum?
        </div>
      </div>
      <v-divider class="mt-10"></v-divider>
      <div class="mt-10">
        <h2>Artikel Terkait</h2>
      </div>
    </v-container>
  </v-app>
</template>

<style>
div.article-content::first-letter {
  font-size: 70px;
  text-align: justify;
}
</style>

<script>
export default {
  data: () => ({
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
}
</script>
