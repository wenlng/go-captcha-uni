<template>
  <view
      :class="`go-captcha gc-wrapper ${localConfig.showTheme && 'gc-theme'}`"
      :style="wrapperStyles"
      v-show="hasDisplayWrapperState"
  >
    <view class="gc-header">
      <text class="gc-text" :style="{color: localTheme.textColor}">{{ localConfig.title }}</text>
      <view class="gc-icon-block">
        <view
            class="gc-icon icon-close-icon"
            :style="{fontSize: localConfig.iconSize + 'px', color: localTheme.iconColor}"
            @click="closeEvent"
        ></view>
        <view
            class="gc-icon icon-refresh-icon"
            :style="{fontSize: localConfig.iconSize + 'px', color: localTheme.iconColor}"
            @click="refreshEvent"
        ></view>
      </view>
    </view>
    <view
        class="gc-body"
        :id="`gc-slide-container-${ukey}`"
        :style="{...imageStyles, backgroundColor: localTheme.bodyBgColor}"
    >
      <view class="gc-loading">
        <view class="gc-loading-icon" :style="{backgroundColor: localTheme.loadingIconColor}"/>
      </view>
      <image
          class="gc-picture"
          v-show="hasDisplayImageState"
          :style="imageStyles"
          :src="localData.image"
          alt=""
      />
      <view
          class="gc-tile"
          :id="`gc-slide-tile-${ukey}`"
          :style="thumbStyles"
      >
        <image
            class="gc-img"
            v-show="hasDisplayThumbImageState"
            :src="localData.thumb"
            alt=""
        />
      </view>
    </view>
    <view class="gc-footer">
      <view class="gc-drag-slide-bar"
            :id="`gc-slide-drag-bar-${ukey}`"
            @touchmove.stop.prevent="dragMove"
            @mousemove.stop.prevent="mouseMove"
            @mouseleave="mouseLeave"
      >
        <view class="gc-drag-line" />
        <view
            class="gc-drag-block"
            :class="!hasDisplayImageState && 'disabled'"
            :id="`gc-slide-drag-block-${ukey}`"
            :style="{left: state.dragLeft + 'px'}"
            @touchstart.stop.prevent="dragStart"
            @touchend="dragEnd"
            @mousedown.stop.prevent="mouseDown"
            @mouseup="mouseUp"
        >
          <view
              class="gc-icon icon-arrows-icon"
              :style="{fontSize: localConfig.iconSize + 'px'}"
          ></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {defaultConfig, defaultSlideData, defaultThemeColors} from "../../../components/slide/meta/default";
import {getXY} from "../../../helper/helper";

import '../../../assets/icons/style.css'

const systemInfo = uni.getSystemInfoSync();
const isPcBrowser = systemInfo.model && systemInfo.model.toUpperCase() === 'PC'

