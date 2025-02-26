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
            @click="handler.closeEvent"
        ></view>
        <view
            class="gc-icon icon-refresh-icon"
            :style="{fontSize: localConfig.iconSize + 'px', color: localTheme.iconColor}"
            @click="handler.refreshEvent"
        ></view>
      </view>
    </view>
    <view
        class="gc-body gc-rotate-body"
        :id="`gc-rotate-container-${ukey}`"
        :style="imageBlockStyles"
    >
      <view class="gc-body-inner" :style="{...imageStyles, backgroundColor: localTheme.bodyBgColor}">
        <view class="gc-loading">
          <view class="gc-loading-icon" :style="{backgroundColor: localTheme.loadingIconColor}"/>
        </view>
        <view
            class="gc-picture gc-rotate-picture"
            :style="imageStyles"
        >
          <image
              class="gc-img"
              v-show="hasDisplayImageState"
              :src="localData.image"
              alt=""
          />
          <view class="gc-round" :style="{borderColor: localTheme.roundColor}" />
        </view>

        <view class="gc-thumb gc-rotate-thumb">
          <view class="gc-rotate-thumb-block" :style="thumbStyles">
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
            @touchmove.stop.prevent="handler.dragMove"
            @mousemove.stop.prevent="handler.mouseMove"
            @mouseleave="handler.mouseLeave"
      >
        <view class="gc-drag-line" :style="{backgroundColor: localTheme.dragBarColor}"/>
        <view
            class="gc-drag-block"
            :class="!hasDisplayImageState && 'disabled'"
            :id="`gc-rotate-drag-block-${ukey}`"
            :style="{left: handler.state.dragLeft + 'px', backgroundColor: localTheme.dragBgColor}"
            @touchstart.stop.prevent="handler.dragStart"
            @touchend="handler.dragEnd"
            @mousedown.stop.prevent="handler.mouseDown"
            @mouseup="handler.mouseUp"
        >
          <view
              class="gc-icon icon-arrows-icon"
              :style="{fontSize: localConfig.iconSize + 'px', color: localTheme.dragIconColor}"
          ></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {computed, getCurrentInstance, reactive, toRaw, watch} from "vue"
import {defaultConfig, defaultThemeColors, defaultRotateData} from "./meta/default";
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
    default: () => defaultRotateData()
  },
  theme: {
    default: () => defaultThemeColors()
  },
})

const ukey = (new Date()).getMilliseconds()

const { data, events, config, theme } = props;
const localData = reactive({...defaultRotateData(), ...toRaw(data)})
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

const handler = useHandler(
    localData,
    localEvent,
    localConfig,
    ukey,
    app,
    () => {
      localData.thumb = ''
      localData.image = ''
      localData.thumbX = 0
      localData.thumbY = 0
      localData.thumbSize = 0
    }
);

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
  }
})

const thumbStyles = computed(() => {
  return {
    transform: `rotate(${handler.state.thumbAngle}deg)`,
    ...(localData.thumbSize > 0 ? {
      width: localData.thumbSize + "px",
      height: localData.thumbSize + "px"
    } : {})
  }
})

const imageBlockStyles = computed(() => {
  return {
    width: localConfig.width + "px",
    height: localConfig.height + "px"
  }
})

const imageStyles = computed(() => {
  const size = (localConfig.size || 0) > 0 ? localConfig.size : defaultConfig().size
  return {
    width: size  + "px",
    height: size + "px"
  }
})

const hasDisplayImageState = computed(() => {
  return localData.image && localData.image.length > 0

})

const hasDisplayThumbImageState = computed(() => {
  return localData.thumb && localData.thumb.length > 0
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
