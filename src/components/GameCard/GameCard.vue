<template>
  <IonModal
    id="gamecard-modal"
    :is-open="isOpen"
  >
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
      <GameCardcontent
        v-else
        :game="game"
      />
    </IonContent>
  </IonModal>
</template>

<script lang="ts">
import {
  IonButtons, IonButton, IonModal, IonHeader, IonToolbar, IonContent, IonTitle, IonIcon, IonSpinner,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import {
  arrowBackOutline, shareSocialOutline,
} from 'ionicons/icons';
import { CompleteGameProfile } from '@/types/searchEntities';
import GiantBombApi from '@/scripts/GiantBombApi';
import Utils from '@/utils/Utils';
import GameMock from '@/mocks/gameMock.json';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Share, CanShareResult, ShareResult, ShareOptions,
} from '@capacitor/share';
import GameCardcontent from './GameCardContent.vue';

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
    IonSpinner,
    GameCardcontent,
  },
  props: {
    isOpen: { type: Boolean, required: true, default: false },
    gameId: { type: String, required: true, default: '' },
  },
  emits: ['close-modal'],
  setup() {
    return {
      arrowBackOutline, shareSocialOutline,
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
      return Utils.isAlreadySaved(this.gameId);
    },
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage(): void {
      if (this.isOpen && this.gameId) {
        this.processing = true;
        Utils.loadGame(this.gameId)
          .then((fetchedGame) => {
            this.game = fetchedGame;
          })
          .catch(() => GiantBombApi.fetchGameProfile(this.gameId)
            .then((searchResults) => {
              this.game = searchResults.data.results;
            })
            .catch((err) => {
            // !!Debug Mode
              this.game = GameMock as CompleteGameProfile;
              console.error(err);
            }))
          .finally(async () => {
            this.processing = false;
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
.hide{
  opacity: 0;
}
.show{
  opacity: 1;
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
