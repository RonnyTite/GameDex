<template>
    <div>{{ game }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AxiosResponse } from 'axios';
import { CompleteGameProfile } from '../types/searchEntities.d';
import GiantBombApi from '../scripts/GiantBombApi';

export default defineComponent({
  data() {
    return {
      game: {} as CompleteGameProfile,
      game_id: this.$route.params.game_id as string,
    };
  },
  beforeMount() {
    GiantBombApi.fetchGameProfile(this.game_id)
      .then((results:AxiosResponse<CompleteGameProfile>) => {
        debugger;
        this.game = results.data;
      })
      .catch(() => { });
  },
});
</script>
