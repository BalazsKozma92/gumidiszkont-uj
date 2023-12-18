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
            A régió egyik legnagyobb autógumi raktárkészletével rendelkezünk, az olcsó (low budget) abroncsoktól a prémium abroncsokig mindent megtalálsz nálunk!
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
  } from '@ionic/vue';
</script>

<style scoped>
</style>