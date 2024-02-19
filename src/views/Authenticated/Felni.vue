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
            Felni értékesítés
          </h2>
          <div>
            Mi a te stílusod? Öt küllős, hét küllős, tíz küllős? Ezüst, vagy fekete? Króm? esetleg színes? Gyere el hozzánk és válaszd ki az autódhoz illő felnit. Boltunkban akár polcról, azonnal tudsz felnit választani. Kollégánk egy program segítségével, virtuálisan meg tudja mutatni, hogy a kiválasztott felni hogyan mutat az autódon.
          </div>
          <br>
          <div>
            Vagy kattints az alábbi linkre, ahol kedvedre tudsz válogatni az autódra legjobban illő felnik között.
          </div>
          <br>
          <div>
            Cégünk 2018 óta hivatalos <span class="font-bold text-">OZ</span> márkaképviselet, tehát a legmenőbb felniket nálunk találod!
          </div>
          <br>
          <div>
            <a href="https://felnitrader.hu/bartlux" class="text-red">https://felnitrader.hu/bartlux</a>
          </div>
          <br>
          <div class="question-wrapper">
            <div class="first">
            </div>
            <div class="second">
            </div>
            <div class="third">
            </div>
            <div class="text">
              Kérdésed van?
            </div>
          </div>
          <div class="text-center">
            Hívj minket!
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
          Kiárusított felnijeink
        </div>
        <br>
        <div v-if="rims.length < 1" class="text-center font-bold">
          Jelenleg nincsenek Kiárusított felnijeink, nézz vissza később!
        </div>
        <div v-else>
          <div class="single-rim-tyre" v-for="rim in rims" :key="rim.id">
            <ion-img
              class="rim-tyre-image"
              :src="'https://admin.autoszervizmiskolc.hu/' + rim.image_url"
              alt="carousel image"
            ></ion-img>
            <br>
            <div class="tyre-rim-title">
              {{ rim.title }}
            </div>
            <br>
            <div class="rim-tyre-value">
              <div class="font-bold">Bruttó ár/darab:</div> <div class="tyreRimValue">{{ rim.value }} Ft</div>
            </div>
            <div class="rim-tyre-value">
              <div class="font-bold">Elérhető mennyiség:</div> <div class="tyreRimValue">{{ rim.quantity }} db</div>
            </div>
            <br>
            <div v-if="rim.description !== 'null'" class="tyre-description">
              {{ rim.description }}
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

  const rims = ref([])
  const isLoading = ref(false)

  function fetchRims() {
    isLoading.value = true

    axios.get('https://admin.autoszervizmiskolc.hu/api/tyre-rims/rims')
      .then(response => {
        rims.value = response.data.data;
      })
      .catch(error => {
        console.error('Error fetching rims', error);
      })
      .finally(() => {
        isLoading.value = false
      });
  }

  onMounted(() => {
    fetchRims()
  })
</script>

<style scoped>
.single-rim {
  text-align: center;
  width: 90%;
  margin: auto;
  padding: 25px;
  background-color: rgba(255, 255, 255, .05);
  border-radius: 10px;
  margin-bottom: 10px;
}

.rim-image {
  height: 180px;
  object-fit: cover;
}
</style>