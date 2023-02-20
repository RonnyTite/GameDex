<template>
    <IonSearchbar
    :search-icon="searchCircle"
    :animated="true"
    placeholder="Search Here"
    :debounce="500"
    @ionChange="$event.detail.value ? $emit('on-search',$event.detail) : () => {}"
    @ionClear="$emit('clear',$event)"
    ></IonSearchbar>
  </template>

<script lang="ts">
import { IonSearchbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { searchCircle } from 'ionicons/icons';
/**
 * @see https://ionicframework.com/docs/api/searchbar
 */
export default defineComponent({
  name: 'SearchBar',
  components: { IonSearchbar },
  setup() {
    return { searchCircle };
  },
});
</script>
