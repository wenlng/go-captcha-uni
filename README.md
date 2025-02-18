<div align="center">
<img width="120" style="padding-top: 50px; margin: 0;" src="http://47.104.180.148/go-captcha/gocaptcha_logo.svg?v=1"/>
<h1 style="margin: 0; padding: 0">Go Captcha</h1>
<p>Behavior Captcha Of UniApp</p>

</div>

<br/>

> English | [中文](README_zh.md)

<br/>

<p style="text-align: center">  ⭐️ If it helps you, please give a star.</p>

<img src="http://47.104.180.148/go-captcha/go-captcha-v2.jpg" alt="Poster">

<br/>

- GoCaptcha：[https://github.com/wenlng/go-captcha](https://github.com/wenlng/go-captcha)
- GoCaptcha Document：[http://gocaptcha.wencodes.com](http://gocaptcha.wencodes.com)
- Go Assets File：[https://github.com/wenlng/go-captcha-assets](https://github.com/wenlng/go-captcha-assets)
- Example Project：[https://github.com/wenlng/go-captcha-example](https://github.com/wenlng/go-captcha-example)
- Online Demo：[http://gocaptcha.wencodes.com/demo](http://gocaptcha.wencodes.com/demo)
- Javascript Library：[https://github.com/wenlng/go-captcha-jslib](https://github.com/wenlng/go-captcha-jslib)
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
                 :events="clickCaptEvents"
                 :config="clickCaptConfig"
                 :theme="clickThemeColor" />
```


## Click Mode

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

## Slide Mode

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

## Drag-Drop Mode

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

## Rotation Mode

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


## Button

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
