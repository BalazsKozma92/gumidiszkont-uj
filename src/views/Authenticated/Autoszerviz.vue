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
            Autószerviz
          </h2>
          <div>
            Márkafüggetlen autószervizünkben nem kell heteket várnod a javításra, ugyanis a kisebb munkákat a legtöbb esetben azonnal elvégezzük!
          </div>
          <br>
          <div>
            Olajcsere, fékek cseréje, futóműállítás stb... A nagyobb javításokat előzetes egyeztetés alapján végezzük.
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
            Keresd szervizvezetőnket, Krisztiánt az alábbi telefonszámon:
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
  } from '@ionic/vue';
</script>

<style scoped>
</style>
