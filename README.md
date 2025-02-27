<div align="center">
<img width="120" style="padding-top: 50px; margin: 0;" src="https://github.com/wenlng/git-assets/blob/master/go-captcha/gocaptcha_logo.svg?raw=true"/>
<h1 style="margin: 0; padding: 0">Go Captcha</h1>
<p>Behavior Captcha Of UniApp</p>

<a href="https://github.com/wenlng/go-captcha-uni/releases"><img src="https://img.shields.io/github/v/release/wenlng/go-captcha-uni.svg"/></a>
<a href="https://www.npmjs.com/package/go-captcha-uni"><img src="https://img.shields.io/npm/v/go-captcha-uni"/></a>
<a href="https://github.com/wenlng/go-captcha-uni/blob/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg"/></a>
<a href="https://github.com/wenlng/go-captcha-uni"><img src="https://img.shields.io/github/stars/wenlng/go-captcha-uni.svg"/></a>
<a href="https://github.com/wenlng/go-captcha-uni"><img src="https://img.shields.io/github/last-commit/wenlng/go-captcha-uni.svg"/></a>

</div>

<br/>

> English | [中文](README_zh.md)

<br/>

<p style="text-align: center">  ⭐️ If it helps you, please give a star.</p>

<img src="https://github.com/wenlng/git-assets/blob/master/go-captcha/go-captcha-v2.jpg?raw=true" alt="Poster">

<br/>

<hr/>
<br/>

## URL Index

