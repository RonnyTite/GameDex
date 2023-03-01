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
            :src="game.image.thumb_url"
            class="card-content-thumbnail"
          />
        </IonThumbnail>
        <IonLabel>
          <span class="text__bold">{{ game.name }}</span>
          <br>
          <div>
            <small class="text__blue">Release Date: </small>
            <small>{{ computeReleaseDate(game) }}</small>
          </div>
          <DisplayAsLabel :label-list="game.platforms" />
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
import Utils from '../utils/Utils';
import DisplayAsLabel from './DisplayAsLabel.vue';

export default defineComponent({
  components: {
    IonCard,
    IonCardContent,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonImg,
    DisplayAsLabel,
  },
  props: {
    dataList: { type: Array<GameProfile>, required: true, default: [] },
  },
  emits: ['open-gamecard'],
  methods: {
    computeReleaseDate(game:GameProfile):string {
      return Utils.computeReleaseDate(game);
    },
  },
});
</script>
  <style scoped>
  .home-game-card {
    cursor: pointer;
  }
  .card-content-thumbnail {
    object-fit: contain;
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
