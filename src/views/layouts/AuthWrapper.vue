<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <ion-page
    class="main"
  >
    <ion-menu content-id="auth-main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menü</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding sidebar-menu">
        <ion-menu-toggle :auto-hide="true" v-for="(page, i) in appPages" :key="i">
          <ion-item
            @click="selectedIndex = i" router-direction="root" :router-link="page.url" lines="none"
            :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
            <ion-icon aria-hidden="true" slot="start" :ios="page.icon" :md="page.icon"></ion-icon>
            <ion-label>{{ page.title }}</ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-menu-toggle v-if="isAdmin == 1">
          <ion-item @click="selectedIndex = 'scanner'" router-direction="root" :router-link="'/scanner'" lines="none"
            :detail="false" class="hydrated" :class="{ selected: selectedIndex === 'scanner' }">
            <ion-icon aria-hidden="true" slot="start" :ios="qrCodeOutline" :md="qrCodeOutline"></ion-icon>
            <ion-label>QR szkenner</ion-label>
          </ion-item>
        </ion-menu-toggle>
        <ion-item @click="setOpen(true)">
          <ion-icon aria-hidden="true" slot="start" :ios="logOutOutline" :md="logOutOutline"></ion-icon>
          <ion-button class="logout">Kijelentkezés</ion-button>
          <ion-alert :is-open="isOpen" header="Kijelentkezés" sub-header="Biztosan ki szeretnél jelentkezni?"
            :buttons="alertButtons" @didDismiss="setOpen(false)"></ion-alert>
        </ion-item>
      </ion-content>
    </ion-menu>
    <ion-page id="auth-main-content">
      <ion-buttons slot="start" class="top-bar">
        <ion-menu-button></ion-menu-button>
        <div class="main-img"></div>
      </ion-buttons>
      <router-view></router-view>
    </ion-page>
  </ion-page>
</template>
  
<script setup>
import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonItem,
  IonMenuToggle,
  IonLabel,
  IonAlert,
} from '@ionic/vue';
import {
  apertureOutline,
  desktopOutline,
  carOutline,
  cogOutline,
  thermometerOutline,
  settingsOutline,
  pricetagsOutline,
  calendarNumberOutline,
  mapOutline,
  helpOutline,
  layersOutline,
  logOutOutline,
  qrCodeOutline,
} from 'ionicons/icons';
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const isAdmin = ref(false);

const router = useRouter()
const isOpen = ref(false)
const alertButtons = [
  {
    text: 'Mégsem',
    role: 'cancel',
  },
  {
    text: 'Igen',
    role: 'confirm',
    handler: () => {
      router.push('/login');
    },
  },
];
const selectedIndex = ref(0);
const appPages = [
  {
    title: 'Főoldal',
    url: '/main-page',
    icon: desktopOutline,
  },
  {
    title: 'Gumiszerviz',
    url: '/tyre-service',
    icon: apertureOutline,
  },
  {
    title: 'Autószerviz',
    url: '/car-service',
    icon: carOutline,
  },
  {
    title: 'Felnijavítás',
    url: '/rim-repair',
    icon: cogOutline,
  },
  {
    title: 'Klímatisztítás, javítás',
    url: '/air-conditioner-repair',
    icon: thermometerOutline,
  },
  {
    title: 'Futómű állítás',
    url: '/gear-adjustment',
    icon: settingsOutline,
  },
  {
    title: 'Kuponok',
    url: '/coupons',
    icon: pricetagsOutline,
  },
  {
    title: 'Időpontfoglalás',
    url: '/appointment',
    icon: calendarNumberOutline,
  },
  {
    title: 'Térkép',
    url: '/map',
    icon: mapOutline,
  },
  {
    title: 'Flották',
    url: '/fleet',
    icon: layersOutline,
  },
  {
    title: 'Segítség',
    url: '/help',
    icon: helpOutline,
  },
];
const path = window.location.pathname.split('/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
}

function setOpen(state) {
  isOpen.value = state
}

onMounted(() => {
  watch(
    () => localStorage.getItem('user'),
    (newValue) => {
      const userData = JSON.parse(newValue);
      isAdmin.value = userData ? userData.is_admin : false;
    },
    { immediate: true }
  );
});
</script>
  
<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>