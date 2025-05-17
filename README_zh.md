
<div align="center">
<img width="120" style="padding-top: 50px; margin: 0;" src="https://github.com/wenlng/git-assets/blob/master/go-captcha/gocaptcha_logo.svg?raw=true"/>
<h1 style="margin: 0; padding: 0">Go Captcha</h1>
<p>UniApp 行为验证码</p>

<a href="https://github.com/wenlng/go-captcha-uni/releases"><img src="https://img.shields.io/github/v/release/wenlng/go-captcha-uni.svg"/></a>
<a href="https://www.npmjs.com/package/go-captcha-uni"><img src="https://img.shields.io/npm/v/go-captcha-uni"/></a>
<a href="https://github.com/wenlng/go-captcha-uni/blob/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg"/></a>
<a href="https://github.com/wenlng/go-captcha-uni"><img src="https://img.shields.io/github/stars/wenlng/go-captcha-uni.svg"/></a>
<a href="https://github.com/wenlng/go-captcha-uni"><img src="https://img.shields.io/github/last-commit/wenlng/go-captcha-uni.svg"/></a>

</div>

<br/>

> [English](README.md) | 中文

<br/>

<p style="text-align: center"> ⭐️ 如果能帮助到你，请随手给点一个star，<a href="https://github.com/wenlng/go-captcha-uni" target="_blank">go-captcha-uni</a></p>
<p style="text-align: center">QQ交流群：178498936</p>

<img src="https://github.com/wenlng/git-assets/blob/master/go-captcha/go-captcha-v2.jpg?raw=true" alt="Poster">

<br/>

<hr/>
<br/>

## 其他项目


| 名称                                                                         | 描述                                                                                          |
|----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| [document](http://gocaptcha.wencodes.com)                                  | GoCaptcha 文档                                                                                |
| [online demo](http://gocaptcha.wencodes.com/demo/)                         | GoCaptcha 在线演示                                                                              |
| [go-captcha-example](https://github.com/wenlng/go-captcha-example)         | Golang + 前端 + APP实例                                                                         |
| [go-captcha-assets](https://github.com/wenlng/go-captcha-assets)           | Golang 内嵌素材资源                                                                               |
| [go-captcha](https://github.com/wenlng/go-captcha)                         | Golang 验证码                                                                                  |
| [go-captcha-jslib](https://github.com/wenlng/go-captcha-jslib)             | Javascript 验证码                                                                              |
| [go-captcha-vue](https://github.com/wenlng/go-captcha-vue)                 | Vue 验证码                                                                                     |
| [go-captcha-react](https://github.com/wenlng/go-captcha-react)             | React 验证码                                                                                   |
| [go-captcha-angular](https://github.com/wenlng/go-captcha-angular)         | Angular 验证码                                                                                 |
| [go-captcha-svelte](https://github.com/wenlng/go-captcha-svelte)           | Svelte 验证码                                                                                  |
| [go-captcha-solid](https://github.com/wenlng/go-captcha-solid)             | Solid 验证码                                                                                   |
| [go-captcha-uni](https://github.com/wenlng/go-captcha-uni)                 | UniApp 验证码，兼容 App、小程序、快应用等                                                                  |
| [go-captcha-service](https://github.com/wenlng/go-captcha-service)         | GoCaptcha 服务，支持二进制、Docker镜像等方式部署，<br/> 提供 HTTP/GRPC 方式访问接口，<br/>可用单机模式和分布式（服务发现、负载均衡、动态配置等） |
| [go-captcha-service-sdk](https://github.com/wenlng/go-captcha-service-sdk) | GoCaptcha 服务SDK工具包，包含 HTTP/GRPC 请求服务接口，<br/>支持静态模式、服务发现、负载均衡                                |
| ...                                                                        |                                                                                             |
                     |

<br/>


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
                   :config="clickCaptConfig"
                   :theme="clickThemeColor"
                   @event-click="handleClickEvent"
                   @event-confirm="handleConfirmEvent"
                   @event-refresh="handleRefreshEvent"
                   @event-close="handleCloseEvent"/>
</template>
```

* 采用 npm/yarn/pnpm/... 等依赖工具方式安装，需要 Import 导入。

```vue
<template>
  <go-captcha-uni  type="click"
                   :data="clickCaptData"
                   :config="clickCaptConfig"
                   :theme="clickThemeColor"
                   @event-click="handleClickEvent"
                   @event-confirm="handleConfirmEvent"
                   @event-refresh="handleRefreshEvent"
                   @event-close="handleCloseEvent"/>
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

## 滑动式

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
interface _{
  '@event-move'?: (x: number, y: number) => void;
  '@event-refresh'?: () => void;
  '@event-close'?: () => void;
  '@event-confirm'?: (point: SlidePoint, reset:() => void) => boolean;
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

## 旋转式

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
  image: string;
  thumb: string;
  thumbSize: number;
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


## 按钮

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

<br/>

## 后端服务【可选】
服务支持二进制、Docker镜像等方式部署
[go-captcha-service](https://github.com/wenlng/go-captcha-service)

<br/>

## 👍 赞助一下

<div>
<a href="http://gocaptcha.wencodes.com/sponsor/" target="_blank">http://gocaptcha.wencodes.com/sponsor/</a>
</div>
<br/>