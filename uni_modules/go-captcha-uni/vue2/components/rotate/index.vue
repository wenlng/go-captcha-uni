<template>
  <view
      :class="{'go-captcha': true, 'gc-wrapper': true, 'gc-theme': localConfig.showTheme}"
      :style="[wrapperStyles]"
      v-show="hasDisplayWrapperState"
  >
    <view class="gc-header">
      <text class="gc-text" :style="[{color: localTheme.textColor}]">{{ localConfig.title }}</text>
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
    <view
        class="gc-body gc-rotate-body"
        :id="`gc-rotate-container-${ukey}`"
        :style="[imageBlockStyles]"
    >
      <view class="gc-body-inner" :style="[imageStyles, {backgroundColor: localTheme.bodyBgColor}]">
        <view class="gc-loading">
          <view class="gc-loading-icon" :style="[{backgroundColor: localTheme.loadingIconColor}]"/>
        </view>
        <view
            class="gc-picture gc-rotate-picture"
            :style="[imageStyles]"
        >
          <image
              class="gc-img"
              v-show="hasDisplayImageState"
              :src="localData.image"
              alt=""
          />
          <view class="gc-round" :style="[{borderColor: localTheme.roundColor}]" />
        </view>

        <view class="gc-thumb gc-rotate-thumb">
          <view class="gc-rotate-thumb-block" :style="[thumbStyles]">
            <image
                class="gc-img"
                v-show="hasDisplayThumbImageState"
                :src="localData.thumb"
                alt=""
            />
          </view>
        </view>
      </view>
    </view>
    <view class="gc-footer">
      <view class="gc-drag-slide-bar"
            :id="`gc-rotate-drag-bar-${ukey}`"
            @touchmove.stop.prevent="dragMove"
            @mousemove.stop.prevent="mouseMove"
            @mouseleave="mouseLeave"
      >
        <view class="gc-drag-line" :style="[{backgroundColor: localTheme.dragBarColor}]"/>
        <view
            class="gc-drag-block"
            :class="{'disabled': !hasDisplayImageState}"
            :id="`gc-rotate-drag-block-${ukey}`"
            :style="[{left: state.dragLeft + 'px', backgroundColor: localTheme.dragBgColor}]"
            @touchstart.stop.prevent="dragStart"
            @touchend="dragEnd"
            @mousedown.stop.prevent="mouseDown"
            @mouseup="mouseUp"
        >
          <view
              class="gc-icon icon-arrows-icon"
              :style="[{fontSize: localConfig.iconSize + 'px', color: localTheme.dragIconColor}]"
          ></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {defaultConfig, defaultThemeColors, defaultRotateData} from "../../../components/rotate/meta/default";

import '../../../assets/icons/style.css'
import {getXY} from "../../../helper/helper";

const systemInfo = uni.getSystemInfoSync();
const isPcBrowser = systemInfo.model && systemInfo.model.toUpperCase() === 'PC'

