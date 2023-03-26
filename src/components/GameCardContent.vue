<template>
  <div>
    <div v-if="isGameProfileExists">
      <div class="img-container">
        <IonImg
          :src="game.image.original_url || ''"
          class="main-image"
        />
        <div
          class="heart-container"
          @click="toggleGameInLibrary"
        >
          <IonIcon
            class="heart-icon heart-filled"
            :class="{'heartbeat': isAlreadySaved,'slowbeat': !isAlreadySaved }"
            :icon="heart"
          />
          <IonIcon
            class="heart-icon heart-outline"
            :icon="heartOutline"
          />
        </div>
      </div>

      <div class="ion-margin-top">
        <span class="text__blue text__bold">Developer(s): </span>
        <span
          v-for="(developer, key) in game.developers"
          :key="key"
        >{{ developer.name }} {{ game.developers.length !==
          key + 1 ? '| ' : '' }}</span>
      </div>

      <div class="ion-margin-top">
        <span class="text__blue text__bold">Release Date: </span>{{ computeReleaseDate }}
      </div>
      <div class="ion-margin-top">
        <span class="text__blue text__bold ">Region: </span>{{ game.region }}
      </div>

      <DisplayAsLabel
        :label-list="game.platforms"
        :abbreviation="false"
      />

      <div class="ion-margin-top">
        <span class="text__blue text__bold">Story</span>
        <p class="font__proxima">
          {{ game.deck }}
        </p>
      </div>

      <div v-if="containsSimilarGamesProperty">
        <p
          v-for="(similarGame, index) in game.similar_games"
          :key="index"
        >
          {{ similarGame.name }}
        </p>
      </div>
    </div>
    <div v-else>
      <IonIcon
        :icon="skullOutline"
        class="spinner"
      />
      FAIL TO LOAD DATA
    </div>
  </div>
</template>
<script lang="ts">
import { IonIcon, IonImg } from '@ionic/vue';
import { defineComponent, PropType } from 'vue';
import {
  arrowBackOutline, shareSocialOutline, heartOutline, heart, skullOutline,
} from 'ionicons/icons';
import gameDexStore from '@/store/Store';
import { CompleteGameProfile } from '@/types/searchEntities';
import Utils from '@/utils/Utils';
import DisplayAsLabel from '@/components/DisplayAsLabel.vue';

export default defineComponent({
  components: {
    IonIcon,
    IonImg,
    DisplayAsLabel,
  },
  props: {
    gameProperties: { type: Object as PropType<CompleteGameProfile>, default: () => ({}) },
  },
  setup() {
    return {
      arrowBackOutline, shareSocialOutline, heartOutline, heart, skullOutline,
    };
  },
  data() {
    return {
      game: {} as CompleteGameProfile,
    };
  },
  computed: {
    computeReleaseDate(): string {
      return Utils.computeReleaseDate(this.game);
    },
    containsSimilarGamesProperty() {
      return this.game.similar_games && this.game.similar_games.length > 0;
    },
    isAlreadySaved(): boolean {
      return Utils.isAlreadySaved(this.game.id.toString());
    },
    isGameProfileExists() {
      return Object.keys(this.game).length > 0;
    },
  },
  mounted() {
    this.game = this.gameProperties;
  },
  methods: {
    addHeartBeatAnimation(): void {
      const animatedHeart = document.querySelector('.heart-filled');
      if (animatedHeart) {
        animatedHeart.classList.remove('heartbeat', 'slowbeat');
        animatedHeart.classList.add('heartbeat');
      }
    },
    addSlowBeatAnimation(): void {
      const animatedHeart = document.querySelector('.heart-filled');
      if (animatedHeart) {
        animatedHeart.classList.remove('heartbeat', 'slowbeat');
        animatedHeart.classList.add('slowbeat');
      }
    },
    toggleHeartAnimation(): void {
      if (this.isAlreadySaved) {
        this.addHeartBeatAnimation();
      } else {
        this.addSlowBeatAnimation();
      }
    },
    toggleGameInLibrary(): void {
      const store = gameDexStore();
      store.toggleGameInLibrary(this.game);
      this.toggleHeartAnimation();
    },
  },
});
</script>
  <style>
  .spinner {
    top: 40% !important;
  }

  .main-image {
    display: block;
    height: 350px;
    margin: 0 auto 1em auto;
    width: auto;
  }

  .img-container {
    position: relative;
    margin: auto;
    width: 300px;
    display: block;
    height: 100%;
  }

  .heart-container {
    cursor: pointer;
    position: absolute;
    right: 20px;
    bottom: 5px;
    width: 25px;
    height: 25px;
  }
  .heart-icon {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .heart-outline {
    color: #98002e;
  }

  .heart-filled {
    color: #e31b23;
    z-index: 10;
    opacity: 0;
  }
  .heartbeat {
    animation: 0.5s ease-in 0s 1 beat;
    /* Retain last frame of animation when disappearing https://stackoverflow.com/a/6902557 */
    -webkit-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
    -o-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
  }

  .slowbeat {
    animation: 0.9s ease-in 0s 1 slowbeat;
    /* Retain last frame of animation when disappearing https://stackoverflow.com/a/6902557 */
    -webkit-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
    -o-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
  }

  </style>
