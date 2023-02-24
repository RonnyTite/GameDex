<template>
    <IonSearchbar
    :search-icon="searchCircle"
    :animated="true"
    placeholder="Search Here"
    :debounce="1000"
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

// http://www.giantbomb.com/api/search/?api_key=<API_KEY>&limit=30&format=json&query=&resources=game&field_list='number_of_total_results,deck,id,developers,genres,expected_release_quarter,expected_release_year,name,platforms,genre,releases,images,original_release_date,image,api_detail_url';
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
