
<div align="center">
<img width="120" style="padding-top: 50px; margin: 0;" src="http://47.104.180.148/go-captcha/gocaptcha_logo.svg?v=1"/>
<h1 style="margin: 0; padding: 0">Go Captcha</h1>
<p>UniApp 行为验证码</p>
</div>

<br/>

> [English](README.md) | 中文

<br/>

<p style="text-align: center"> ⭐️ 如果能帮助到你，请随手给点一个star</p>
<p style="text-align: center">QQ交流群：178498936</p>

<img src="http://47.104.180.148/go-captcha/go-captcha-v2.jpg" alt="Poster">

<br/>

- GoCaptcha：[https://github.com/wenlng/go-captcha](https://github.com/wenlng/go-captcha)
- GoCaptcha 文档：[http://gocaptcha.wencodes.com](http://gocaptcha.wencodes.com)
- Golang 内嵌素材资源：[https://github.com/wenlng/go-captcha-assets](https://github.com/wenlng/go-captcha-assets)
- Golang/前端的实例：[https://github.com/wenlng/go-captcha-example](https://github.com/wenlng/go-captcha-example)
- 在线演示 URL：[http://gocaptcha.wencodes.com/demo/](http://gocaptcha.wencodes.com/demo/)
- Javascript 原生库：[https://github.com/wenlng/go-captcha-jslib](https://github.com/wenlng/go-captcha-jslib)
- Vue Package：[https://github.com/wenlng/go-captcha-vue](https://github.com/wenlng/go-captcha-vue)
- React Package：[https://github.com/wenlng/go-captcha-react](https://github.com/wenlng/go-captcha-react)
- Angular Package：[https://github.com/wenlng/go-captcha-angular](https://github.com/wenlng/go-captcha-angular)
- Svelte Package：[https://github.com/wenlng/go-captcha-svelte](https://github.com/wenlng/go-captcha-svelte)
- Solid Package：[https://github.com/wenlng/go-captcha-solid](https://github.com/wenlng/go-captcha-solid)
- UniApp Module：[https://github.com/wenlng/go-captcha-uni](https://github.com/wenlng/go-captcha-uni)
- ...


<br/>



| HBuilderX Version            | Vue Version            | Go Captcha Version |
|:-----------------------|:-----------------------|:------------------:|
| HBuilderX >= 3.0             | vue >= 3.0             | go-captcha-uni@^1  |


## 安装方式
#### 1、使用HBuilderX导入插件
* [使用HBuilderX导入插件](https://ext.dcloud.net.cn/plugin?name=go-captcha-uni)

#### 2、下载插件ZIP导入插件
* [下载插件ZIP](https://ext.dcloud.net.cn/plugin?name=go-captcha-uni)

#### 3、Node 依赖工具安装
```shell
yarn add go-captcha-uni
# or
npm install go-captcha-uni
# or
pnpm install go-captcha-uni
```

## 使用
* 采用 uni_modules 方式安装，支持 easycom 模式导入组件，可以不用 Import、注册等。

```vue
<template>
  <go-captcha-uni  type="click"
                   :data="clickCaptData"
                   :events="clickCaptEvents"
                   :config="clickCaptConfig"
                   :theme="clickThemeColor" />
</template>
```

* 采用 npm/yarn/pnpm/... 等依赖工具方式安装，需要 Import 导入。

```vue
<template>
  <go-captcha-uni  type="click"
                   :data="clickCaptData"
                   :events="clickCaptEvents"
                   :config="clickCaptConfig"
                   :theme="clickThemeColor" />
</template>

<script>
import GoCaptchaUni from 'go-captcha-uni'
</script>
```


## 点选式

```vue
<go-captcha-uni
    type="click"
    :config="{}"
    :theme="{}"
    :data="{}"
    :events="{}"
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

// data = {}
interface Data {
  image: string;
  thumb: string;
}

// events = {}
interface Events {
  click?: (x: number, y: number) => void;
  refresh?: () => void;
  close?: () => void;
  confirm?: (dots: Array<ClickDot>, reset:() => void) => boolean;
}

// export component method
interface ExportMethods {
  reset: () => void,
  clear: () => void,
  refresh: () => void,
  close: () => void,
}
```

## 滑动式

```vue
<go-captcha-uni
    type="slide"
    :config="{}"
    :theme="{}"
    :data="{}"
    :events="{}"
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
interface SlideConfig {
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

// data = {}
interface SlideData {
  thumbX: number;
  thumbY: number;
  thumbWidth: number;
  thumbHeight: number;
  image: string;
  thumb: string;
}

// events = {}
interface SlideEvents {
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

## 拖拽式

```vue
<go-captcha-uni
    type="drag"
    :config="{}"
    :theme="{}"
    :data="{}"
    :events="{}"
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
interface DragConfig {
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

// theme = {}
interface Theme {
  textColor?: string; // '#ffffff'
  bgColor?: string;
  borderColor?: string;
  iconColor?: string;
  loadingIconColor?: string;
  bodyBgColor?: string;
}

// data = {}
interface DragData {
  thumbX: number;
  thumbY: number;
  thumbWidth: number;
  thumbHeight: number;
  image: string;
  thumb: string;
}

// events = {}
interface DragEvents {
  move?: (x: number, y: number) => void;
  refresh?: () => void;
  close?: () => void;
  confirm?: (point: SlideRegionPoint, reset:() => void) => boolean;
}

// export component method
interface ExportMethods {
  reset: () => void,
  clear: () => void,
  refresh: () => void,
  close: () => void,
}
```

## 旋转式

```vue
<go-captcha-uni
    type="rotate"
    :config="{}"
    :theme="{}"
    :data="{}"
    :events="{}"
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

// data = {}
interface Data {
  angle: number;
  image: string;
  thumb: string;
}

// events = {}
interface Events {
  rotate?: (angle: number) => void;
  refresh?: () => void;
  close?: () => void;
  confirm?: (angle: number, reset:() => void) => boolean;
}

// export component method
interface ExportMethods {
  reset: () => void,
  clear: () => void,
  refresh: () => void,
  close: () => void,
}
```


## 按钮

```vue
<go-captcha-uni
    type="button"
    :config="{}"
    :theme="{}"
    :data="{}"
    :events="{}"
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

// data = {}
interface Data {
  disabled?: boolean;
  type?: "default" | "warn" | "error" | "success"
}

// events = {}
interface Events {
  click?: () => {}
}

```

## 👍 赞助一下

<div>
<a href="http://gocaptcha.wencodes.com/sponsor/" target="_blank">http://gocaptcha.wencodes.com/sponsor/</a>
</div>
<br/>