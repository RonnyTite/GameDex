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
        <IonButtons
          v-if="navigatorCanShare()"
          slot="end"
        >
          <IonButton
            class="share-button"
            @click="share"
          >
            <IonIcon
              :icon="shareSocialOutline"
              color="light"
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent class="ion-padding">
      <IonSpinner
        v-if="processing"
        name="crescent"
        class="spinner"
      />
      <div v-else>
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
    </IonContent>
  </IonModal>
</template>

<script lang="ts">
import {
  IonButtons, IonButton, IonModal, IonHeader, IonToolbar, IonContent, IonTitle, IonIcon, IonSpinner,
  IonImg,
} from '@ionic/vue';
import { defineComponent, nextTick } from 'vue';
import {
  arrowBackOutline, shareSocialOutline, heartOutline, heart,
} from 'ionicons/icons';
import gameDexStore from '@/store/Store';
import { CompleteGameProfile } from '@/types/searchEntities';
import GiantBombApi from '@/scripts/GiantBombApi';
import Utils from '@/utils/Utils';
import GameMock from '@/mocks/gameMock.json';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Share, CanShareResult, ShareResult, ShareOptions,
} from '@capacitor/share';
import DisplayAsLabel from './DisplayAsLabel.vue';

export default defineComponent({
  components: {
    IonButtons,
    IonButton,
    IonModal,
    IonIcon,
    IonImg,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonSpinner,
    DisplayAsLabel,
  },
  props: {
    isOpen: { type: Boolean, required: true, default: false },
    gameId: { type: String, required: true, default: '' },
  },
  emits: ['close-modal'],
  setup() {
    return {
      arrowBackOutline, shareSocialOutline, heartOutline, heart,
    };
  },
  data() {
    return {
      game: {} as CompleteGameProfile,
      processing: false as boolean,
    };
  },
  computed: {
    computeReleaseDate(): string {
      return Utils.computeReleaseDate(this.game);
    },
    containsSimilarGamesProperty() {
      return this.game.similar_games && this.game.similar_games.length > 0;
    },
    dataToShare(): ShareOptions {
      return {
        text: this.game.deck,
        title: this.game.name,
        url: this.game.api_detail_url,
        dialogTitle: 'Dialog Title',
      };
    },
    isAlreadySaved(): boolean {
      return Utils.isAlreadySaved(this.game.id);
    },
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage(): void {
      if (this.isOpen && this.gameId) {
        this.processing = true;
        GiantBombApi.fetchGameProfile(this.gameId)
          .then((searchResults) => {
            this.game = searchResults.data.results;
          })
          .catch((err) => {
            // !!Debug Mode
            this.game = GameMock as CompleteGameProfile;
            console.error(err);
          }).finally(async () => {
            this.processing = false;
            await nextTick(); // wait  a little for the newt rendering after processing => false https://vuejs.org/api/general.html#nexttick
            if (this.isAlreadySaved) {
              this.addHeartBeatAnimation();
            } else {
              const animatedHeart = document.querySelector('.heart-filled');
              animatedHeart?.setAttribute('style', 'opacity: 0');
            }
          });
      }
    },
    // @ts-ignore its an async assigned to a const, everything is OK
    async navigatorCanShare(): CanShareResult {
      const canShare = await Share.canShare(); // need to wait to have a boolean
      return canShare;
    },
    share(): Promise<ShareResult> {
      return Share.share(this.dataToShare);
    },
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

/* ANIMATION  */
.heartbeat {
  animation: 1.8s ease-in 0s 1 beat;
  /* Retain last frame of animation when disappearing https://stackoverflow.com/a/6902557 */
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

.slowbeat {
  animation: 1.8s ease-in 0s 1 slowbeat;
  /* Retain last frame of animation when disappearing https://stackoverflow.com/a/6902557 */
  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  -o-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

@keyframes beat {
  0% {
    transform: scale(0, 0);
    opacity: 0.8;
  }

  60% {
    transform: scale(1.3, 1.3);
  }

  80% {
    transform: scale(0.8, 0.8);
  }

  100% {
    transform: scale(1, 1);
    opacity: 1;
  }
}

@keyframes slowbeat {
  0% {
    transform: scale(1, 1);
    opacity: 1;
  }

  80% {
    transform: scale(0.2, 0.2);
    opacity: 0.8;
  }

  100% {
    transform: scale(0, 0);
    opacity: 0
  }
}
</style>
