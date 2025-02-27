<template>
  <button
    :class="btnClass"
    :style="[btnStyle]"
    @click="handleClickEvent"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <view :class="{'gc-ripple': localData.type}">
      <view class="gc-icon gc-btn-icon icon-btn-default-icon" v-if="localData.type === 'default'">
        <span class="path1"></span>
        <span class="path2"></span>
        <view class="gc-icon-ripple-ef" :style="[{backgroundColor: localTheme.defaultColor}]"/>
      </view>
      <view class="gc-icon gc-btn-icon icon-btn-warn-icon" v-else-if="localData.type === 'warn'"></view>
      <view class="gc-icon gc-btn-icon icon-btn-error-icon" v-else-if="localData.type === 'error'"></view>
      <view class="gc-icon gc-btn-icon icon-btn-success-icon" v-else-if="localData.type === 'success'"></view>
    </view>
    <span>{{localConfig.title}}</span>
  </button>
</template>

<script>
import {defaultConfig, defaultButtonData, defaultThemeColors} from "../../../components/button/meta/default";

import '../../../assets/icons/style.css';

export default {
  name: 'go-captcha-uni-button',
  props: {
    config: {
      default: () => defaultConfig()
    },
    data: {
      default: () => defaultButtonData()
    },
    theme: {
      default: () => defaultThemeColors()
    },
  },
  data() {
    return {
      localData: {...defaultButtonData(), ...this.data},
      localConfig: {...defaultConfig(), ...this.config},
      localTheme: {...defaultThemeColors(), ...this.theme},

      isHovered: false,
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
    btnClass(){
      const tc = `gc-${this.localData.type}`
      return ["go-captcha", "gc-btn-block", tc, this.localData.disabled ? "gc-disabled" : ""]
    },
    defaultBtnStyle(){
      return {
        color: this.localTheme.defaultColor,
        backgroundColor: this.isHovered ? this.localTheme.defaultHoverColor : this.localTheme.defaultBgColor,
        borderColor: this.localTheme.defaultBorderColor,
      }
    },
    errorBtnStyle(){
      return {
        color: this.localTheme.errorColor,
        backgroundColor: this.localTheme.errorBgColor,
        borderColor: this.localTheme.errorBorderColor,
      }
    },
    warnBtnStyle(){
      return {
        color: this.localTheme.warnColor,
        backgroundColor: this.localTheme.warnBgColor,
        borderColor: this.localTheme.warnBorderColor,
      }
    },
    successBtnStyle(){
      return {
        color: this.localTheme.successColor,
        backgroundColor: this.localTheme.successBgColor,
        borderColor: this.localTheme.successBorderColor,
      }
    },
    btnStyle(){
      let btnColorStyle = this.defaultBtnStyle
      if (this.localData.type === 'warn') {
        btnColorStyle = this.warnBtnStyle
      } else if (this.localData.type === 'error') {
        btnColorStyle = this.errorBtnStyle
      } else if (this.localData.type === 'success') {
        btnColorStyle = this.successBtnStyle
      }

      return {
        width:  this.localConfig.width + "px",
        height: this.localConfig.height + "px",
        paddingLeft: this.localConfig.horizontalPadding + "px",
        paddingRight: this.localConfig.horizontalPadding + "px",
        paddingTop: this.localConfig.verticalPadding + "px",
        paddingBottom: this.localConfig.verticalPadding + "px",
        ...btnColorStyle
      }
    }
  },
  methods: {
    handleMouseEnter() {
      if (this.localData.type !== 'default') return
      this.isHovered = true
    },
    handleMouseLeave() {
      if (this.localData.type !== 'default') return
      this.isHovered = false
    },
    handleClickEvent(){
      this.$emit('event-click')
    }
  }
}
</script>

<style>
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
