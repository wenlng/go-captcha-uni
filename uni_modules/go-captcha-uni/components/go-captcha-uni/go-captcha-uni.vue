// #ifdef VUE3
<template>
  <template v-if="props.type.toLocaleString() === 'click'">
    <click
      ref="clickRef"
      :config="props.config"
      :events="props.events"
      :data="props.data"
      :theme="props.theme"

      @event-click="emitClick"
      @event-confirm="emitConfirm"
      @event-refresh="emitRefresh"
      @event-close="emitClose"
    ></click>
  </template>
  <template v-else-if="props.type.toLocaleString() === 'slide'">
    <slide
      ref="slideRef"
      :config="props.config"
      :events="props.events"
      :data="props.data"
      :theme="props.theme"

      @event-move="emitMove"
      @event-confirm="emitConfirm"
      @event-refresh="emitRefresh"
      @event-close="emitClose"
    ></slide>
  </template>
  <template v-else-if="props.type.toLocaleString() === 'drag'">
    <drag
      ref="dragRef"
      :config="props.config"
      :events="props.events"
      :data="props.data"
      :theme="props.theme"

      @event-move="emitMove"
      @event-confirm="emitConfirm"
      @event-refresh="emitRefresh"
      @event-close="emitClose"
    ></drag>
  </template>
  <template v-else-if="props.type.toLocaleString() === 'rotate'">
    <rotate
      ref="rotateRef"
      :config="props.config"
      :events="props.events"
      :data="props.data"
      :theme="props.theme"

      @event-rotate="emitRotate"
      @event-confirm="emitConfirm"
      @event-refresh="emitRefresh"
      @event-close="emitClose"
    ></rotate>
  </template>
  <template v-else-if="props.type.toLocaleString() === 'button'">
    <btn
      ref="buttonRef"
      :config="props.config"
      :events="props.events"
      :data="props.data"
      :theme="props.theme"
      @event-click="emitClick"
    ></btn>
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


const emit = defineEmits([
  'event-click',
  'event-move',
  'event-rotate',
  'event-confirm',
  'event-refresh',
  'event-close',
]);
const emitClick = (...arg) => {
  emit('event-click', ...arg)
}

const emitMove = (...arg) => {
  emit('event-move', ...arg)
}

const emitRotate = (...arg) => {
  emit('event-rotate', ...arg)
}

const emitConfirm = (...arg) => {
  emit('event-confirm', ...arg)
}

const emitRefresh = () => {
  emit('event-refresh')
}

const emitClose = () => {
  emit('event-close')
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
  <click
    v-if="type.toLocaleString() === 'click'"
    ref="clickRef"
    :config="config"
    :data="data"
    :theme="theme"

    @event-click="emitClick"
    @event-confirm="emitConfirm"
    @event-refresh="emitRefresh"
    @event-close="emitClose"
  ></click>

  <slide
    v-else-if="type.toLocaleString() === 'slide'"
    ref="slideRef"
    :config="config"
    :data="data"
    :theme="theme"

    @event-move="emitMove"
    @event-confirm="emitConfirm"
    @event-refresh="emitRefresh"
    @event-close="emitClose"
  ></slide>

  <drag
    v-else-if="type.toLocaleString() === 'drag'"
    ref="dragRef"
    :config="config"
    :data="data"
    :theme="theme"

    @event-move="emitMove"
    @event-confirm="emitConfirm"
    @event-refresh="emitRefresh"
    @event-close="emitClose"
  ></drag>

  <rotate
    v-else-if="type.toLocaleString() === 'rotate'"
    ref="rotateRef"
    :config="config"
    :data="data"
    :theme="theme"

    @event-rotate="emitRotate"
    @event-confirm="emitConfirm"
    @event-refresh="emitRefresh"
    @event-close="emitClose"
  ></rotate>

  <btn
    v-else-if="type.toLocaleString() === 'button'"
    ref="buttonRef"
    :config="config"
    :data="data"
    :theme="theme"

    @event-click="emitClick"
  ></btn>
</template>

<script>
import click from '../../vue2/components/click/index.vue'
import slide from '../../vue2/components/slide/index.vue'
import drag from '../../vue2/components/drag/index.vue'
import rotate from '../../vue2/components/rotate/index.vue'
import btn from '../../vue2/components/button/index.vue'

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
    data: {
      default: () => ({})
    },
    theme: {
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

    reset(){
      return this._handleCbs('reset')
    },
    clear(){
      return this._handleCbs('clear')
    },
    refresh(){
      return this._handleCbs('refresh')
    },
    close(){
      return this._handleCbs('close')
    },

    emitMove(...arg) {
      this.$emit('event-move', ...arg)
    },
    emitClick(...arg) {
      this.$emit('event-click', ...arg)
    },
    emitRotate(...arg) {
      this.$emit('event-rotate', ...arg)
    },
    emitConfirm(...arg) {
      this.$emit('event-confirm', ...arg)
    },
    emitRefresh() {
      this.$emit('event-refresh')
    },
    emitClose() {
      this.$emit('event-close')
    },
  }
}

</script>
// #endif
