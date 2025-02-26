<template>
  <view
    :class="`go-captcha gc-wrapper ${localConfig.showTheme && 'gc-theme'}`"
    :style="wrapperStyles"
    v-show="hasDisplayWrapperState"
  >
    <view class="gc-header gc-header2">
      <text class="gc-text" :style="{color: localTheme.textColor}">{{ localConfig.title }}</text>
      <view class="gc-icon-block">

      </view>
    </view>
    <view
      class="gc-body"
      :id="`gc-drag-container-${ukey}`"
      :style="{...imageStyles, backgroundColor: localTheme.bodyBgColor}"
      @touchmove.stop.prevent="handler.dragMove"
      @mousemove.stop.prevent="handler.mouseMove"
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
        :id="`gc-drag-tile-${ukey}`"
        :style="thumbStyles"
      >
        <image
          class="gc-img"
          v-show="hasDisplayThumbImageState"
          :src="localData.thumb"
          @dragstart.stop.prevent="(e)=> {e.preventDefault();return false;}"
          @touchstart.stop.prevent="handler.dragStart"
          @touchend="handler.dragEnd"
          @mousedown.stop.prevent="handler.mouseDown"
          @mouseup.stop.prevent="handler.mouseUp"
          @mouseleave="handler.mouseLeave"
          alt=""
        />
      </view>
    </view>
    <view class="gc-footer">
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
  </view>
</template>

<script setup>
import {computed, getCurrentInstance, reactive, toRaw, watch} from "vue"
import {defaultConfig, defaultDragData, defaultThemeColors} from "./meta/default";
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
    default: () => defaultDragData()
  },
  theme: {
    default: () => defaultThemeColors()
  },
})

const ukey = (new Date()).getMilliseconds()

const { data, events, config, theme } = props;
const localData = reactive({...defaultDragData(), ...toRaw(data)})
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
      localData.thumbWidth = 0
      localData.thumbHeight = 0
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
    width: localData.thumbWidth + "px",
    height: localData.thumbHeight + "px",
    top: handler.state.y + "px",
    left: handler.state.x + "px"
  }
})

const imageStyles = computed(() => {
  return {
    width: localConfig.width + "px",
    height: localConfig.height + "px"
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
