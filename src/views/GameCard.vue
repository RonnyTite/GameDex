<template>
    <div>{{ game }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GiantBombApi from '../scripts/GiantBombApi';

export default defineComponent({
  data() {
    return {
      game_id: this.$route.params.game_id as string,
    };
  },
  beforeMount() {
    GiantBombApi.fetchGameProfile(this.game_id)
      .then(() => { })
      .catch(() => { });
  },
});
</script>
