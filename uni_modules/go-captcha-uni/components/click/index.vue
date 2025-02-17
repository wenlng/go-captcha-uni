<template>
	<view
    :class="`go-captcha gc-wrapper ${localConfig.showTheme && 'gc-theme'}`"
    :style="wrapperStyles"
    v-show="hasDisplayWrapperState"
	  >
	    <view class="gc-header">
	      <text class="gc-text" :style="{color: localTheme.textColor}">{{ localConfig.title }}</text>
	      <image
	        v-show="hasDisplayImageState"
	        :style="thumbStyles"
	        :src="localData.thumb"
	        alt=""
	      />
	    </view>
	    <view class="gc-body" :style="{...imageStyles, backgroundColor: localTheme.bodyBgColor}">
	      <view class="gc-loading">
	        <view class="gc-loading-icon" :style="{backgroundColor: localTheme.loadingIconColor}"/>
	      </view>
	      <image
	        :style="imageStyles"
	        v-show="hasDisplayImageState"
	        class="gc-picture"
	        :src="localData.image"
	        @click="handler.clickEvent"
	        alt=""
          :id="`gc-click-picture-${ukey}`"
	      />
	      <view class="gc-dots">
	        <view
	          class="gc-dot"
	          v-for="dot in handler.dots.list"
	          :key="`${dot.key + '-' + dot.index}`"
	          :style="{
	            width: localConfig.dotSize + 'px',
	            height: localConfig.dotSize + 'px',
	            borderRadius: localConfig.dotSize + 'px',
	            top: (dot.y - ((localConfig.dotSize || 1)/2)-1) + 'px',
	            left: (dot.x - ((localConfig.dotSize || 1)/2)-1) + 'px',
	            color: localTheme.dotColor,
	            backgroundColor: localTheme.dotBgColor,
	            borderColor: localTheme.dotBorderColor,
	          }"
	        >{{dot.index}}</view>
	      </view>
	    </view>
	    <view class="gc-footer">
	      <view class="gc-icon-block gc-icon-block2">
          <view
            class="gc-icon icon-close-icon"
            :style="{fontSize: localConfig.iconSize + 'px', color: localTheme.iconColor}"
            @click="handler.closeEvent"
          ></view>
          <view
            class="gc-icon icon-refresh-icon"
            :style="{fontSize: localConfig.iconSize + 'px', color: localTheme.iconColor}"
            @click="handler.refreshEvent"
          ></view>
	      </view>
	      <view class="gc-button-block">
	        <button
	          :class="`gc-button ${!hasDisplayImageState ? 'disabled' : ''}`"
	          @click="handler.confirmEvent"
            :style="{
              color: localTheme.btnColor,
              borderColor: hasDisplayImageState ? localTheme.btnBorderColor : localTheme.btnDisabledColor,
              backgroundColor: hasDisplayImageState ? localTheme.btnBgColor : localTheme.btnDisabledColor,
            }"
	        >{{ localConfig.buttonText }}</button>
	      </view>
	    </view>
	  </view>
</template>
<script setup>
import {computed, getCurrentInstance, reactive, toRaw, watch} from "vue"
import {defaultConfig, defaultThemeColors} from "./meta/default";

import {useHandler} from "./hooks/handler";

const app = getCurrentInstance()
const props = defineProps({
	config: {
		default: () => defaultConfig()
	},
	events: {
		default: () => ({})
	},
	data: {
		default: () => ({})
	},
  theme: {
    default: () => defaultThemeColors()
  },
})

const ukey = (new Date()).getMilliseconds()

const { data, events, config, theme } = props;
const localData = reactive({...toRaw(data)})
const localEvent = reactive({...toRaw(events)})
const localConfig = reactive({...defaultConfig(), ...toRaw(config)})
const localTheme = reactive({...defaultThemeColors(), ...toRaw(theme)})

watch(() => props.data, (newData, _) => {
  Object.assign(localData, newData)
},{ deep: true });

watch(() => props.events, (newData, _) => {
  Object.assign(localEvent, newData)
},{ deep: true })

watch(() => props.config, (newData, _) => {
  Object.assign(localConfig, newData)
},{ deep: true })

watch(() => props.theme, (newData, _) => {
  Object.assign(localTheme, newData)
},{ deep: true })

const handler = useHandler(localData, localEvent, ukey, app, () => {
  localData.thumb = ''
  localData.image = ''
});

const wrapperStyles = computed(() => {
  const hPadding = localConfig.horizontalPadding || 0
  const vPadding = localConfig.verticalPadding || 0
  const width = (localConfig.width || 0) + ( hPadding * 2) + (localConfig.showTheme ? 2 : 0)

  return {
    width:  width+ "px",
    paddingLeft: hPadding + "px",
    paddingRight: hPadding + "px",
    paddingTop: vPadding + "px",
    paddingBottom: vPadding + "px",
    backgroundColor: localConfig.showTheme ? localTheme.bgColor : ''
  }
})

const thumbStyles = computed(() => {
  return {
    width: localConfig.thumbWidth + "px",
    height: localConfig.thumbHeight + "px",
  }
})

const imageStyles = computed(() => {
  return {
    width: localConfig.width + "px",
    height: localConfig.height + "px",
  }
})

const hasDisplayImageState = computed(() => {
  return (localData.image && localData.image.length > 0) || (localData.thumb && localData.thumb.length > 0)
})

const hasDisplayWrapperState = computed(() => {
  return (localConfig.width || 0) > 0 || (localConfig.height || 0) > 0
})

defineExpose({
  reset: handler.resetData,
  clear: handler.clearData,
  refresh: handler.refresh,
  close: handler.close,
});
</script>

<style>
@import '../../assets/icons/style.css';
@import '../../assets/css/gocaptcha.css';

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
