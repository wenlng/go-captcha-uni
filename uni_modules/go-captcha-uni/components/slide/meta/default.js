export const defaultConfig = () => ({
  width: 300,
  height: 220,
  thumbWidth: 150,
  thumbHeight: 40,
  verticalPadding: 16,
  horizontalPadding: 12,
  showTheme: true,
  title: "请拖动滑块完成拼图",
  iconSize: 22,
})


export const defaultSlideData = () => ({
  thumbX: 0,
  thumbY: 0,
  thumbWidth: 0,
  thumbHeight: 0,
  image: '',
  thumb: ''
})

export const defaultThemeColors = () => ({
  textColor: '#333333',
  bgColor: '#ffffff',
  borderColor: 'rgba(206, 223, 254, 0.5)',
  iconColor: '#3C3C3C',
  dragBarColor: '#e0e0e0',
  dragBgColor: '#3e7cff',
  dragIconColor: '#ffffff',
  loadingIconColor: '#3e7cff',
  bodyBgColor: '#34383e',
})