<template>
  <IonCard
    v-for="(game, index) in dataList"
    :key="index"
    class="home-game-card"
    @click="$emit('open-gamecard',game)"
  >
    <IonCardContent>
      <IonItem>
        <IonThumbnail slot="start">
          <IonImg
            alt=""
            :src="game.image.medium_url"
          />
        </IonThumbnail>
        <IonLabel>
          <span class="text__bold">{{ game.name }}</span>
          <br>
          <small
            v-if="game.original_release_date"
            class="text__blue"
          >Release Date: {{ game.original_release_date }}</small>
          <small
            v-else
            class="text__blue"
          >Release Date: <span class="text__grey">- - -</span></small>
        </IonLabel>
      </ionItem>
    </IonCardContent>
  </IonCard>
</template>

<script lang="ts">
import {
  IonCard, IonCardContent,
  IonItem, IonThumbnail,
  IonImg,
  IonLabel,
} from '@ionic/vue';

import { defineComponent } from 'vue';
import { GameProfile } from '../types/searchEntities.d';

export default defineComponent({
  components: {
    IonCard,
    IonCardContent,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonImg,
  },
  props: {
    dataList: { type: Array<GameProfile>, required: true, default: [] },
  },
  emits: ['open-gamecard'],
});
</script>
  <style scoped>
  .home-game-card {
    cursor: pointer;
  }
  .home-game-card:hover, home-game-card:active  {
    box-shadow: 0 0 11px rgba(33,33,33,.2);
  }
  ion-item {
  --inner-border-width: 0 0 0 0;
  }
  * {
    text-decoration: none;
  }
  </style>
