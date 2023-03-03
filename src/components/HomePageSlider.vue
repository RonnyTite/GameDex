<template>
  <!-- https://swiperjs.com/demos#effect-flip -->
  <!-- Other possible choices https://swiperjs.com/demos#effect-cards https://swiperjs.com/demos#effect-coverflow -->
  <Swiper
    v-if="dataList.length >0"
    :effect="'flip'"
    :grab-cursor="true"
    :pagination="true"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
    <SwiperSlide
      v-for="(game, index) in dataList"
      :key="index"
      @click="$emit('open-gamecard', game)"
    >
      <div
        class="card-content-thumbnail"
        :style="{'background' : `url(${game.image.small_url})`}"
      />
    </SwiperSlide>
  </Swiper>
</template>
<script lang="ts">
// Import Swiper Vue.js components
/* eslint-disable import/no-extraneous-dependencies */
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectFlip, Pagination, Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css';
// import required modules
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { defineComponent } from 'vue';
import { GameProfileFeed } from '../types/searchEntities.d';

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    dataList: { type: Array<GameProfileFeed>, required: true, default: [] },
  },
  emits: ['open-gamecard'],
  setup() {
    return {
      modules: [EffectFlip, Pagination, Navigation],
    };
  },

});
</script>
<style>
.swiper {
  width: 300px;
  height: 470px;
}

.card-content-thumbnail{
    height: 100%;
    background-size: contain!important;
    background-position: center!important;
    background-repeat: no-repeat!important;
}
.swiper-button-prev,
.swiper-button-next {
    color:#ececec;
    box-shadow: 0 0 11px rgba(33, 33, 33, .2);
}

</style>
