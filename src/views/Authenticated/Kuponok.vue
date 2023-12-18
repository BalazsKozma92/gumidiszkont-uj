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
              Kuponok
            </h2>
            <div class="flex items-center gap-5">
              Itt találhatóak az elérhető kuponjaid. Csak mutasd fel a QR kódot a kollégánknak, aki szkennelés után jóváhagyja a kuponon lévő összeget!
            </div>
            <br>
            <ion-list>
              <div class="single-coupon" v-for="coupon in coupons" :key="coupon.id">
                <ion-accordion-group>
                  <ion-accordion value="first">
                    <ion-item slot="header" color="transparent">
                      <div>
                        <div class="coupon-name">
                          {{ coupon.name }}
                        </div>
                        <div class="coupon-value">Kupon értéke: {{ coupon.value }}{{ coupon.type === 'percentage' ? '%' : ' Ft' }}</div>
                      </div>
                    </ion-item>
                    <div class="ion-padding text-center qr-slot flex flex-col items-center" slot="content">
                      <div class="coupon-expiration-label">
                        <div>Kupon lejárati dátuma:</div>
                        <div>
                          {{ coupon.expiration_date }}
                        </div>
                      </div>
                      <div class="qr-code" v-html="coupon.qr_code" alt="Coupon QR Code"></div>
                    </div>
                  </ion-accordion>
                </ion-accordion-group>
              </div>
            </ion-list>
        </div>
      </div>
    </ion-content>
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
  import { onMounted, ref } from 'vue'
  import {
    IonContent,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonAccordion,
    IonAccordionGroup,
    IonSpinner,
  } from '@ionic/vue';
  import axios from 'axios'

  const coupons = ref([])
  const isLoading = ref(false)

  function fetchCoupons() {
    isLoading.value = true

    axios.get('https://admin.autoszervizmiskolc.hu/api/my-coupons/' + JSON.parse(localStorage.getItem('user')).id)
      .then(response => {
        coupons.value = response.data.coupons;
      })
      .catch(error => {
        console.error('Error fetching coupons', error);
      })
      .finally(() => {
        isLoading.value = false
      });
  }

  onMounted(() => {
    fetchCoupons()
  })
</script>

<style scoped>
</style>