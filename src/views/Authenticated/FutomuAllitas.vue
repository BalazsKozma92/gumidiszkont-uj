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
            Futóműállítás
          </h2>
          <div class="flex items-center gap-5">
            <span class="custom-question-icon flex items-center justify-center">
              <ion-icon size="large" aria-hidden="true" slot="start" :ios="helpOutline" :md="helpOutline"></ion-icon>
            </span>Túl hamar kopik az abroncsod?
          </div>
          <br>
          <div class="flex items-center gap-5">
            <span class="custom-question-icon flex items-center justify-center">
              <ion-icon size="large" aria-hidden="true" slot="start" :ios="helpOutline" :md="helpOutline"></ion-icon>
            </span>Valamelyik irányba húz az autód?
          </div>
          <br>
          <div class="flex items-center gap-5">
            <span class="custom-question-icon flex items-center justify-center">
              <ion-icon size="large" aria-hidden="true" slot="start" :ios="helpOutline" :md="helpOutline"></ion-icon>
            </span>Vagy nagyobb kátyún haladtál át?
          </div>
          <br>
          <div>
            Akkor mindenképp érdemes egy futómű állítást végeztetni. Szervizünkben a legmodernebb Hunter típusú futómű állító géppel dolgozunk, amellyel a legújabb személy és kishaszonjárművek futóművét is gond nélkül beállítjuk a gyári értékekre.
          </div>
          <br>
          <div>
            Munkatársaink az alábbi telefonszámokon várják hívásod:
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
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
  import {
    IonContent,
    IonPage,
    IonIcon,
  } from '@ionic/vue';
  import {
  helpOutline,
} from 'ionicons/icons';
</script>

<style scoped>
</style>
