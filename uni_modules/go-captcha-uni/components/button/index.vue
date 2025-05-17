<template>
  <button
    :class="btnClass"
    :style="btnStyle"
    @click="handleClickEvent"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <view :class="localData.type === 'default' ? 'gc-ripple' : ''">
      <view class="gc-icon gc-btn-icon icon-btn-default-icon" v-if="localData.type === 'default'">
        <span class="path1"></span>
        <span class="path2"></span>
        <view class="gc-icon-ripple-ef" :style="{backgroundColor: localTheme.defaultColor}"/>
      </view>
      <view class="gc-icon gc-btn-icon icon-btn-warn-icon" v-else-if="localData.type === 'warn'"></view>
      <view class="gc-icon gc-btn-icon icon-btn-error-icon" v-else-if="localData.type === 'error'"></view>
      <view class="gc-icon gc-btn-icon icon-btn-success-icon" v-else-if="localData.type === 'success'"></view>
    </view>
    <span>{{localConfig.title}}</span>
  </button>
</template>

<script setup>
import {computed, reactive, ref, toRaw, watch} from "vue"
import {defaultConfig, defaultButtonData, defaultThemeColors} from "./meta/default";

const props = defineProps({
  config: {
    default: () => defaultConfig()
  },
  events: {
    default: () => ({})
  },
  data: {
    default: () => defaultButtonData()
  },
  theme: {
    default: () => defaultThemeColors()
  },
})

const { data, events, config, theme} = props;
const localData = reactive({...defaultButtonData(), ...toRaw(data)})
const localEvent = reactive({...toRaw(events)})
const localConfig = reactive({...defaultConfig(), ...toRaw(config)})
const localTheme = reactive({...defaultThemeColors(), ...toRaw(theme)})

const isHovered = ref(false)

watch(() => props.config, (newData, _) => {
  Object.assign(localConfig, newData)
},{ deep: true })

watch(() => props.events, (newData, _) => {
  Object.assign(localEvent, newData)
},{ deep: true })

watch(() => props.data, (newData, _) => {
  Object.assign(localData, newData)
},{ deep: true })

watch(() => props.theme, (newData, _) => {
  Object.assign(localTheme, newData)
},{ deep: true })

const btnClass = computed(() => {
  const tc = `gc-${localData.type}`
  return ["go-captcha", "gc-btn-block", tc, localData.disabled ? "gc-disabled" : ""]
})

const defaultBtnStyle = computed(() => {
  return {
    color: localTheme.defaultColor,
    backgroundColor: isHovered.value ? localTheme.defaultHoverColor : localTheme.defaultBgColor,
    borderColor: localTheme.defaultBorderColor,
  }
})

const errorBtnStyle = computed(() => {
  return {
    color: localTheme.errorColor,
    backgroundColor: localTheme.errorBgColor,
    borderColor: localTheme.errorBorderColor,
  }
})

const warnBtnStyle = computed(() => {
  return {
    color: localTheme.warnColor,
    backgroundColor: localTheme.warnBgColor,
    borderColor: localTheme.warnBorderColor,
  }
})

const successBtnStyle = computed(() => {
  return {
    color: localTheme.successColor,
    backgroundColor: localTheme.successBgColor,
    borderColor: localTheme.successBorderColor,
  }
})

const btnStyle = computed(() => {
  let btnColorStyle = defaultBtnStyle.value
  if (localData.type === 'warn') {
    btnColorStyle = warnBtnStyle.value
  } else if (localData.type === 'error') {
    btnColorStyle = errorBtnStyle.value
  } else if (localData.type === 'success') {
    btnColorStyle = successBtnStyle.value
  }

console.log(localConfig)
  return {
    width:  localConfig.width + "px",
    height: localConfig.height + "px",
    paddingLeft: localConfig.horizontalPadding + "px",
    paddingRight: localConfig.horizontalPadding + "px",
    paddingTop: localConfig.verticalPadding + "px",
    paddingBottom: localConfig.verticalPadding + "px",
    ...btnColorStyle
  }
})

