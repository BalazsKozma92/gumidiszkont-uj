<template>
  <ion-page
    class="main"
  >
    <form @submit.prevent="registerUser">
      <ion-label>
        <h1>Regisztráció</h1>
      </ion-label>
      <ion-list>
        <ion-item
          lines="none"
        >
          <ion-input
            v-model="name"
            label="Név"
            label-placement="stacked"
            type="text"
          >
          </ion-input>
        </ion-item>

        <ion-item
          lines="none"
        >
          <ion-input
            v-model="email"
            label="Email cím"
            label-placement="stacked"
            type="email"
          >
          </ion-input>
        </ion-item>
  
        <ion-item
          lines="none"
        >
          <ion-input
            v-model="password"
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
            v-model="passwordConfirmation"
            label="Jelszó megismétlése"
            label-placement="stacked"
            type="password"
          >
          </ion-input>
        </ion-item>
        <div
          v-if="errorMsg.length > 0"
          class="errorMsg"
        >
          <p
            v-for="(error, key) in errorMsg"
            :key="key"
          >
            {{ error }}
          </p>
        </div>
        <div class="register-btn">
          <ion-button type="submit">Regisztrálok</ion-button>
        </div>
      </ion-list>
    </form>
    <div class="gray-small">
      <div @click="goToLoginPage()">
        Vissza
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
  color: gray;
  max-width: 75%;
  margin: 10px auto 0;
  text-align: center;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

form {
  text-align: center;
}

ion-item, .register-btn {
  max-width: 75%;
  margin: 0 auto 15px;
}

.ion-page {
  justify-content: center;
}
</style>

<script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'
  import {
    IonPage,
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    IonInput,
    IonSpinner,
  } from '@ionic/vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const passwordConfirmation = ref('')
  const isLoading = ref(false)
  const errorMsg = ref<string[]>([])

  function goToLoginPage() {
    name.value = ''
    email.value = ''
    password.value = ''
    passwordConfirmation.value = ''
    errorMsg.value = []
    router.push('/login');
  }

  function registerUser() {
    isLoading.value = true;
    errorMsg.value = []

    if (password.value === passwordConfirmation.value) {
      const userData = {
        name: name.value,
        email: email.value,
        password: password.value
      };
  
      axios.post(`https://admin.autoszervizmiskolc.hu/api/register`, userData)
        .then((response : any) => {
          console.log(response)
          errorMsg.value = []
          router.push('/verify-email/notoken');
        })
        .catch((error: any ) => {
          if (error.response.status === 500) {
            errorMsg.value.push('Váratlan hiba történt. Kérjük, próbálkozz később.')
          } else {
            for (let index = 0; index < Object.keys(error.response.data.errors).length; index++) {
              errorMsg.value.push(error.response.data.errors[Object.keys(error.response.data.errors)[index]][0])
            }
          }
        })
        .finally(() => {
          isLoading.value = false;
        })
    } else {
      isLoading.value = false;
      errorMsg.value.push('A jelszavak nem egyeznek.')
    }
  }
</script>