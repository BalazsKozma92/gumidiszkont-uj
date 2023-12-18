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
            Szkenner
          </h2>
          <div class="flex items-center justify-center">
            <ion-button @click="scanSingleBarcode">QR kód leolvasása</ion-button>
          </div>
          <div v-if="scannedCoupon">
            <p class="scanned-coupon-value">Érték: {{ scannedCoupon.value }}{{ scannedCoupon.type === 'percentage' ? '%' : ' Ft'}}</p>
            <p>Lejárati dátum: {{ scannedCoupon.expiration_date }}</p>
            <div class="flex items-center justify-center scanned-coupon-btn-wrap">
              <ion-button color="medium" @click="cancelScan()">Mégsem</ion-button>
              <ion-button @click="useCoupon">Kupon felhasználása</ion-button>
            </div>
          </div>
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
  import {
    IonContent,
    IonButton,
    IonPage,
    IonToast,
    IonSpinner,
  } from '@ionic/vue';
  import {
    BarcodeScanner,
    // BarcodeFormat,
  } from '@capacitor-mlkit/barcode-scanning';
  import { ref, onBeforeUnmount } from 'vue'; 
  import axios from 'axios'

  const scannedCoupon = ref(null);

  const isLoading = ref(false)
  const isOpen = ref(false)
  const customMessage = ref('')
  const customClass = ref('')
  const someError = ref('')

  const stopScan = async () => {
    document.querySelector('body')?.classList.remove('barcode-scanner-active');

    someError.value = null

    await BarcodeScanner.removeAllListeners();

    await BarcodeScanner.stopScan();
  };

  const scanSingleBarcode = async () => {
    return new Promise(async resolve => {
      document.querySelector('body')?.classList.add('barcode-scanner-active');

      const listener = await BarcodeScanner.addListener(
        'barcodeScanned',
        async result => {
          await listener.remove();
          document
            .querySelector('body')
            ?.classList.remove('barcode-scanner-active');
          await BarcodeScanner.stopScan();
          retrieveCouponInfo((result.barcode.displayValue).substring(7));
        },
      );

      await BarcodeScanner.startScan();
    });
  };

  function cancelScan() {
    stopScan()
    scannedCoupon.value = null;
  }
  // const scan = async () => {
  //   const { barcodes } = await BarcodeScanner.scan({
  //     formats: [BarcodeFormat.QrCode],
  //   });
  //   return barcodes;
  // };

  // const isSupported = async () => {
  //   const { supported } = await BarcodeScanner.isSupported();
  //   return supported;
  // };

  // const enableTorch = async () => {
  //   await BarcodeScanner.enableTorch();
  // };

  // const disableTorch = async () => {
  //   await BarcodeScanner.disableTorch();
  // };

  // const toggleTorch = async () => {
  //   await BarcodeScanner.toggleTorch();
  // };

  // const isTorchEnabled = async () => {
  //   const { enabled } = await BarcodeScanner.isTorchEnabled();
  //   return enabled;
  // };

  // const isTorchAvailable = async () => {
  //   const { available } = await BarcodeScanner.isTorchAvailable();
  //   return available;
  // };

  // const openSettings = async () => {
  //   await BarcodeScanner.openSettings();
  // };

  // const isGoogleBarcodeScannerModuleAvailable = async () => {
  //   const { available } =
  //     await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
  //   return available;
  // };

  // const installGoogleBarcodeScannerModule = async () => {
  //   await BarcodeScanner.installGoogleBarcodeScannerModule();
  // };

  // const checkPermissions = async () => {
  //   const { camera } = await BarcodeScanner.checkPermissions();
  //   return camera;
  // };

  // const requestPermissions = async () => {
  //   const { camera } = await BarcodeScanner.requestPermissions();
  //   return camera;
  // };

  const retrieveCouponInfo = async (couponId) => {
    axios.get(`https://admin.autoszervizmiskolc.hu/api/coupons/${couponId}`)
      .then(response => {
        scannedCoupon.value = response.data;
        stopScan();
      })
      .catch(() => {
        onDismiss(true)
        customClass.value = 'error-toast'
        customMessage.value = 'Valami hiba történt.'
        stopScan();
      })
      .finally(() => {
        isLoading.value = false
        stopScan();
      });
  };

  const useCoupon = () => {
    isLoading.value = true

    if (scannedCoupon.value) {
      axios.put(`https://admin.autoszervizmiskolc.hu/api/coupons/${scannedCoupon.value.id}/use`)
      .then(() => {
        onDismiss(true)
        customClass.value = 'success-toast'
        customMessage.value = 'A kupon fel lett használva!'
      })
      .catch(() => {
        onDismiss(true)
        customClass.value = 'error-toast'
        customMessage.value = 'Valami hiba történt.'
      })
      .finally(() => {
        isLoading.value = false
        cancelScan()
      });
    }
  };

  function onDismiss(state) {
    isOpen.value = state
    customClass.value = ''
    customMessage.value = ''
  }

  onBeforeUnmount(() => {
    scannedCoupon.value = null;
    stopScan()
  });

</script>

<style scoped>
</style>