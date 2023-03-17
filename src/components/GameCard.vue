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
          v-if="navigatorCanShare"
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
        <div>
          <div class="img-container">
            <IonImg
              :src="game.image.original_url || ''"
              class="main-image"
            />
            <IonIcon
              class="heart-icon"
              :icon="heartOutline"
              color="light"
              @click="toggleGameInLibrary"
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
import { defineComponent } from 'vue';
import { arrowBackOutline, shareSocialOutline, heartOutline } from 'ionicons/icons';
import gameDexStore from '@/store/Store';
import { CompleteGameProfile } from '@/types/searchEntities';
import GiantBombApi from '@/scripts/GiantBombApi';
import Utils from '@/utils/Utils';
import GameMock from '@/mocks/gameMock.json';
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
    return { arrowBackOutline, shareSocialOutline, heartOutline };
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
    dataToShare() {
      return {
        text: this.game.deck,
        title: this.game.name,
        url: this.game.api_detail_url,
      };
    },
    navigatorCanShare() {
      return navigator.canShare(this.dataToShare) && navigator.share;
    },
  },
  beforeMount() {
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
        }).finally(() => {
          this.processing = false;
        });
    }
  },
  methods: {
    async share(): Promise<void> {
      return navigator.share(this.dataToShare);
    },
    toggleGameInLibrary() {
      const store = gameDexStore();
      store.toggleGameInLibrary(this.game);
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

.heart-icon {
  cursor: pointer;
  position: absolute;
  right: 20px;
  bottom: 5px;
  width: 25px;
  height: 25px;
}
</style>