export default {
  name: 'go-captcha-uni-rotate',
  props: {
    config: {
      default: () => defaultConfig()
    },
    data: {
      default: () => defaultRotateData()
    },
    theme: {
      default: () => defaultThemeColors()
    },
  },
  data() {
    return {
      localData: {...defaultRotateData(), ...this.data},
      localConfig: {...defaultConfig(), ...this.config},
      localTheme: {...defaultThemeColors(), ...this.theme},

      ukey: (new Date()).getMilliseconds(),
      state: {
        dragLeft: 0,
        thumbAngle: this.data.angle || 0,
        isFreeze: false
      },
      caches: {
        isStarting: false,
        isMoving: false,
        startX: 0,
        currentThumbX: 0,
        maxWidth: 0,
        tileOffsetLeft: 0,
        currentAngle: 0,
        angle: 0,
        maxAngle: 360,
        ratio: 0,
      }
    }
  },
  watch: {
    data:{
      handler(newData, oldVal){
        Object.assign(this.localData, newData)

        if(!this.state.isFreeze){
          this.state.thumbAngle = newData.angle || 0
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
        transform: `rotate(${this.state.thumbAngle}deg)`,
        ...(this.localData.thumbSize > 0 ? {
          width: this.localData.thumbSize + "px",
          height: this.localData.thumbSize + "px"
        } : {})
      }
    },
    imageBlockStyles(){
      return {
        width: this.localConfig.width + "px",
        height: this.localConfig.height + "px"
      }
    },
    imageStyles(){
      const size = (this.localConfig.size || 0) > 0 ? this.localConfig.size : defaultConfig().size
      return {
        width: size  + "px",
        height: size + "px"
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

      try{
        const query = uni.createSelectorQuery().in(this);
        query.select(`#gc-rotate-container-${this.ukey}`).boundingClientRect(cdata => {
          const query1 = uni.createSelectorQuery().in(this);
          query1.select(`#gc-rotate-tile-${this.ukey}`).boundingClientRect(tdata => {
            this.handleDragStart(clientX, cdata, tdata)
          }).exec();
        }).exec();
      } catch (e) {
        console.warn(`gocaptcha boundingClientRect err`, e)
      }

      this.state.isFreeze = true
      this.caches.isStarting = true
    },
    handleDragStart(clientX, cdata, tdata){
      try{
        const query = uni.createSelectorQuery().in(this);
        query.select(`#gc-rotate-drag-bar-${this.ukey}`).boundingClientRect(dbdata => {
          const query1 = uni.createSelectorQuery().in(this);
          query1.select(`#gc-rotate-drag-block-${this.ukey}`).boundingClientRect(bddata => {
            const offsetLeft = bddata.left - dbdata.left
            const blockWidth = bddata.width
            const width = cdata.width

            this.caches.maxWidth = width - blockWidth
            this.caches.angle = 0
            this.caches.currentAngle = 0
            this.caches.startX = clientX - offsetLeft
            this.caches.ratio = (this.caches.maxAngle - this.localData.angle) / this.caches.maxWidth
          }).exec();
        }).exec();
      } catch (e) {
        console.warn(`gocaptcha boundingClientRect err`, e)
      }
    },
    handleMove(e){
      if (!this.caches.isStarting) {
        return
      }
      this.caches.isMoving = true

      const xy = getXY(e)
      const clientX = xy.x

      let left = clientX - this.caches.startX

      this.caches.angle = this.localData.angle + (left * this.caches.ratio)

      if (left >= this.caches.maxWidth) {
        this.state.dragLeft = this.caches.maxWidth
        this.state.thumbAngle = this.caches.currentAngle = this.caches.maxAngle
        return
      }

      if (left <= 0) {
        this.state.dragLeft = 0
        this.state.thumbAngle = this.caches.currentAngle = this.localData.angle
        return
      }

      this.state.dragLeft = left
      this.state.thumbAngle = this.caches.currentAngle = this.caches.angle

      this.$emit('event-rotate', this.caches.angle)

      e.cancelBubble = true
      e.preventDefault()
    },
    handleEnd(e){
      this.caches.isStarting = false

      if (!this.caches.isMoving) {
        return
      }

      this.caches.isMoving = false
      this.state.isFreeze = false

      if (this.caches.currentThumbX < 0) {
        return
      }

      this.$emit('event-confirm', parseInt(this.caches.currentAngle.toString()), () => {
        this.resetData()
      })

      e.cancelBubble = true
      e.preventDefault()
    },
    dragStart(e) {
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
    mouseLeave(e){
      if (!isPcBrowser) return
      this.handleEnd(e)
    },
    closeEvent(e){
      this.close()
      e.cancelBubble = true
      e.preventDefault()
      return false
    },
    refreshEvent(e){
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
    resetData(){
      this.state.dragLeft = 0
      this.state.thumbAngle = this.localData.angle || 0
    },
    clearData() {
      this.resetData()
      this.localData.thumb = ''
      this.localData.image = ''
      this.localData.thumbX = 0
      this.localData.thumbY = 0
      this.localData.thumbSize = 0
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

.go-captcha .gc-rotate-body {
  background: transparent !important;
  display: flex;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto 0;
}

.go-captcha .gc-rotate-body .gc-body-inner {
  border-radius: 100%;
}

.go-captcha .gc-rotate-picture {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  z-index: 2;
  border-radius: 100%;
  overflow: hidden;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
}

.go-captcha .gc-rotate-picture .gc-img {
  width: 100%;
  height: 100%;
}

.go-captcha .gc-rotate-picture .gc-round {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 100%;
  z-index: 2;
  border: 6px solid #e0e0e0;
}

.go-captcha .gc-rotate-thumb {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center
}

.go-captcha .gc-rotate-thumb .gc-img {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
}

.go-captcha .gc-rotate-thumb-block {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
