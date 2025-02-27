<template>
  <view
    :class="{'go-captcha': true, 'gc-wrapper': true, 'gc-theme': localConfig.showTheme}"
    :style="[wrapperStyles]"
    v-show="hasDisplayWrapperState"
  >
    <view class="gc-header gc-header2">
      <text class="gc-text" :style="[{color: localTheme.textColor}]">{{ localConfig.title }}</text>
      <view class="gc-icon-block">

      </view>
    </view>
    <view
      class="gc-body"
      :id="`gc-drag-container-${ukey}`"
      :style="[imageStyles, {backgroundColor: localTheme.bodyBgColor}]"
      @touchmove.stop.prevent="dragMove"
      @mousemove.stop.prevent="mouseMove"
    >
      <view class="gc-loading">
        <view class="gc-loading-icon" :style="[{backgroundColor: localTheme.loadingIconColor}]"/>
      </view>
      <image
        class="gc-picture"
        v-show="hasDisplayImageState"
        :style="[imageStyles]"
        :src="localData.image"
        alt=""
      />
      <view
        class="gc-tile"
        :id="`gc-drag-tile-${ukey}`"
        :style="[thumbStyles]"
      >
        <image
          class="gc-img"
          v-show="hasDisplayThumbImageState"
          :src="localData.thumb"
          @dragstart.stop.prevent="(e)=> {e.preventDefault();return false;}"
          @touchstart.stop.prevent="dragStart"
          @touchend="dragEnd"
          @mousedown.stop.prevent="mouseDown"
          @mouseup.stop.prevent="mouseUp"
          @mouseleave="mouseLeave"
          alt=""
        />
      </view>
    </view>
    <view class="gc-footer">
      <view class="gc-icon-block">
        <view
            class="gc-icon icon-close-icon"
            :style="[{fontSize: localConfig.iconSize + 'px', color: localTheme.iconColor}]"
            @click="closeEvent"
        ></view>
        <view
            class="gc-icon icon-refresh-icon"
            :style="[{fontSize: localConfig.iconSize + 'px', color: localTheme.iconColor}]"
            @click="refreshEvent"
        ></view>
      </view>
    </view>
  </view>
</template>

<script>
import {defaultConfig, defaultDragData, defaultThemeColors} from "../../../components/drag/meta/default";
import {getXY} from "../../../helper/helper";

import '../../../assets/icons/style.css'

const systemInfo = uni.getSystemInfoSync();
const isPcBrowser = systemInfo.model && systemInfo.model.toUpperCase() === 'PC'

