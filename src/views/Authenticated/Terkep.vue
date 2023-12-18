<!-- eslint-disable vue/multi-word-component-names -->
<template>  
 <ion-page>
    <ion-content>
      <div
        class="light-grey-bg margin-45 main-bg"
      >
        <div
          class="page-content"
        >
          <h2
            class="title"
          >
            Térkép
          </h2>
          <iframe width="100%" height="350" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJha1wb_hfP0cRwRMnkCvsFk0&amp;key=AIzaSyCr8kX0qtST_QYNPLFsN066-LHUpaQORQU" allowfullscreen=""></iframe>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
  import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  } from '@ionic/vue';
</script>

<style scoped>
</style>