<template>
    <IonSearchbar
    :search-icon="searchCircle"
    :animated="true"
    placeholder="Search Here"
    :debounce="500"
    class="search-bar"
    @ionChange="emitSearch($event.detail)"
    @ionClear="clear"
    ></IonSearchbar>
  </template>

<script lang="ts">
import { IonSearchbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { searchCircle } from 'ionicons/icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SearchbarChangeEventDetail } from '@ionic/core';
/**
 * @see https://ionicframework.com/docs/api/searchbar
 */
export default defineComponent({
  name: 'SearchBar',
  components: { IonSearchbar },
  setup() {
    return { searchCircle };
  },
  methods: {
    emitSearch(searchedValue:SearchbarChangeEventDetail):void {
      this.$emit('on-search', searchedValue.value);
    },
    clear():void {
      this.$emit('clear');
    },
  },
});
</script>