export default {
  name: 'go-captcha-uni-slide',
  props: {
    config: {
      default: () => defaultConfig
    },
    events: {
      default: () => ({})
    },
    data: {
      default: () => defaultSlideData()
    },
    theme: {
      default: () => defaultThemeColors()
    },
  },
  data() {
    return {
      localData: {...defaultSlideData(), ...this.data},
      localEvent: {...this.events},
      localConfig: {...defaultConfig(), ...this.config},
      localTheme: {...defaultThemeColors(), ...this.theme},

      ukey: (new Date()).getMilliseconds(),
      state: {
        dragLeft: 0,
        thumbLeft: this.data.thumbX || 0,
        isFreeze: false
      },
      caches: {
        isStarting: false,
        isMoving: false,
        startX: 0,
        currentThumbX: 0,
        maxWidth: 0,
        containerMaxWidth: 0,
        tileOffsetLeft: 0,
        ratio: 0,
      }
    }
  },
  watch: {
    data:{
      handler(newData, oldVal){
        Object.assign(this.localData, newData)

        if(!this.state.isFreeze){
          this.state.thumbLeft = newData.thumbX || 0
        }
      },
      deep: true
    },
    events:{
      handler(newData, oldVal){
        Object.assign(this.localEvent, newData)
      },
      deep: true
    },
    config:{
      handler(newData, oldVal){
        Object.assign(this.localConfig, newData)
      },
      deep: true
    },
    theme:{
      handler(newData, oldVal){
        Object.assign(this.localTheme, newData)
      },
      deep: true
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
        height:this.localData.thumbHeight + "px",
        top: this.localData.thumbY + "px",
        left: this.state.thumbLeft + "px"
      }
    },
    imageStyles(){
      return {
        width: this.localConfig.width + "px",
        height: this.localConfig.height + "px"
      }
    },
    hasDisplayImageState () {
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
    handleDragStart(clientX, cdata, tdata){
      try{
        const query = uni.createSelectorQuery().in(this);
        query.select(`#gc-slide-drag-bar-${this.ukey}`).boundingClientRect(dbdata => {
          const query1 = uni.createSelectorQuery().in(this);
          query1.select(`#gc-slide-drag-block-${this.ukey}`).boundingClientRect(bddata => {
            const offsetLeft = bddata.left - dbdata.left
            const blockWidth = bddata.width
            const width = cdata.width
            const tileWith  = tdata.width

            this.caches.tileOffsetLeft = tdata.left - cdata.left
            this.caches.maxWidth = width - blockWidth
            this.caches.containerMaxWidth = width - tileWith
            const tileMaxWith = width - (tileWith + this.caches.tileOffsetLeft)
            this.caches.ratio = tileMaxWith / this.caches.maxWidth
            this.caches.startX = clientX - offsetLeft
          }).exec();
        }).exec();
      } catch (e) {
        console.warn(`gocaptcha boundingClientRect err`, e)
      }
    },
    handleStart(e){
      const xy = getXY(e)
      const clientX = xy.x

      try{
        const query = uni.createSelectorQuery().in(this);
        query.select(`#gc-slide-container-${this.ukey}`).boundingClientRect(cdata => {
          const query1 = uni.createSelectorQuery().in(this);
          query1.select(`#gc-slide-tile-${this.ukey}`).boundingClientRect(tdata => {
            this.handleDragStart(clientX, cdata, tdata)
          }).exec();
        }).exec();
      } catch (e) {
        console.warn(`gocaptcha boundingClientRect err`, e)
      }

      this.state.isFreeze = true
      this.caches.isStarting = true
    },
    handleMove(e){
      if (!this.caches.isStarting) {
        return
      }
      this.caches.isMoving = true
      const xy = getXY(e)
      const clientX = xy.x

      let left = clientX - this.caches.startX

      let ctX = this.caches.tileOffsetLeft + (left * this.caches.ratio)
      if (left >= this.caches.maxWidth) {
        this.state.dragLeft = this.caches.maxWidth
        this.state.thumbLeft = this.caches.currentThumbX = this.caches.containerMaxWidth
        return
      }

      if (left <= 0) {
        this.state.dragLeft = 0
        this.state.thumbLeft = this.caches.currentThumbX = this.caches.tileOffsetLeft
        return
      }

      this.state.dragLeft = left
      this.state.thumbLeft = this.caches.currentThumbX = ctX

      this.localEvent.move && this.localEvent.move(this.caches.currentThumbX, this.localData.thumbY || 0)

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

      this.localEvent.confirm && this.localEvent.confirm({x: parseInt(this.caches.currentThumbX.toString()), y: this.localData.thumbY || 0}, () => {
        this.resetData()
      })

      e.cancelBubble = true
      e.preventDefault()
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
      this.localEvent.close && this.localEvent.close()
      this.resetData()
    },
    refresh(){
      this.localEvent.refresh && this.localEvent.refresh()
      this.resetData()
    },
    resetData (){
      this.state.dragLeft = 0
      this.state.thumbLeft = this.localData.thumbX || 0
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
