<!-- LoginComponent.vue -->
<template>
  <ion-page
    class="main"
  >
    <form 
      v-if="!verified"
      @submit.prevent="verify"
    >
      <ion-label>
        <h1>Megerősítés</h1>
      </ion-label>
      <ion-item
        lines="none"
      >
        <ion-input
          v-model="verificationCode"
          label="Megerősítő kód"
          label-placement="stacked"
          type="text"
        >
        </ion-input>
      </ion-item>

      <div
          v-if="errorMsg !== ''"
          class="errorMsg"
        >
          {{ errorMsg }}
      </div>
  
      <div class="verify-btn">
        <ion-button type="submit">Megerősítés</ion-button>
      </div>
    </form>
    <div
      v-else
    >
      <ion-text>
        <h5 class="successMsg">Sikeres hitelesítés!</h5>
        <h5 class="successMsg">
          <span
            @click="goToLoginPage()"
            class="red-span"
          >
            Kattints ide
          </span>
          a bejelentkezéshez.
        </h5>
      </ion-text>
    </div>
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

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 30px;
}

ion-item, .verify-btn {
  max-width: 75%;
  margin: 0 auto 15px;
}

.ion-page {
  justify-content: center;
}
</style>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import {
    IonPage,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    IonSpinner,
  } from '@ionic/vue';
  import axios from 'axios'
  import { useRoute } from 'vue-router'
  import { useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()
  const verificationCode = ref('')
  const verified = ref(false)
  const isLoading = ref(false)
  const errorMsg = ref('')

  function goToLoginPage() {
    errorMsg.value = ''
    verificationCode.value = ''
    verified.value = false
    router.push('/login');
  }

  function verify() {
    isLoading.value = true;

    axios.get(`https://admin.autoszervizmiskolc.hu/api/email-verification/${verificationCode.value}`)
      .then(() => {
        errorMsg.value = ''
        verified.value = true;
      })
      .catch((error: any) => {
        if (error.response.status === 500) {
          errorMsg.value = 'Váratlan hiba történt. Kérjük, próbálkozz később.'
        } else {
          errorMsg.value = 'Helytelen kód!'
        }
      })
      .finally(() => {
        isLoading.value = false
      });
  }

  onMounted(() => {
    if (route.params.token !== 'notoken') {
      verificationCode.value = String(route.params.token);
      verify();
    }
  })
</script>
  