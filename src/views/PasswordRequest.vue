<!-- LoginComponent.vue -->
<template>
  <ion-page
    class="main"
  >
    <form
      v-if="!linkSent"
      @submit.prevent="sendLink"
    >
      <ion-label>
        <h1>Jelszóemlékeztető</h1>
      </ion-label>
      <ion-item
        lines="none"
      >
        <ion-input
          v-model="email"
          label="Add meg az email címed"
          label-placement="stacked"
          type="email"
        >
        </ion-input>
      </ion-item>

      <div
          v-if="errorMsg !== ''"
          class="errorMsg"
        >
          {{ errorMsg }}
      </div>
  
      <div class="flex flex-middle">
        <div class="verify-btn">
          <ion-button color="medium" @click="goToLoginPage()">Vissza</ion-button>
        </div>
        <div class="verify-btn">
          <ion-button type="submit">Küldés</ion-button>
        </div>
      </div>
    </form>
    <div
      v-else
    >
      <ion-label>
        <h1 class="successMsg p-2">{{ successMsg }}</h1>
      </ion-label>
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

.p-2 {
  padding: 5px;
}

ion-item {
  max-width: 75%;
  margin: 0 auto 15px;
}
.verify-btn {
  width: 50%;
}

.verify-btn ion-button {
  width: 100%;
}

.ion-page {
  justify-content: center;
}
</style>

<script setup lang="ts">
  import { ref } from 'vue'
  import {
    IonPage,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    IonSpinner,
  } from '@ionic/vue';
  import axios from 'axios'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const email = ref('')
  const isLoading = ref(false)
  const errorMsg = ref('')
  const linkSent = ref(false)
  const successMsg = ref('')

  function goToLoginPage() {
    errorMsg.value = ''
    router.push('/login');
  }

  function sendLink() {
    isLoading.value = true;

    axios.post(`https://admin.autoszervizmiskolc.hu/api/password-request`, {
        email: email.value
      })
      .then((response : any) => {
        errorMsg.value = ''
        linkSent.value = true
        successMsg.value = response.data.message
      })
      .catch((error: any) => {
        if (error.response.status === 500) {
          errorMsg.value = 'Váratlan hiba történt. Kérjük, próbálkozz később.'
        } else if (error.response.status === 409) {
          console.log(error)
          errorMsg.value = error.response.data.message
        } else {
          errorMsg.value = 'Helytelen email cím!'
        }
      })
      .finally(() => {
        isLoading.value = false
      });
  }
</script>
  