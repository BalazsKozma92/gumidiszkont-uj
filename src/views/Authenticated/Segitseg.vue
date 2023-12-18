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
            Segítség
          </h2>
          <div>
            Kérdésed van? Keress minket bátran!
          </div>
          <div
            class="flex flex-col justify-center items-center"
          >
            <div class="phone-name text-center">Gumiszerviz:(Zoli)</div>
            <div class="phone-help">
              <a href="tel:+36308214997">+36/30 821-4997</a>
            </div>
            <div class="phone-name text-center">Autószerviz: (Krisztián)</div>
            <div class="phone-help">
              <a href="tel:+36308214997">+36/30 821-4997</a>
            </div>
            <div class="phone-name text-center">Üzlet: (Ricsi, Balázs, István)</div>
            <div class="phone-help">
              <a href="tel:+36304537170">+36/30 453-7170</a>
            </div>
            <br>
            <div class="phone-help">
              <a href="tel:+3646413756">+36/46 413-756</a>
            </div>
          </div>
          <div class="margin-45">
            Üzennél nekünk? Írd meg kérdésed, észrevételed.
          </div>
          <br>
          <form @submit.prevent="sendEmail">
            <ion-list>
              <ion-item
                lines="none"
              >
                <ion-input
                  required
                  v-model="name"
                  label="Név"
                  label-placement="stacked"
                  type="text"
                >
                </ion-input>
              </ion-item>
              <br>
              <ion-item
                lines="none"
              >
                <ion-input
                  required
                  v-model="email"
                  label="Email cím"
                  label-placement="stacked"
                  type="email"
                >
                </ion-input>
              </ion-item>
              <br>
              <ion-item
                lines="none"
              >
                <ion-textarea
                  required
                  v-model="contactMessage"
                  label="Üzenet"
                  label-placement="stacked"
                  type="text"
                >
                </ion-textarea>
             </ion-item>
            </ion-list>
            <ion-button expand="block" type="submit">Küldés</ion-button>
          </form>
        </div>
      </div>
    </ion-content>
    <ion-toast
      :is-open="isOpen"
      :duration="2000"
      position="middle"
      :message="customMessage"
      :class="customClass"
      @didDismiss="onDismiss(false)"
    ></ion-toast>
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
  import { ref } from 'vue'
  import {
    IonSpinner,
    IonContent,
    IonList,
    IonPage,
    IonInput,
    IonItem,
    IonTextarea,
    IonButton,
    IonToast,
  } from '@ionic/vue';
  import axios from 'axios'

  const name = ref('')
  const email = ref('')
  const contactMessage = ref('')
  const isLoading = ref(false)
  const isOpen = ref(false)
  const customMessage = ref('')
  const customClass = ref('')

  function onDismiss(state) {
    isOpen.value = state
    customClass.value = ''
    customMessage.value = ''
  }

  function sendEmail() {
    isLoading.value = true

    axios.post(`https://admin.autoszervizmiskolc.hu/api/send-email`, {
        name: name.value,
        email: email.value,
        contactMessage: contactMessage.value
      })
      .then(() => {
        onDismiss(true)
        customClass.value = 'success-toast'
        customMessage.value = 'Az üzenetet elküldtük!'
      })
      .catch(() => {
        onDismiss(true)
        customClass.value = 'error-toast'
        customMessage.value = 'Valami hiba történt.'
      })
      .finally(() => {
        isLoading.value = false
        name.value = ''
        email.value = ''
        contactMessage.value = ''
      });
  }
</script>

<style scoped>
</style>