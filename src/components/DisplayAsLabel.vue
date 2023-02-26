<template>
  <ul
    v-if="labelList.length > 0"
    class="gameCard__platforms"
  >
    <li
      v-for="(label,key) in lexicallySortedList"
      :key="key"
      class="gameCard__platform-name font__pixel "
    >
      {{ label.abbreviation }}
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
.gameCard__platform-name {
  color: #fff;
  text-transform: uppercase;
  font-size: 0.7rem;
}
</style>
