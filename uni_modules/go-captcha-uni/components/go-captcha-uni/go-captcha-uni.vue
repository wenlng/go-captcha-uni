// #ifdef VUE3
<template>
  <template v-if="props.type.toLocaleString() === 'click'">
    <click ref="clickRef" :config="props.config" :events="props.events" :data="props.data" :theme="props.theme"></click>
  </template>
  <template v-else-if="props.type.toLocaleString() === 'slide'">
    <slide ref="slideRef" :config="props.config" :events="props.events" :data="props.data" :theme="props.theme"></slide>
  </template>
  <template v-else-if="props.type.toLocaleString() === 'drag'">
    <drag ref="dragRef" :config="props.config" :events="props.events" :data="props.data" :theme="props.theme"></drag>
  </template>
  <template v-else-if="props.type.toLocaleString() === 'rotate'">
    <rotate ref="rotateRef" :config="props.config" :events="props.events" :data="props.data" :theme="props.theme"></rotate>
  </template>
  <template v-else-if="props.type.toLocaleString() === 'button'">
    <btn ref="buttonRef" :config="props.config" :events="props.events" :data="props.data" :theme="props.theme"></btn>
  </template>
</template>

<script setup>
import { ref } from 'vue'

import click from '../click/index.vue'
import slide from '../slide/index.vue'
import drag from '../drag/index.vue'
import rotate from '../rotate/index.vue'
import btn from '../button/index.vue'

const clickRef = ref(null)
const slideRef = ref(null)
const dragRef = ref(null)
const rotateRef = ref(null)
const buttonRef = ref(null)

const props = defineProps({
  type: {
    default: 'click',
    validator: (value) => {
      return ['click', 'slide', 'drag', 'rotate', 'button'].includes(value)
    }
  },
  config: {
    default: () => ({})
  },
  events: {
    default: () => ({})
  },
  data: {
    default: () => ({})
  },
  theme: {
    default: () => ({})
  },
})

const handleCbs = (fnName) => {
  if (props.type === 'click') {
    clickRef.value && clickRef.value[fnName]  && clickRef.value[fnName]()
  } else if (props.type === 'slide') {
    slideRef.value && slideRef.value[fnName]  && slideRef.value[fnName]()
  } else if (props.type === 'drag') {
    dragRef.value && dragRef.value[fnName]  && dragRef.value[fnName]()
  } else if (props.type === 'rotate') {
    rotateRef.value && rotateRef.value[fnName]  && rotateRef.value[fnName]()
  } else if (props.type === 'button') {
    buttonRef.value && buttonRef.value[fnName]  && buttonRef.value[fnName]()
  }
}

const makeCbsFnWithName = (fnName) => {
  return () => {
    return handleCbs(fnName)
  }
}

defineExpose({
  reset: makeCbsFnWithName('reset'),
  clear: makeCbsFnWithName('clear'),
  refresh: makeCbsFnWithName('refresh'),
  close: makeCbsFnWithName('close'),
});
</script>
// #endif


// #ifndef VUE3
<template>
  <click v-if="type.toLocaleString() === 'click'" ref="clickRef" :config="config" :events="events" :data="data"></click>

  <slide v-else-if="type.toLocaleString() === 'slide'" ref="slideRef" :config="config" :events="events" :data="data"></slide>

  <drag v-else-if="type.toLocaleString() === 'drag'" ref="dragRef" :config="config" :events="events" :data="data"></drag>

  <rotate v-else-if="type.toLocaleString() === 'rotate'" ref="rotateRef" :config="config" :events="events" :data="data"></rotate>

  <btn v-else-if="type.toLocaleString() === 'button'" ref="buttonRef" :config="config" :events="events" :data="data"></btn>
</template>

<script>
import click from '../../vue2/components/click'
import slide from '../../vue2/components/slide'
import drag from '../../vue2/components/drag'
import rotate from '../../vue2/components/rotate'
import btn from '../../vue2/components/button'

export default {
  name: 'go-captcha-uni',
  props: {
    type:{
      default: 'click',
      validator: (value) => {
        return ['click', 'slide', 'drag', 'rotate', 'button'].includes(value)
      }
    },
    config: {
      default: () => ({})
    },
    events: {
      default: () => ({})
    },
    data: {
      default: () => ({})
    },
  },
  data() {
    return {}
  },
  components:{
    click,
    slide,
    drag,
    rotate,
    btn
  },
  methods: {
    _handleCbs(fnName){
      if (this.type === 'click') {
        this.$refs.clickRef && this.$refs.clickRef[fnName]  && this.$refs.clickRef[fnName]()
      } else if (this.type === 'slide') {
        this.$refs.slideRef && this.$refs.slideRef[fnName]  && this.$refs.slideRef[fnName]()
      } else if (this.type === 'drag') {
        this.$refs.dragRef && this.$refs.dragRef[fnName]  && this.$refs.dragRef[fnName]()
      } else if (this.type === 'rotate') {
        this.$refs.rotateRef && this.$refs.rotateRef[fnName]  && this.$refs.rotateRef[fnName]()
      } else if (this.type === 'button') {
        this.$refs.buttonRef && this.$refs.buttonRef[fnName]  && this.$refs.buttonRef[fnName]()
      }
    },
    reset: () => {
      return this._handleCbs('reset')
    },
    clear: () => {
      return this._handleCbs('clear')
    },
    refresh: () => {
      return this._handleCbs('refresh')
    },
    close: () => {
      return this._handleCbs('close')
    },
  }
}

</script>
// #endif

<style>
</style>