| Name                                                               | Desc                       |
|--------------------------------------------------------------------|----------------------------|
| [document](http://gocaptcha.wencodes.com)                          | GoCaptcha Document         |
| [online demo](http://gocaptcha.wencodes.com/demo/)                 | GoCaptcha Online Demo      |
| [go-captcha-example](https://github.com/wenlng/go-captcha-example) | Golang + Web + APP Example |
| [go-captcha-assets](https://github.com/wenlng/go-captcha-assets)   | Golang Asset File          |
| [go-captcha](https://github.com/wenlng/go-captcha)                 | Golang Captcha             |
| [go-captcha-jslib](https://github.com/wenlng/go-captcha-jslib)     | Javascript Captcha         |
| [go-captcha-vue](https://github.com/wenlng/go-captcha-vue)         | Vue Captcha                |
| [go-captcha-react](https://github.com/wenlng/go-captcha-react)     | React Captcha              |
| [go-captcha-angular](https://github.com/wenlng/go-captcha-angular) | Angular Captcha            |
| [go-captcha-svelte](https://github.com/wenlng/go-captcha-svelte)   | Svelte Captcha             |
| [go-captcha-solid](https://github.com/wenlng/go-captcha-solid)     | Solid Captcha              |
| [go-captcha-uni](https://github.com/wenlng/go-captcha-uni)         | UniApp Captcha             |
| ...                                                                |                            |


<br/>



## Install
#### 1、Use HBuilderX Import
* [Use HBuilderX Import](https://ext.dcloud.net.cn/plugin?name=go-captcha-uni)

#### 2、Download ZIP Import
* [Download ZIP File](https://ext.dcloud.net.cn/plugin?name=go-captcha-uni)

#### 3、Dependency Tool Install
```shell
yarn add go-captcha-uni
# or
npm install go-captcha-uni
# or
pnpm install go-captcha-uni
```

## Use Component

```vue
  <go-captcha-uni  type="click"
                   :data="clickCaptData"
                   :config="clickCaptConfig"
                   :theme="clickThemeColor"
                   @event-click="clickEvents"
                   @event-confirm="confirmEvents"
                   @event-refresh="refreshEvents"
                   @event-close="closeEvents"/>
```


## Click Mode

```vue
<go-captcha-uni
  type="click"  
  :config="{}"
  :theme="{}"
  :data="{}"
  ref="domRef"
/>

<script>
  // call methods
  const domRef = ref(null)
  domRef.value.clear()
  domRef.value.refresh()
</script>
```


```ts
// config = {}
interface Config {
  width?: number;
  height?: number;
  thumbWidth?: number;
  thumbHeight?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
  showTheme?: boolean;
  title?: string;
  buttonText?: string;
  iconSize?: number;
  dotSize?: number;
}

// data = {}
interface Data {
  image: string;
  thumb: string;
}

// theme = {}
interface Theme {
  textColor?: string; // '#ffffff'
  bgColor?: string;
  btnColor?: string;
  btnDisabledColor?: string;
  btnBgColor?: string;
  btnBorderColor?: string;
  activeColor?: string;
  borderColor?: string;
  iconColor?: string;
  loadingIconColor?: string;
  bodyBgColor?: string;

  dotColor?: string;
  dotBgColor?: string;
  dotBorderColor?: string;
}

// @events
interface _ {
  '@event-click'?: (x: number, y: number) => void;
  '@event-refresh'?: () => void;
  '@event-close'?: () => void;
  '@event-confirm'?: (dots: Array<ClickDot>, reset:() => void) => boolean;
}

// export component method
interface ExportMethods {
  reset: () => void,
  clear: () => void,
  refresh: () => void,
  close: () => void,
}
```

## Slide Mode

```vue
<go-captcha-uni
    type="slide"
    :config="{}"
    :theme="{}"
    :data="{}"
    ref="domRef"
/>

<script>
// call methods
const domRef = ref(null)
domRef.value.clear()
domRef.value.refresh()
</script>
```


```ts
// config = {}
interface Config {
  width?: number;
  height?: number;
  thumbWidth?: number;
  thumbHeight?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
  showTheme?: boolean;
  title?: string;
  iconSize?: number;
  scope ?: boolean;
}

// data = {}
interface Data {
  thumbX: number;
  thumbY: number;
  thumbWidth: number;
  thumbHeight: number;
  image: string;
  thumb: string;
}
// theme = {}
interface Theme {
  textColor?: string; // '#ffffff'
  bgColor?: string;
  borderColor?: string;
  iconColor?: string;
  dragBarColor?: string;
  dragBgColor?: string;
  dragIconColor?: string;
  loadingIconColor?: string;
  bodyBgColor?: string;
}

// @events
interface _ {
  move?: (x: number, y: number) => void;
  refresh?: () => void;
  close?: () => void;
  confirm?: (point: SlidePoint, reset:() => void) => boolean;
}

// export component method
interface ExportMethods {
  reset: () => void,
  clear: () => void,
  refresh: () => void,
  close: () => void,
}
```

## Drag-Drop Mode

```vue
<go-captcha-uni
    type="drag"
    :config="{}"
    :theme="{}"
    :data="{}"
    ref="domRef"
/>

<script>
// call methods
const domRef = ref(null)
domRef.value.clear()
domRef.value.refresh()
</script>
```


```ts
// config = {}
interface Config {
  width?: number;
  height?: number;
  thumbWidth?: number;
  thumbHeight?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
  showTheme?: boolean;
  title?: string;
  iconSize?: number;
  scope ?: boolean;
}

// data = {}
interface Data {
  thumbX: number;
  thumbY: number;
  thumbWidth: number;
  thumbHeight: number;
  image: string;
  thumb: string;
}

// theme = {}
interface Theme {
  textColor?: string; // '#ffffff'
  bgColor?: string;
  borderColor?: string;
  iconColor?: string;
  loadingIconColor?: string;
  bodyBgColor?: string;
}

// @events
interface _ {
  '@event-move'?: (x: number, y: number) => void;
  '@event-refresh'?: () => void;
  '@event-close'?: () => void;
  '@event-confirm'?: (point: SlideRegionPoint, reset:() => void) => boolean;
}

// export component method
interface ExportMethods {
  reset: () => void,
  clear: () => void,
  refresh: () => void,
  close: () => void,
}
```

## Rotation Mode

```vue
<go-captcha-uni
    type="rotate"
    :config="{}"
    :theme="{}"
    :data="{}"
    ref="domRef"
/>

<script>
// call methods
const domRef = ref(null)
domRef.value.clear()
domRef.value.refresh()
</script>
```


```ts
// config = {}
interface Config {
  width?: number;
  height?: number;
  thumbWidth?: number;
  thumbHeight?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
  showTheme?: boolean;
  title?: string;
  iconSize?: number;
  scope ?: boolean;
}

// data = {}
interface Data {
  angle: number;
  image: string;
  thumb: string;
}

// theme = {}
interface Theme {
  textColor?: string; // '#ffffff'
  bgColor?: string;
  borderColor?: string;
  iconColor?: string;
  dragBarColor?: string;
  dragBgColor?: string;
  dragIconColor?: string;
  roundColor?: string;
  loadingIconColor?: string;
  bodyBgColor?: string;
}

// @events
interface _ {
  '@event-rotate'?: (angle: number) => void;
  '@event-refresh'?: () => void;
  '@event-close'?: () => void;
  '@event-confirm'?: (angle: number, reset:() => void) => boolean;
}

// export component method
interface ExportMethods {
  reset: () => void,
  clear: () => void,
  refresh: () => void,
  close: () => void,
}
```


## Button

```vue
<go-captcha-uni
    type="button"
    :config="{}"
    :theme="{}"
    :data="{}"
/>
```


```ts
// config = {}
interface Config {
  width?: number;
  height?: number;
  verticalPadding?: number;
  horizontalPadding?: number;
}

// data = {}
interface Data {
  disabled?: boolean;
  type?: "default" | "warn" | "error" | "success"
}

// theme = {}
interface Theme {
  textColor?: string; // '#ffffff'
  bgColor?: string;
  btnColor?: string;
  btnDisabledColor?: string;
  btnBgColor?: string;
  btnBorderColor?: string;
  activeColor?: string;
  borderColor?: string;
  iconColor?: string;
  loadingIconColor?: string;
  bodyBgColor?: string;

  dotColor?: string;
  dotBgColor?: string;
  dotBorderColor?: string;
}

// @events
interface _ {
  '@event-click'?: () => {}
}

```
