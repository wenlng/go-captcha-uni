export const defaultConfig = () => ({
  width: 300,
  height: 220,
  verticalPadding: 16,
  horizontalPadding: 12,
  showTheme: true,
  title: "请拖拽贴图完成拼图",
  iconSize: 22,
})

export const defaultDragData = () => ({
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
  loadingIconColor: '#3e7cff',
  bodyBgColor: '#34383e',
})