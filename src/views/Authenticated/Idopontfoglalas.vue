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
            Időpontfoglalás
          </h2>
          <div>
            Gumiszervizünkben nincs időpont foglalás!
          </div>
          <br>
          <div>
            Érkezési sorrendben szereljük, javítjuk az abroncsokat.
          </div>
          <br>
          <div class="flex items-center gap-5 open-wrap">
            <ion-icon class="open-icon" aria-hidden="true" slot="start" :ios="timeOutline" :md="timeOutline"></ion-icon>
            <div>
              Nyitvatartás: H-P : <span class="time-span">8:00-17:00</span> Szombaton: <span class="time-span">8:00-13:00</span>
            </div>
          </div>
          <br>
          <div class="text-center">
            Autószervizünkbe az alábbi telefonszámon tudsz időpontot foglalni:
          </div>
        </div>
        <div
          class="flex flex-col justify-center items-center"
        >
          <div class="phone">
            <a href="tel:+36308214997">+36/30 821-4997</a>
          </div>
          <div class="subtitle">
            ( Hétköznaponként 8:00 - 17:00 között )
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
  timeOutline,
} from 'ionicons/icons';
</script>

<style scoped>
</style>
  