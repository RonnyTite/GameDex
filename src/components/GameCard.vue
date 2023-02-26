<template>
  <IonModal :is-open="isOpen">
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton @click="$emit('close-modal')">
            <IonIcon
              :icon="arrowBackOutline"
              color="light"
            />
          </IonButton>
        </IonButtons>
        <IonTitle
          color="light"
          class="font__pixel ion-text-uppercase"
        >
          {{ game.name }}
        </IonTitle>
        <IonButtons slot="end">
          <IonButton>
            <IonIcon
              :icon="shareSocialOutline"
              color="light"
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <p>
        {{ game.deck }}
      </p>
      <p>
        <DisplayAsLabel :label-list="game.platforms" />
      </p>

      <p
        v-for="(detail, index) in game"
        :key="index"
      >
        {{ index }}: {{ detail || null }}
      </p>
    </IonContent>
  </IonModal>
</template>

<script lang="ts">
import {
  IonButtons, IonButton, IonModal, IonHeader, IonToolbar, IonContent, IonTitle, IonIcon,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { AxiosResponse } from 'axios';
import { arrowBackOutline, shareSocialOutline } from 'ionicons/icons';
import { CompleteGameProfile } from '../types/searchEntities';
import GiantBombApi from '../scripts/GiantBombApi';
import searchMockJson from '../mocks/searchRequestResultsMock.json';
import DisplayAsLabel from './DisplayAsLabel.vue';

export default defineComponent({
  components: {
    IonButtons,
    IonButton,
    IonModal,
    IonIcon,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    DisplayAsLabel,
  },
  props: {
    isOpen: { type: Boolean, required: true, default: false },
    gameId: { type: String, required: true, default: '' },
  },
  emits: ['close-modal'],
  setup() {
    return { arrowBackOutline, shareSocialOutline };
  },
  data() {
    return {
      game: {} as CompleteGameProfile | Record<string, never>,
    };
  },
  beforeMount() {
    if (this.isOpen && this.gameId) {
      GiantBombApi.fetchGameProfile(this.gameId)
        .then((searchResults:AxiosResponse<CompleteGameProfile>) => {
          this.game = searchResults.data;
        })
        .catch(() => {
          // !!Debug Mode
          this.game = searchMockJson.results[0] as CompleteGameProfile;
        });
    }
  },
});
</script>
