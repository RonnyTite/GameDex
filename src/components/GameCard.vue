<template>
  <IonModal :is-open="isOpen">
    <IonHeader>
      <IonToolbar>
        <IonTitle>{{ game.name }}</IonTitle>
        <IonButtons slot="end">
          <IonButton @click="$emit('close-modal')">
            Close
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <p>
        {{ game.deck }}
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
  IonButtons, IonButton, IonModal, IonHeader, IonToolbar, IonContent, IonTitle,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { AxiosResponse } from 'axios';
import { CompleteGameProfile } from '../types/searchEntities';
import GiantBombApi from '../scripts/GiantBombApi';
import searchMockJson from '../mocks/searchRequestResultsMock.json';

export default defineComponent({
  components: {
    IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle,
  },
  props: {
    isOpen: { type: Boolean, required: true, default: false },
    gameId: { type: String, required: true, default: '' },
  },
  emits: ['close-modal'],
  data() {
    return {
      game: {} as CompleteGameProfile | Record<string, never>,
    };
  },
  beforeMount() {
    if (this.isOpen && this.gameId) {
      GiantBombApi.fetchGameProfile(this.gameId)
        .then((results:AxiosResponse<CompleteGameProfile>) => {
          this.game = results.data;
        })
        .catch(() => {
          // !!Debug Mode
          this.game = searchMockJson.results[0] as CompleteGameProfile;
        });
    }
  },

});
</script>
