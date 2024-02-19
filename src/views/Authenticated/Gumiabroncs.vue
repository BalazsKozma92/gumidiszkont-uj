<!-- eslint-disable vue/multi-word-component-names -->
<template>  
  <ion-page>
    <ion-content>
      <div
        class="light-grey-bg margin-45 page-content-wrapper"
      >
        <div
          class="page-content"
        >
          <h2
            class="title"
          >
            Gumiabroncs értékesítés
          </h2>
          <div>
            Büszkén mondhatjuk, hogy a régió egyik legnagyobb autógumi raktárkészletével rendelkezünk, az olcsó (low budget) árkategóriától, egészen a prémium abroncsokig mindent megtalálsz.
          </div>
          <br>
          <div>
            A legkeresettebb méreteket, polcról azonnal tudjuk biztosítani.
          </div>
          <br>
          <div>
            Hetente más és más akciós abronccsal várunk a
          </div>
          <br>
          <div class="text-red text-center">
            GUMIDISZKONTBAN!
          </div>
          <br>
          <div>
            Tanácstalan vagy, hogy melyik abroncsot válaszd?
          </div>
          <div>
            Hívj minket vagy látogass el hozzánk és segítünk!
          </div>
        </div>
        <div
          class="flex flex-col justify-center items-center"
        >
          <div class="phone">
            <a href="tel:+36304537170">+36/30 453-7170</a>
          </div>
          <div class="phone">
            <a href="tel:+3646413756">+36/46 413-756</a>
          </div>
        </div>
        <br>
        <br>
        <div class="font-bold text-center text-red" style="font-size: larger;">
          Kiárusított abroncsaink
        </div>
        <br>
        <div v-if="tyres.length < 1" class="text-center font-bold">
          Jelenleg nincsenek Kiárusított abroncsaink, nézz vissza később!
        </div>
        <div v-else>
          <div class="single-rim-tyre" v-for="tyre in tyres" :key="tyre.id">
            <ion-img
              class="rim-tyre-image"
              :src="'https://admin.autoszervizmiskolc.hu/' + tyre.image_url"
              alt="carousel image"
            ></ion-img>
            <br>
            <div class="tyre-rim-title">
              {{ tyre.title }}
            </div>
            <br>
            <div class="rim-tyre-value">
              <div class="font-bold">Bruttó ár/darab:</div> <div class="tyreRimValue">{{ tyre.value }} Ft</div>
            </div>
            <div class="rim-tyre-value">
              <div class="font-bold">Elérhető mennyiség:</div> <div class="tyreRimValue">{{ tyre.quantity }} db</div>
            </div>
            <br>
            <div v-if="tyre.description !== 'null'" class="tyre-description">
              {{ tyre.description }}
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
  import {
    IonContent,
    IonPage,
    IonImg,
    IonSpinner,
  } from '@ionic/vue';
  import axios from 'axios'

  const tyres = ref([])
  const isLoading = ref(false)

  function fetchTyres() {
    isLoading.value = true

    axios.get('https://admin.autoszervizmiskolc.hu/api/tyre-rims/tyres')
      .then(response => {
        tyres.value = response.data.data;
      })
      .catch(error => {
        console.error('Error fetching tyres', error);
      })
      .finally(() => {
        isLoading.value = false
      });
  }

  onMounted(() => {
    fetchTyres()
  })
</script>

<style scoped>
</style>