export default {
  name: 'go-captcha-uni-drag',
  props: {
    config: {
      default: () => defaultConfig()
    },
    data: {
      default: () => defaultDragData()
    },
    theme: {
      default: () => defaultThemeColors()
    },
  },
  data() {
    return {
      localData: {...defaultDragData(), ...this.data},
      localConfig: {...defaultConfig(), ...this.config},
      localTheme: {...defaultThemeColors(), ...this.theme},

      ukey: (new Date()).getMilliseconds(),
      state: {
        x: this.data.thumbX || 0,
        y: this.data.thumbY || 0,
        isFreeze: false
      },
      caches: {
        isStarting: false,
        isMoving: false,
        startX: 0,
        startY: 0,
        tileLeft: 0,
        tileTop: 0,
        maxWidth: 0,
        maxHeight: 0,
      }
    }
  },
  watch: {
    data:{
      handler(newData, oldVal){
        Object.assign(this.localData, newData)

        if(!this.state.isFreeze){
          this.state.x = newData.thumbX || 0
          this.state.y = newData.thumbY || 0
        }
      },
      deep: true,
      immediate: true,
    },
    config:{
      handler(newData, oldVal){
        Object.assign(this.localConfig, newData)
      },
      deep: true,
      immediate: true,
    },
    theme:{
      handler(newData, oldVal){
        Object.assign(this.localTheme, newData)
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    wrapperStyles(){
      const hPadding = this.localConfig.horizontalPadding || 0
      const vPadding = this.localConfig.verticalPadding || 0
      const width = (this.localConfig.width || 0) + ( hPadding * 2) + (this.localConfig.showTheme ? 2 : 0)

      return {
        width:  width+ "px",
        paddingLeft: hPadding + "px",
        paddingRight: hPadding + "px",
        paddingTop: vPadding + "px",
        paddingBottom: vPadding + "px",
      }
    },
    thumbStyles(){
      return {
        width: this.localData.thumbWidth + "px",
        height: this.localData.thumbHeight + "px",
        top: this.state.y + "px",
        left: this.state.x + "px"
      }
    },
    imageStyles(){
      return {
        width: this.localConfig.width + "px",
        height: this.localConfig.height + "px"
      }
    },
    hasDisplayImageState(){
      return this.localData.image && this.localData.image.length > 0
    },
    hasDisplayThumbImageState(){
      return this.localData.thumb && this.localData.thumb.length > 0
    },
    hasDisplayWrapperState(){
      return (this.localConfig.width || 0) > 0 || (this.localConfig.height || 0) > 0
    }
  },
  methods: {
    handleStart(e){
      const xy = getXY(e)
      const clientX = xy.x
      const clientY = xy.y

      try{
        const query = uni.createSelectorQuery().in(this);
        query.select(`#gc-drag-container-${this.ukey}`).boundingClientRect(cdata => {
          const query1 = uni.createSelectorQuery().in(this);
          query1.select(`#gc-drag-tile-${this.ukey}`).boundingClientRect(tdata => {
            this.handleDragStart(clientX, clientY, cdata, tdata)
          }).exec();
        }).exec();
      } catch (e) {
        console.warn(`gocaptcha boundingClientRect err`, e)
      }

      this.state.isFreeze = true
      this.caches.isStarting = true
      e.preventDefault()
      e.stopPropagation()
    },
    handleDragStart(clientX, clientY, cdata, tdata){
      const offsetLeft = tdata.left - cdata.left
      const offsetTop = tdata.top - cdata.top
      const width = cdata.width
      const height = cdata.height
      const tileWith  = tdata.width
      const tileHeight  = tdata.height

      this.caches.tileOffsetLeft = tdata.left - cdata.left
      this.caches.maxWidth = width - tileWith
      this.caches.maxHeight = height - tileHeight
      this.caches.startX = clientX - offsetLeft
      this.caches.startY = clientY - offsetTop
    },
    handleMove(e){
      if (!this.caches.isStarting) {
        return
      }
      this.caches.isMoving = true
      const xy = getXY(e)
      const clientX = xy.x
      const clientY = xy.y

      let left = clientX - this.caches.startX
      let top = clientY - this.caches.startY

      if (left <= 0) {
        left = 0
      }

      if (top <= 0) {
        top = 0
      }

      if (left >= this.caches.maxWidth) {
        left = this.caches.maxWidth
      }

      if (top >= this.caches.maxHeight) {
        top = this.caches.maxHeight
      }

      this.state.x = left
      this.state.y = top
      this.caches.tileLeft = left
      this.caches.tileTop = top

      this.$emit('event-move', left, top)

      e.cancelBubble = true
      e.preventDefault()
      e.stopPropagation()
      return false
    },
    handleEnd(e){
      this.caches.isStarting = false

      if (!this.caches.isMoving) {
        return
      }

      this.caches.isMoving = false
      this.state.isFreeze = false

      if (this.caches.tileLeft < 0 || this.caches.tileTop < 0) {
        return
      }

      this.$emit('event-confirm', {x: this.caches.tileLeft, y: this.caches.tileTop}, () => {
        this.resetData()
      })

      e.cancelBubble = true
      e.preventDefault()
      e.stopPropagation()
    },

    dragStart(e){
      if (isPcBrowser) return
      this.handleStart(e)
      return false
    },
    dragMove(e){
      if (isPcBrowser) return
      this.handleMove(e)
      return false
    },
    dragEnd(e){
      if (isPcBrowser) return
      this.handleEnd(e)
      return false
    },
    mouseDown(e){
      if (!isPcBrowser) return
      this.handleStart(e)
      return false
    },
    mouseMove(e){
      if (!isPcBrowser) return
      this.handleMove(e)
      return false
    },
    mouseUp(e){
      if (!isPcBrowser) return
      this.handleEnd(e)
      return false
    },
    mouseLeave(e) {
      if (!isPcBrowser) return
      this.handleEnd(e)
    },

    closeEvent(e) {
      this.close()
      e.cancelBubble = true
      e.preventDefault()
      return false
    },
    refreshEvent(e) {
      this.refresh()
      e.cancelBubble = true
      e.preventDefault()
      return false
    },

    close() {
      this.$emit('event-close')
      this.resetData()
    },
    refresh(){
      this.$emit('event-refresh')
      this.resetData()
    },
    resetData (){
      this.state.x = this.localData.thumbX || 0
      this.state.y = this.localData.thumbY || 0
    },
    clearData() {
      this.resetData()
      this.localData.thumb = ''
      this.localData.image = ''
      this.localData.thumbX = 0
      this.localData.thumbY = 0
      this.localData.thumbWidth = 0
      this.localData.thumbHeight = 0
    },
    reset() {
      this.resetData()
    },
    clear() {
      this.clearData()
    },
  }
}
</script>

<style>
@import '../../../assets/css/gocaptcha.css';

.go-captcha .gc-header2 {
  text-align: center;
}

.go-captcha .gc-tile {
  position: absolute;
  z-index: 2;
  cursor: pointer;
}
.go-captcha .gc-tile .gc-img {
  display: block;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

</style>
