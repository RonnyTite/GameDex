<template>
  <ul
    v-if="labelList.length > 0"
    class="gameCard__platforms"
    :class="{'small-label' : abbreviation}"
  >
    <li
      v-for="(label,key) in lexicallySortedList"
      :key="key"
      class="gameCard__platform-name font__pixel ion-text-uppercase"
    >
      {{ abbreviation ? label.abbreviation : label.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GamePlatform } from '../types/searchEntities';

export default defineComponent({
  name: 'DisplayAsLabel',
  props: {
    labelList: { type: Array<GamePlatform>, required: false, default: [] },
    abbreviation: { type: Boolean, required: false, default: true },
  },
  computed: {
    lexicallySortedList():Array<GamePlatform> {
      const sortedList = [...this.labelList];
      return sortedList.sort((a, b) => a.abbreviation.localeCompare(b.abbreviation));
    },
  },
});
</script>
<style scoped>
.gameCard__platforms {
  padding: 0;
}
.gameCard__platforms.small-label {
  padding: 0;
  margin: 4px 0;
}
.gameCard__platforms li {
  background-color: #cfa192;
  box-sizing: border-box;
  display: inline-block;
  height: 25px;
  margin-bottom: 10px;
  margin-right: 7px;
  padding: 8px 10px;
  width: auto;
  line-height: 9px;
}

.gameCard__platforms.small-label  li {
    height: 20px;
    padding: 5px ;
    line-height: 9px;
}

.gameCard__platform-name {
  color: #fff;
  font-size: 0.7rem;
}
</style>
