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
    @did-dismiss="popoverOpen = false"
  >
    <IonContent>
      <IonItem
        :class="{'disabled':!isFilterActive}"
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
      >
        <IonCheckbox
          slot="start"
          :key="key"
          :value="platform.value"
          @ion-change="filteringByPlatforms"
        />
        <IonLabel>{{ platform.value }}</IonLabel>
      </IonItem>
    </IonContent>
  </ionpopover>
</template>
<script setup lang="ts">

import { GameProfileFeed, GamePlatform } from '@/types/searchEntities';
import {
  IonContent,
  IonButton, IonIcon, CheckboxCustomEvent,
  IonItem, IonCheckbox, IonLabel, IonPopover,
} from '@ionic/vue';

import {
  withDefaults, ref, reactive, onBeforeMount, computed,
} from 'vue';

import { filterOutline, closeOutline } from 'ionicons/icons';

export interface PlatformFilter {
  value: string
  checked: boolean
}
interface Props {
  dataList: Array<GameProfileFeed> | never,
}

const props = withDefaults(defineProps<Props>(), {
  dataList: () => [],
});

const popoverOpen = ref(false);
let platforms: Array<PlatformFilter> = reactive([]);
const isFilterActive = computed(() => platforms.some((platform) => platform.checked === true));

//  https://vuejs.org/guide/typescript/composition-api.html#typing-component-emits
// eslint-disable-next-line no-spaced-func
const emit = defineEmits<{
  (e: 'onFilter', platformsList: Array<string>): void
  (e: 'resetFilter'): void
}>();

function filteringByPlatforms(event: CheckboxCustomEvent<GamePlatform['abbreviation']>): void {
  const { value, checked } = event.detail;

  const platformName = value;
  const filterPlatforms: Array<string> = [];
  platforms.forEach((platform) => {
    if (platform.value === platformName) {
      // eslint-disable-next-line no-param-reassign
      platform.checked = checked;
      if (platform.checked) filterPlatforms.push(platformName);
    } else {
      // eslint-disable-next-line no-param-reassign
      platform.checked = false;
    }
  });

  if (platforms.some((platform) => platform.checked === true)) {
    emit('onFilter', filterPlatforms);
  } else {
    emit('resetFilter');
  }

  setTimeout(() => {
    popoverOpen.value = false;
  }, 800);
}
function computingPlatformFilter():Array<PlatformFilter> {
  const filteredPlatforms:Array<PlatformFilter> = [];
  props.dataList.forEach((game) => {
    game.platforms.forEach((platform) => {
      if (filteredPlatforms.some((nestedPlatform) => nestedPlatform.value === platform.name)) {
        // if there already the name of the platform in the Array , do nothing
      } else {
        platforms.push({
          value: platform.name,
          checked: false,
        });
      }
    });
  });
  filteredPlatforms.sort((a, b) => a.value.localeCompare(b.value));
  return filteredPlatforms;
}

function resetFilter(): void {
  platforms.forEach((platform) => {
    // eslint-disable-next-line no-param-reassign
    platform.checked = false;
  });
  emit('resetFilter');
}

onBeforeMount(() => {
  platforms = computingPlatformFilter();
});

defineExpose({
  filteringByPlatforms,
  computingPlatformFilter,
  resetFilter,
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
