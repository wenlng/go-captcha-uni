<template>
  <view
      :class="{'go-captcha': true, 'gc-wrapper': true, 'gc-theme': localConfig.showTheme}"
      :style="[wrapperStyles]"
      v-show="hasDisplayWrapperState"
  >
    <view class="gc-header">
      <text class="gc-text" :style="[{color: localTheme.textColor}]">{{ localConfig.title }}</text>
      <image
          v-show="hasDisplayImageState"
          :style="[thumbStyles]"
          :src="localData.thumb"
          alt=""
      />
    </view>
    <view class="gc-body" :style="[imageStyles, {backgroundColor: localTheme.bodyBgColor}]">
      <view class="gc-loading">
        <view class="gc-loading-icon" :style="[{backgroundColor: localTheme.loadingIconColor}]"/>
      </view>
      <image
          :style="[imageStyles]"
          v-show="hasDisplayImageState"
          class="gc-picture"
          :src="localData.image"
          @click="clickEvent"
          alt=""
          :id="`gc-click-picture-${ukey}`"
      />
      <view class="gc-dots">
        <view
            class="gc-dot"
            v-for="dot in list"
            :key="dot.key"
            :style="[{
	            width: localConfig.dotSize + 'px',
	            height: localConfig.dotSize + 'px',
	            borderRadius: localConfig.dotSize + 'px',
	            top: (dot.y - ((localConfig.dotSize || 1)/2)-1) + 'px',
	            left: (dot.x - ((localConfig.dotSize || 1)/2)-1) + 'px',
	            color: localTheme.dotColor,
	            backgroundColor: localTheme.dotBgColor,
	            borderColor: localTheme.dotBorderColor,
	          }]"
        >{{dot.index}}</view>
      </view>
    </view>
    <view class="gc-footer">
      <view class="gc-icon-block gc-icon-block2">
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
      <view class="gc-button-block">
        <button
            :class="{'gc-button': true, 'disabled': !hasDisplayImageState}"
            @click="confirmEvent"
            :style="[{
              color: localTheme.btnColor,
              borderColor: hasDisplayImageState ? localTheme.btnBorderColor : localTheme.btnDisabledColor,
              backgroundColor: hasDisplayImageState ? localTheme.btnBgColor : localTheme.btnDisabledColor,
            }]"
        >{{ localConfig.buttonText }}</button>
      </view>
    </view>
  </view>
</template>

<script>
import {defaultConfig, defaultData, defaultThemeColors} from "../../../components/click/meta/default";
import {getXY} from "../../../helper/helper";

import '../../../assets/icons/style.css'

export default {
  name: 'go-captcha-uni-click',
  props: {
    config: {
      default: () => defaultConfig()
    },
    data: {
      default: () => defaultData()
    },
    theme: {
      default: () => defaultThemeColors()
    },
  },
  data() {
    return {
      localData: {...defaultData(), ...this.data},
      localConfig: {...defaultConfig(), ...this.config},
      localTheme: {...defaultThemeColors(), ...this.theme},

      list: [],
      ukey: (new Date()).getMilliseconds()
    }
  },
  watch: {
    data:{
      handler(newData, oldVal){
        Object.assign(this.localData, newData)
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
        backgroundColor: this.localConfig.showTheme ? this.localTheme.bgColor : ''
      }
    },
    thumbStyles(){
      return {
        width: this.localConfig.thumbWidth + "px",
        height: this.localConfig.thumbHeight + "px",
      }
    },
    imageStyles(){
      return {
        width: this.localConfig.width + "px",
        height: this.localConfig.height + "px",
      }
    },
    hasDisplayImageState(){
      return (this.localData.image && this.localData.image.length > 0) || (this.localData.thumb && this.localData.thumb.length > 0)
    },
    hasDisplayWrapperState(){
      return (this.localConfig.width || 0) > 0 || (this.localConfig.height || 0) > 0
    }
  },
  methods: {
    clickEvent(e){
      const xy = getXY(e)
      const mouseX = xy.x
      const mouseY = xy.y

      try{
        const query = uni.createSelectorQuery().in(this);
        query.select(`#gc-click-picture-${this.ukey}`).boundingClientRect(data => {
          this.handleEvent(mouseX, mouseY, data.left || 0, data.top || 0)
        }).exec();
      } catch (e) {
        console.warn(`gocaptcha boundingClientRect err`, e)
      }

      e.cancelBubble = true
      e.preventDefault()
      return false
    },

    handleEvent(mouseX, mouseY, domX, domY){
      let xPos = mouseX - domX;
      let yPos = mouseY - domY;
      if (xPos < 0) {
        xPos = 0;
      }
      if (yPos < 0) {
        yPos = 0;
      }

      const xx = parseInt(xPos.toString())
      const yy = parseInt(yPos.toString())
      const date = new Date()
      const index = this.list.length

      this.list.push({key: date.getTime(), index: index + 1, x: xx, y: yy})
      this.$emit('event-click', xx, yy)
    },

    confirmEvent(e){
      let list = this.list.map((dot)=>{
        return {key: dot.key, index: dot.index, x: dot.x, y: dot.y}
      })

      this.$emit('event-confirm', list, () => {
        this.resetData()
      })

      e.cancelBubble = true
      e.preventDefault()
      return false
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
      this.list = []
    },
    clearData() {
      this.resetData()
      this.localData.thumb = ''
      this.localData.image = ''
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

.go-captcha .gc-body {
  position: relative;
}
.go-captcha .gc-icon-block2 {
    flex: 1;
}
.go-captcha .gc-dots{
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
}

.go-captcha .gc-dots .gc-dot {
	position: absolute;
	z-index: 2;
	width: 22px;
	height: 22px;
	color: #cedffe;
	background: #3e7cff;
	border: 3px solid #f7f9fb;
	display:-webkit-box;
	display:-webkit-flex;
	display:-ms-flexbox;
	display:flex;
	-webkit-box-align:center;
	-webkit-align-items:center;
	-ms-flex-align:center;
	align-items: center;
	justify-content: center;
	border-radius: 22px;
	cursor: default;
}
</style>
