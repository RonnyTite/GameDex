<template>
  <div class="masonry-container">
    <IonCard
      v-for="(game, index) in dataList"
      :key="index"
      class="home-game-masonry-card"
      @click="$emit('open-gamecard', game)"
    >
      <IonCardContent>
        <IonImg
          alt=""
          :src="game.image.small_url"
          class="card-content-thumbnail"
        />
      </IonCardContent>
    </IonCard>
  </div>
</template>

<script lang="ts">
import {
  IonCard, IonCardContent,
  IonImg,
} from '@ionic/vue';

import { defineComponent } from 'vue';
import { GameProfile, GameProfileFeed } from '../types/SearchEntities.d';
//  Ref for masonry: https://www.youtube.com/watch?v=7d1bhYsYi7E
export default defineComponent({
  components: {
    IonCard,
    IonCardContent,
    IonImg,
  },
  props: {
    dataList: { type: Array<GameProfile | GameProfileFeed>, required: true, default: [] },
  },
  emits: ['open-gamecard'],
});
</script>
<style scoped>
.masonry-container {
  columns: 2;
  column-gap: 10px;
  padding: 10px;
}

ion-card {
  margin: 0 0 10px 0;
  width: 100%;
  break-inside: avoid;
}

ion-card-content {
  padding: 0;
}

.home-game-masonry-card {
  cursor: pointer;
}

.home-game-masonry-card:hover,
home-game-masonry-card:active {
  box-shadow: 0 0 11px rgba(33, 33, 33, .2);
}

* {
  text-decoration: none;
}
</style>
