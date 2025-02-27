<template>
	<view class="content">
    <view class="space" />
    <go-captcha-uni
        type="click"
        :data="clickData"
        :config="clickConfigData"
        ref="clickRef"
        @event-click="clickEvents.click"
        @event-confirm="clickEvents.confirm"
        @event-refresh="clickEvents.refresh"
        @event-close="clickEvents.close"
    />
    <view class="space" />
    <go-captcha-uni
        type="slide"
        :data="slideData"
        :config="slideConfigData"
        ref="slideRef"
        @event-move="slideEvents.move"
        @event-confirm="slideEvents.confirm"
        @event-refresh="slideEvents.refresh"
        @event-close="slideEvents.close"
    />
    <view class="space" />
    <go-captcha-uni
        type="drag"
        :data="dragData"
        :config="dragConfigData"
        ref="dragRef"

        @event-move="dragEvents.move"
        @event-confirm="dragEvents.confirm"
        @event-refresh="dragEvents.refresh"
        @event-close="dragEvents.close"
    />
    <view class="space" />
    <go-captcha-uni
        type="rotate"
        :data="rotateData"
        :config="rotateConfigData"
        ref="rotateRef"

        @event-rotate="rotateEvents.rotate"
        @event-confirm="rotateEvents.confirm"
        @event-refresh="rotateEvents.refresh"
        @event-close="rotateEvents.close"
    />
    <view class="space" />
    <go-captcha-uni
        type="button"
        :data="{type: 'default', disabled: false}"
        :config="{title: '这是测试触发的按钮'}"
        @event-click="handleClick"
    />
    <view class="space" />
	</view>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { onReady } from '@dcloudio/uni-app'
import {
  clickImage,
  clickImage2,
  clickThumb,
  rotateImage,
  rotateThumb,
  slideImage,
  slideThumbImage
} from "../../mockdata/mockdata";

const clickRef = ref(null)

const clickData = reactive({
  image: clickImage,
  thumb: clickThumb,
})

const clickEvents = {
  click(x, y) {
    console.log("click >>>>>>>", x, y)
  },
  confirm(dots, clear) {
    console.log("dots >>>>>>>", dots)

    setTimeout(() => {
      clickRef.value.reset()
    }, 100)
  },
  refresh() {
    console.log("refresh >>>>>>>")
    clickData.image = clickImage2
  },
  close() {
    console.log("close >>>>>>>")
  },
}

const clickConfigData = reactive({
  width: 300,
  height: 220,
  // showTheme: false
})
// setTimeout(() => {
//   configData.width = 500;
//   configData.height = 500;
// }, 2000)

nextTick(() => {
  // clickRef.value
  // setTimeout(() => {
  //   // clickRef.value.reset()
  //   clickRef.value.clear()
  //   // clickRef.value.refresh()
  //   // clickRef.value.close()
  // }, 5000)
})


////////////////////////////////
const slideRef = ref(null)

const slideData = reactive({
  thumbX: 20,
  thumbY: 20,
  thumbWidth: 80,
  thumbHeight: 80,
  image: slideImage,
  thumb: slideThumbImage,
})
const slideEvents = {
  move(x, y) {
    console.log("move >>>>>>>", x, y)
  },
  refresh() {
    console.log("refresh >>>>>>>")
    slideData.thumbX = 40
    slideData.thumbY = 60
    slideData.image = clickImage2
  },
  confirm(point, reset) {
    console.log("point >>>>>>>", point)

    setTimeout(() => {
      slideRef.value.reset()
    }, 500)
  },
  close() {
    console.log("close >>>>>>>")
  }
}

const slideConfigData = reactive({
  width: 300,
  height: 220,
  scope: true,
})

// setTimeout(() => {
//   slideConfigData.width = 500;
//   slideConfigData.height = 500;
// }, 2000)

nextTick(() => {
  // setTimeout(() => {
  //   // slideRef.value.reset()
  //   slideRef.value.clear()
  //   // slideRef.value.refresh()
  //   // slideRef.value.close()
  // }, 5000)
})


/////////////////////////////////
const dragRef = ref(null)
const dragData = reactive({
  thumbX: 20,
  thumbY: 20,
  thumbWidth: 80,
  thumbHeight: 80,
  image: slideImage,
  thumb: slideThumbImage,
})
const dragEvents = {
  move(x, y) {
    console.log("move >>>>>>>", x, y)
  },
  refresh() {
    console.log("refresh >>>>>>>")

    dragData.thumbX = 40
    dragData.thumbY = 60
    dragData.image = clickImage2
  },
  confirm(point, reset) {
    console.log("point >>>>>>>", point)

    setTimeout(() => {
      dragRef.value.reset()
    }, 1000)
  },
  close() {
    console.log("close >>>>>>>")
  }
}

const dragConfigData = reactive({
  width: 300,
  height: 220,
  scope: true,
})
// setTimeout(() => {
//   dragConfigData.width = 500;
//   dragConfigData.height = 500;
// }, 2000)

nextTick(() => {
  setTimeout(() => {
    // dragRef.value.reset()
    // dragRef.value.clear()
    // dragRef.value.refresh()
    // dragRef.value.close()
  }, 5000)
})

/////////////////////////////////
const rotateRef = ref(null)
const rotateData = reactive({
  image: rotateImage,
  thumb: rotateThumb,
  thumbSize: 195,
})
const rotateEvents = {
  rotate(angle) {
    console.log("rotate >>>>>>>", angle)
  },
  refresh() {
    console.log("refresh >>>>>>>")
    rotateData.image = clickImage2
  },
  confirm(angle, reset) {
    console.log("angle >>>>>>>", angle)

    setTimeout(() => {
      rotateRef.value.reset()
    }, 1000)
  },
  close() {
    console.log("close >>>>>>>")
  }
}

const rotateConfigData = reactive({
  width: 300,
  height: 220,
  scope: true,
})
// setTimeout(() => {
//   rotateConfigData.width = 500;
//   rotateConfigData.height = 500;
// }, 2000)

nextTick(() => {
  // setTimeout(() => {
  //   // rotateRef.value.reset()
  //   rotateRef.value.clear()
  //   // rotateRef.value.refresh()
  //   // rotateRef.value.close()
  // }, 5000)
})

//////////////////////////////////

const handleClick = () => {
  console.log('------hello')
}

onReady(() => {
  console.log('onReady')
})
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
    margin-top: 30px;
    background: #f5f5f5;
	}

  .space {
    height: 30px;
  }
</style>
