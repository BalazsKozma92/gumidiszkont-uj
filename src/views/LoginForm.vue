<!-- LoginComponent.vue -->
<template>
  <ion-page
    class="main"
  >
    <form @submit.prevent="loginUser" class="login-form">
      <ion-label>
        <h1>Bejelentkezés</h1>
      </ion-label>
      <ion-list>
        <ion-item lines="none">
          <ion-input
            v-model="email"
            label="Email cím"
            label-placement="stacked"
            type="email"
          >
          </ion-input>
        </ion-item>
  
        <ion-item lines="none">
          <ion-input
            v-model="password"
            label="Jelszó"
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
        <div class="gray-small mb-small">
          <div @click="goToPasswordRequestPage()">
            Elfelejtettem a jelszavam
          </div>
        </div>
        <div class="login-btn">
          <ion-button type="submit">Bejelentkezés</ion-button>
        </div>
      </ion-list>
    </form>
    <div class="gray-small">
      <div @click="goToRegistrationPage()">
        Még nem vagy regisztrálva?
        Kattints ide egy új fiók létrehozásához.
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
.gray-small {
  font-size: small;
  color: gray;
  max-width: 75%;
  margin: 10px auto 0;
  text-align: center;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

ion-item, .login-btn {
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
    IonList,
    IonButton,
    IonInput,
    IonSpinner,
  } from '@ionic/vue';
  import axios from 'axios'
  import { useRouter } from 'vue-router';

  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const isLoading = ref(false)
  const errorMsg = ref('')

  function goToPasswordRequestPage() {
    router.push('/password-request');
  }

  function goToRegistrationPage() {
    email.value = ''
    password.value = ''
    errorMsg.value = ''
    router.push('/registration');
  }

  function loginUser() {
    isLoading.value = true;
    const userData = {
      email: email.value,
      password: password.value
    };

    axios.post(`https://admin.autoszervizmiskolc.hu/api/login`, userData)
      .then((response : any) => {
        errorMsg.value = ''

        const currentTime = new Date().getTime();
        const expirationTime = currentTime + (30 * 60 * 1000);

        const token = { tokenName: response.data.token, expirationTime: expirationTime };
        const jsonToken = JSON.stringify(token);

        localStorage.setItem('token', jsonToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/main-page');
      })
      .catch((error: any) => {
        if (error.response.status === 500) {
          errorMsg.value = 'Váratlan hiba történt. Kérjük, próbálkozz később.'
        } else {
          errorMsg.value = 'Helytelen email cím vagy jelszó!'
        }
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  onMounted(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  })

</script>
  