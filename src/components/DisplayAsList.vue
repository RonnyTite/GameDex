<template>
  <IonCard
    v-for="(game, index) in dataList"
    :key="index"
    class="home-game-card"
    @click="$emit('open-gamecard', game)"
  >
    <IonCardContent>
      <span class="image-container">
        <IonImg
          alt=""
          :src="game.image.thumb_url"
          class="card-content-thumbnail"
        />
      </span>
      <span class="content-layout">
        <span class="text__bold">{{ game.name }}</span>
        <div>
          <small class="text__blue">Release Date: </small>
          <small>{{ computeReleaseDate(game) }}</small>
        </div>
        <DisplayAsLabel :label-list="game.platforms" />
      </span>
    </IonCardContent>
  </IonCard>
</template>

<script lang="ts">
import {
  IonCard, IonCardContent,
  IonImg,
} from '@ionic/vue';

import { defineComponent } from 'vue';
import { GameProfile, GameProfileFeed } from '../types/searchEntities.d';
import Utils from '../utils/Utils';
import DisplayAsLabel from './DisplayAsLabel.vue';

export default defineComponent({
  components: {
    IonCard,
    IonCardContent,
    IonImg,
    DisplayAsLabel,
  },
  props: {
    dataList: { type: Array<GameProfile | GameProfileFeed>, required: true, default: [] },
  },
  emits: ['open-gamecard'],
  methods: {
    computeReleaseDate(game: GameProfile | GameProfileFeed): string {
      return Utils.computeReleaseDate(game);
    },
  },
});
</script>
<style scoped>
.home-game-card {
  cursor: pointer;
}

.home-game-card .image-container {
  width: 5rem;
  max-width: 7rem;
  margin-right: 10px;
}

.home-game-card .content-layout {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

ion-img {
  width: 80px;
  height: 100%;
}

.card-content-thumbnail {
  object-fit: contain;
}

.home-game-card:hover,
home-game-card:active {
  box-shadow: 0 0 11px rgba(33, 33, 33, .2);
}

ion-item {
  --inner-border-width: 0 0 0 0;
}

ion-card-content {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
}

* {
  text-decoration: none;
}
</style>
