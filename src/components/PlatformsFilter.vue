<template>
  <IonButton id="click-trigger">
    <IonIcon
      :icon="filterOutline"
      color="light"
    />
  </IonButton>
  <IonPopover
    trigger="click-trigger"
    trigger-action="click"
    :is-open="popoverOpen"
    @did-dismiss="filteringByPlatforms"
  >
    <IonContent>
      <IonItem
        :class="{ 'disabled': !isFilterActive }"
        @click="resetFilter"
      >
        <IonIcon
          slot="start"
          :icon="closeOutline"
        />
        <IonLabel> Clear filter</IonLabel>
      </IonItem>
      <IonItem
        v-for="(platform, key) in platforms"
        :key="key"
        :title="platform.value"
      >
        <IonCheckbox
          slot="start"
          :key="key"
          v-model="platform.checked"
          :checked="platform.checked"
          :value="platform.value"
          @ion-change="selectPlatform"
        />
        <IonLabel>{{ platform.value }}</IonLabel>
      </IonItem>
    </IonContent>
  </ionpopover>
</template>

<script lang="ts">
import { GameProfileFeed, GameProfile, GamePlatform } from '@/types/searchEntities';
import {
  IonContent,
  IonButton, IonIcon, CheckboxCustomEvent,
  IonItem, IonCheckbox, IonLabel, IonPopover,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { filterOutline, closeOutline } from 'ionicons/icons';

export interface PlatformFilter {
  value: string
  checked: boolean
}

export default defineComponent({
  components: {
    IonContent, IonButton, IonIcon, IonItem, IonCheckbox, IonLabel, IonPopover,
  },
  props: {
    dataList: { type: Array<GameProfile | GameProfileFeed>, required: true, default: [] },
  },
  emits: ['onFilter', 'resetFilter'],
  setup() {
    return { filterOutline, closeOutline };
  },
  data() {
    return {
      popoverOpen: false as boolean,
      platforms: [] as Array<PlatformFilter>,
    };
  },
  computed: {
    isFilterActive(): boolean {
      return this.platforms.some((platform) => platform.checked === true);
    },
  },
  watch: {
    dataList: {
      deep: true,
      handler() {
        debugger;
        this.computingPlatformFilter();
      },
    },
  },
  beforeMount() {
    this.computingPlatformFilter();
  },
  methods: {
    selectPlatform(event: CheckboxCustomEvent<GamePlatform['name']>) {
      const { checked, value } = event.detail;
      this.platforms.forEach((platform) => {
        // eslint-disable-next-line no-param-reassign
        platform.checked = false;
        // eslint-disable-next-line no-param-reassign
        if (platform.value === value) platform.checked = checked;
      });
    },
    filteringByPlatforms(): void {
      const filterPlatforms: Array<string> = [];
      this.platforms.forEach((platform) => {
        if (platform.checked) filterPlatforms.push(platform.value);
      });

      this.$emit('onFilter', filterPlatforms);
    },
    computingPlatformFilter(): void {
      this.dataList.forEach((game) => {
        game.platforms.forEach((platform) => {
          if (this.platforms.some((nestedPlatform) => nestedPlatform.value === platform.name)) {
            // if there already the name of the platform in the Array , do nothing
          } else {
            this.platforms.push({
              value: platform.name,
              checked: false,
            });
          }
        });
      });
      this.platforms.sort((a, b) => a.value.localeCompare(b.value));
    },
    closePopover(): void {
      setTimeout(() => {
        this.popoverOpen = false;
      }, 800);
    },
    resetFilter(): void {
      this.platforms.forEach((platform) => {
        // eslint-disable-next-line no-param-reassign
        platform.checked = false;
      });
      this.$emit('resetFilter');
    },
  },
});
</script>
<style scoped>
ion-item {
  cursor: pointer;
}

ion-item.disabled {
  cursor: initial;
}
</style>