const handleMouseEnter = () => {
  if (localData.type !== 'default') return
  isHovered.value = true
}
const handleMouseLeave = () => {
  if (localData.type !== 'default') return
  isHovered.value = false
}

const emit = defineEmits(['event-click']);
const handleClickEvent = () => {
  localEvent.click && localEvent.click()
  emit('event-click')
}

</script>

<style>
@import '../../assets/icons/style.css';

.go-captcha.gc-btn-block {
  position: relative;
  box-sizing: border-box;

  display: block;
  font-size: 13px;

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  border: solid 1px transparent;
  line-height: 1;
  white-space: nowrap;
  -webkit-appearance: none;
  outline: none;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;

  display:-webkit-box;
  display:-webkit-flex;
  display:-ms-flexbox;
  display:flex;
  -webkit-box-align:center;
  -webkit-align-items:center;
  -ms-flex-align:center;
  align-items: center;
  justify-content: center;
  justify-items: center;

  box-shadow: 0 0 20px rgba(62, 124, 255, 0.1);
  -webkit-box-shadow: 0 0 20px rgba(62, 124, 255, 0.1);
  -moz-box-shadow: 0 0 20px rgba(62, 124, 255, 0.1);
}

.go-captcha.gc-btn-block ::after {
  border: none !important;
}

.go-captcha.gc-disabled{
  pointer-events: none;
}

.go-captcha.gc-button-mode.gc-default {
  color: #3e7cff;
  border: 1px solid #50a1ff;
  border-color: #3e7cff;
  background-color: #ecf5ff;
  cursor: pointer;
}

.go-captcha.gc-button-mode.gc-default:hover {
  background-color: #e0efff !important;
}

.go-captcha.gc-button-mode.gc-error {
  cursor: pointer;
  color: #ed4630;
  background-color: #fef0f0;
  border: 1px solid #ff5a34;
  border-color: #ff5a34;
}

.go-captcha.gc-button-mode.gc-warn {
  cursor: pointer;
  color: #ffa000;
  background-color: #fdf6ec;
  border: 1px solid #ffbe09;
  border-color: #ffbe09;
}

.go-captcha.gc-button-mode.gc-success {
  color: #5eaa2f;
  background-color: #f0f9eb;
  border: 1px solid #8bc640;
  border-color: #8bc640;
  pointer-events: none;
}

.go-captcha .gc-ripple {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
}

.go-captcha .gc-ripple .gc-icon {
  position: relative;
  z-index: 2;
  font-min-size:  22px;
}

.go-captcha .gc-ripple .gc-icon-ripple-ef {
  background-color: #3e7cff;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  border-radius: 50px;
  content: "";
  display: block;
  width: 21px;
  height: 21px;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top:  -11px;
  margin-left:  -11px;
  z-index: 1;

  animation: gc-ripple 1.3s infinite;
  -moz-animation: gc-ripple 1.3s infinite;
  -webkit-animation: gc-ripple 1.3s infinite;
  animation-delay: 2s;
  -moz-animation-delay: 2s;
  -webkit-animation-delay: 2s;
}

.go-captcha .gc-btn-icon {
  width: 24px !important;
  height: 24px !important;
  font-size: 24px !important;
  margin-right: 8px;
  line-height: 24px;
}

@keyframes gc-ripple {
  0% { opacity: 0; }
  5% { opacity: 0.05; }
  20% { opacity: 0.35; }
  65% { opacity: 0.01;  }
  100% {
    transform: scaleX(2) scaleY(2);
    opacity: 0;
  }
}

@-webkit-keyframes gc-ripple {
  0% { opacity: 0; }
  5% { opacity: 0.05; }
  20% { opacity: 0.35; }
  65% { opacity: 0.01;  }
  100% {
    transform: scaleX(2) scaleY(2);
    opacity: 0;
  }
}

</style>
