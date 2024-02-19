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
            Gumiszerviz
          </h2>
          <div>
            Nálunk nincs időpont foglalás, érkezési sorrendben dolgozunk!
          </div>
          <br>
          <div>
            4 szervizálláson tapasztalt kollégáink a legkorszerűbb gépekkel javítják, szerelik az abroncsokat, így biztos lehetsz abban, hogy autód a legjobb kezekben van!
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
  } from '@ionic/vue';
</script>

<style scoped>
</style>