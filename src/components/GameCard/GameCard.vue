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
      // https://capacitorjs.com/docs/apis/share
      return {
        text: this.game.deck,
        title: this.game.name,
        // url: this.game.api_detail_url,
        files: [this.game.image.original_url],
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
</style>
