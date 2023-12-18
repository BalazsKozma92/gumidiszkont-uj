<!-- LoginComponent.vue -->
<template>
  <ion-page
    class="main"
  >
    <form
      v-if="!passwordChanged"
      @submit.prevent="resetPassword"
    >
      <ion-label>
        <h1>Jelszó megváltoztatása</h1>
      </ion-label>
      <ion-item
        lines="none"
      >
        <ion-input
          v-model="newPassword"
          label="Jelszó"
          label-placement="stacked"
          type="password"
        >
        </ion-input>
      </ion-item>
      <ion-item
        lines="none"
      >
        <ion-input
          v-model="newPasswordConfirmation"
          label="Jelszó megerősítése"
          label-placement="stacked"
          type="password"
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
        <ion-button type="submit">Küldés</ion-button>
      </div>
    </form>
    <div
      v-else
    >
      <p class="successMsg">
        Sikeres jelszóváltoztatás!
      </p>
      <div class="verify-btn text-center">
        <ion-button @click="goToLoginPage()">Bejelentkezés</ion-button>
      </div>
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

.success {
  background-color: #63a747;
  padding: 10px;
  color: white;
  border-radius: 15px;
  max-width: 75%;
  margin: auto;
  text-align: center;
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
  import { ref, onMounted } from 'vue'
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
  const newPassword = ref('')
  const newPasswordConfirmation = ref('')
  const isLoading = ref(false)
  const token = ref('')
  const passwordChanged = ref(false)
  const errorMsg = ref('')

  function goToLoginPage() {
    errorMsg.value = '';
    router.push('/login');
  }

  function resetPassword() {
    if (newPassword.value === newPasswordConfirmation.value) {
      isLoading.value = true;
  
      axios.post(`https://admin.autoszervizmiskolc.hu/api/reset-password/${token.value}`, 
        {
          password: newPassword.value,
          confirmPassword: newPasswordConfirmation.value
        })
        .then(() => {
          passwordChanged.value = true
        })
        .catch((error : any) => {
          if (error.response.status === 500) {
            errorMsg.value = 'Váratlan hiba történt. Kérjük, próbálkozz később.'
          } else {
            errorMsg.value = 'A mezők kitöltése kötelező.'
          }
        })
        .finally(() => {
          isLoading.value = false
        });
    } else {
        errorMsg.value = 'A jelszavak nem egyeznek.'
    }
  }

  onMounted(() => {
    if (route.params.token !== 'notoken') {
      token.value = String(route.params.token);
    }
  })
</script>
  