<!-- eslint-disable vue/multi-word-component-names -->
<template>  
  <ion-page>
    <ion-content>
      <div
        class="light-grey-bg main-bg"
      >
        <swiper :modules="modules" :autoplay="true" class="margin-45">
          <swiper-slide
            v-for="(carouselImage, key) in carouselImages" :key="key"
          >
            <div class="img-container">
              <ion-img
                style="height: 230px; object-fit: cover;"
                :src="'https://admin.autoszervizmiskolc.hu/' + carouselImage.image_url"
                alt="carousel image"
              ></ion-img>
              <div
                class="carousel-title"
              >
                <p>{{ carouselImage.title }}</p>
                <div class="carousel-title-side">
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="ion-padding dark-grey-bg">
          <div
            v-for="(singleNews, key) in news" :key="key"
          >
            <div class="news">
              <div
                class="tiptap"
              >
                <span class="news-title">{{ singleNews.title }}</span>
                <span
                  v-html="singleNews.content"
                >
                </span>
              </div>
            </div>
            <div 
              v-if="key !== news.length - 1"
              class="hr"
            >
            </div>
          </div>
        </div>
      </div>
    </ion-content>
    <div
      v-if="isLoading"
      class="spinner"
    >
      <ion-spinner
        name="crescent"
      >
      </ion-spinner>
    </div>
  </ion-page>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { Autoplay } from 'swiper/modules';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import {
    IonContent,
    IonPage,
    IonSpinner,
    IonImg,
  } from '@ionic/vue';
  import axios from 'axios'
  import 'swiper/css';
  import 'swiper/css/autoplay';
  import '@ionic/vue/css/ionic-swiper.css';

  const news = ref([])
  const isLoading = ref(false)
  const carouselImages = ref([])
  const modules = ref([ Autoplay ])

  function getCarouselImages() {
    isLoading.value = true

    axios.get('https://admin.autoszervizmiskolc.hu/api/carousel-images')
      .then(response => {
        carouselImages.value = response.data.data;
      })
      .catch(error => {
        console.error('Hiba', error);
      })
      .finally(() => {
        isLoading.value = false
      });
  }

  function getNews() {
    isLoading.value = true

    axios.get('https://admin.autoszervizmiskolc.hu/api/all-news')
      .then(response => {
        news.value = response.data.data;
      })
      .catch(error => {
        console.error('Hiba', error);
      })
      .finally(() => {
        isLoading.value = false
      });
  }

  onMounted(() => {
    getCarouselImages()
    getNews()
  })
</script>

<style scoped>
</style>