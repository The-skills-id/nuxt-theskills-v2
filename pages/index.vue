<template>
  <div>
    <v-container ma-0 pa-0 fluid fill-height>
      <div v-if="$vuetify.breakpoint.mdAndUp" class="hero-image">
        <v-row align="center" justify="center">
          <v-col class="ml-4 text-center">
            <div
              class="font-weight-bold white--text text-md-h2"
              v-text="'THE SKILLS'"
            ></div>
            <div
              class="font-weight-bold yellow--text text-md-h6"
              v-text="'Akselerasi adaptasi pendidikan untuk indonesia maju'"
            ></div>
            <nuxt-link to="/auth/register">
              <v-btn
                class="font-weight-bold mt-2"
                color="amber darken-1"
                dark
                rounded
              >
                Daftar Gratis
              </v-btn>
            </nuxt-link>
          </v-col>
          <v-col class="mt-6">
            <v-img
              max-width="500px"
              class="mt-6"
              src="/triple/ch.png"
              contain
            ></v-img>
          </v-col>
        </v-row>
      </div>
      <div v-if="$vuetify.breakpoint.smAndDown" class="hero-image-mobile">
        <v-row class="hero-mobile-items" align="center" justify="center">
          <v-col class="text-center">
            <div
              class="font-weight-bold white--text text-h2"
              v-text="'THE SKILLS'"
            ></div>
            <div
              class="font-weight-bold yellow--text text-h6"
              v-text="'Akselerasi adaptasi pendidikan untuk indonesia maju'"
            ></div>
            <v-btn
              to="/auth/register"
              class="font-weight-bold mt-2"
              color="amber darken-1"
              dark
              rounded
              v-text="'Daftar Gratis'"
            ></v-btn>
          </v-col>
          <v-col>
            <v-col class="mt-6">
              <v-img width="500px" class="mt-6" src="/triple/ch.png"></v-img>
            </v-col>
          </v-col>
        </v-row>
      </div>
      <div :class="$vuetify.breakpoint.mdAndUp ? 'fly-card' : ''">
        <v-row class="align-self-center fly-card-items text-center ml-6 mt-3">
          <v-col v-for="(i, index) in triple" :key="index" cols="12" md="4">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 9 : 2"
                :to="i.link"
                class="ml-6 pa-4 mx-auto"
                max-width="250px"
                height="330px"
                raised
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-img
                      max-width="200px"
                      class="triple-img"
                      :src="i.img"
                    ></v-img>
                    <v-list-item-title
                      class="headline mb-1 text-wrap"
                      v-text="i.title"
                    >
                    </v-list-item-title>
                    <v-list-item-subtitle v-text="i.subtitle">
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </div>
      <div class="image-slider image-slider-mobile">
        <div
          class="text-center font-weight-bold text-h4"
          v-text="'Dokumentasi Kegiatan'"
        ></div>
        <!--   <VueSlickCarousel
          class="mt-6"
          :autoplay="true"
          :autoplay-speed="2000"
          :slides-to-show="$vuetify.breakpoint.mdAndUp ? 4 : 1"
          :infinite="true"
        > -->
        <Carousel
          class="mt-6"
          :items="$vuetify.breakpoint.mdAndUp ? 4 : 4"
          :loop="true"
          :autoplay="true"
          :margin="20"
        >
          <v-img
            v-for="i in gallery"
            :key="i"
            max-width="500px"
            class="mt-6 carousel-item"
            :src="'/gallery/' + i"
          >
          </v-img>
        </Carousel>
        <!--  </VueSlickCarousel> -->
      </div>

      <v-footer width="100%" dark padless>
        <v-card class="flex" flat tile>
          <v-card-title class="primary">
            <v-row>
              <v-col cols="12" md="8">
                <img src="/favicon.ico" alt="" />
                <v-spacer></v-spacer>
                The-Skills.id
                <v-spacer></v-spacer>
                <div class="caption">
                  Ruko perum pesona regency No.10
                  <v-spacer></v-spacer>
                  Patrang, Kabupaten Jember
                </div>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" md="4">
                <div>Kontak Kami</div>
                <v-spacer></v-spacer>
                <v-btn
                  v-for="(contact, index) in contacts"
                  :key="index"
                  :href="contact.href"
                  target="_blank"
                  class="mx-4"
                  dark
                  icon
                >
                  <v-icon size="24px">
                    {{ contact.icon }}
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-text class="py-2 white--text text-center">
            {{ new Date().getFullYear() }} — <strong>TheSkills</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-container>
  </div>
</template>

<script>
require('vue-slick-carousel/dist/vue-slick-carousel.css')
// import carousel from 'v-owl-carousel'
export default {
  data: () => ({
    triple: [
      {
        img: '/triple/1.png',
        title: 'Komunitas Orangtua',
        subtitle: 'Sadar Fondasi Berinovasi',
        link: '/course/orangtua',
      },
      {
        img: '/triple/3.png',
        title: 'Fondasi Pokok',
        subtitle: 'Numerasi, Literasi dan Karakter',
        link: '/course/fondasipokok',
      },
      {
        img: '/triple/2.png',
        title: 'Fondasi Skill Abad 21',
        subtitle: 'Computational thinking, Unplugged Coding, dll',
        link: '/course/skill21',
      },
    ],
    contacts: [
      {
        icon: 'mdi-email',
        href: 'mailto:admin@the-skills.id',
      },
      {
        icon: 'mdi-youtube',
        href: 'https://www.youtube.com/channel/UCE46WrDK6LPQMIzSdipGRGQ',
      },
      {
        icon: 'mdi-whatsapp',
        href: 'https://wa.me/+6282245820849',
      },
      {
        icon: 'mdi-instagram',
        href: 'https://instagram.com/komunitas_sadarfb',
      },
    ],
    gallery: [
      '0.jpg',
      '1.jfif',
      '2.jpg',
      '3.jfif',
      '4.jfif',
      '5.jfif',
      '6.jfif',
      '7.jfif',
      '8.jfif',
      'matifix.jpg',
      'as.jpeg',
      'sd.jpeg',
    ],
  }),
}
</script>

<style>
.fly-card {
  position: absolute;
  top: 550px;
  left: 180px;
}

.hero-image {
  background-color: #3da5d3;
  width: 1920px;
  height: 720px;
}

.hero-image-mobile {
  background-color: #3da5d3;
  width: 100vw;
  height: 100vh;
}

.hero-mobile-items {
  margin-top: 100px;
}

.image-slider {
  background-color: white;
  width: 100vw;
  height: 100vh;
  margin-top: 200px;
}

@media only screen and (max-width: 600px) {
  .hero-image {
    background-color: #3da5d3;
    width: 100vw !important;
    height: 100vh !important;
  }

  .image-slider-mobile {
    margin-top: 100px;
  }
}
</style>
