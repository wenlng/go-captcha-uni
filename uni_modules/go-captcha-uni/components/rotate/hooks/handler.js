import {reactive, watch} from "vue";
import {getXY} from "../../../helper/helper.js";

export function useHandler(
  data,
  event,
  config,
  ukey,
  app,
  clearCbs
) {
  const state = reactive({dragLeft: 0, thumbAngle: data.angle || 0, isFreeze: false})
  const caches = reactive({
    isStarting: false,
    isMoving: false,
    startX: 0,
    currentThumbX: 0,
    maxWidth: 0,
    tileOffsetLeft: 0,
    currentAngle: 0,
    angle: 0,
    maxAngle: 360,
    ratio: 0,
  })
  const systemInfo = uni.getSystemInfoSync();
  const isPcBrowser = systemInfo.model && systemInfo.model.toUpperCase() === 'PC'

  watch(() => data, (newData, _) => {
    if(!state.isFreeze){
      state.thumbAngle = newData.angle || 0
    }
  },{ deep: true })

  const handleStart = (e) => {
    const xy = getXY(e)
    const clientX = xy.x

    try{
      const query = uni.createSelectorQuery().in(app);
      query.select(`#gc-rotate-container-${ukey}`).boundingClientRect(cdata => {
        const query1 = uni.createSelectorQuery().in(app);
        query1.select(`#gc-rotate-tile-${ukey}`).boundingClientRect(tdata => {
          handleDragStart(clientX, cdata, tdata)
        }).exec();
      }).exec();
    } catch (e) {
      console.warn(`gocaptcha boundingClientRect err`, e)
    }

    state.isFreeze = true
    caches.isStarting = true
  }

  const handleDragStart = (clientX, cdata, tdata) => {
    try{
      const query = uni.createSelectorQuery().in(app);
      query.select(`#gc-rotate-drag-bar-${ukey}`).boundingClientRect(dbdata => {
        const query1 = uni.createSelectorQuery().in(app);
        query1.select(`#gc-rotate-drag-block-${ukey}`).boundingClientRect(bddata => {
          const offsetLeft = bddata.left - dbdata.left
          const blockWidth = bddata.width
          const width = cdata.width

          caches.maxWidth = width - blockWidth
          caches.angle = 0
          caches.currentAngle = 0
          caches.startX = clientX - offsetLeft
          caches.ratio = (caches.maxAngle - data.angle) / caches.maxWidth
        }).exec();
      }).exec();
    } catch (e) {
      console.warn(`gocaptcha boundingClientRect err`, e)
    }
  }

  const handleMove = (e) => {
    if (!caches.isStarting) {
      return
    }
    caches.isMoving = true

    const xy = getXY(e)
    const clientX = xy.x

    let left = clientX - caches.startX

    caches.angle = data.angle + (left * caches.ratio)

    if (left >= caches.maxWidth) {
      state.dragLeft = caches.maxWidth
      state.thumbAngle = caches.currentAngle = caches.maxAngle
      return
    }

    if (left <= 0) {
      state.dragLeft = 0
      state.thumbAngle = caches.currentAngle = data.angle
      return
    }

    state.dragLeft = left
    state.thumbAngle = caches.currentAngle = caches.angle

    event.rotate && event.rotate(caches.angle)

    e.cancelBubble = true
    e.preventDefault()
  }

  const handleEnd = (e) => {
    caches.isStarting = false

    if (!caches.isMoving) {
      return
    }

    caches.isMoving = false
    state.isFreeze = false

    if (caches.currentThumbX < 0) {
      return
    }

    event.confirm && event.confirm(parseInt(caches.currentAngle.toString()), () => {
      resetData()
    })

    e.cancelBubble = true
    e.preventDefault()
  }

  const dragStart = (e) => {
    if (isPcBrowser) return
    handleStart(e)
    return false
  }

  const dragMove = (e) => {
    if (isPcBrowser) return
    handleMove(e)
    return false
  }

  const dragEnd = (e) => {
    if (isPcBrowser) return
    handleEnd(e)
    return false
  }

  const mouseDown = (e) => {
    if (!isPcBrowser) return
    handleStart(e)
    return false
  }
  const mouseMove = (e) => {
    if (!isPcBrowser) return
    handleMove(e)
    return false
  }

  const mouseUp = (e) => {
    if (!isPcBrowser) return
    handleEnd(e)
    return false
  }

  const mouseLeave = (e) => {
    if (!isPcBrowser) return
    handleEnd(e)
  }

  const closeEvent = (e) => {
    close()
    e.cancelBubble = true
    e.preventDefault()
    return false
  }

  const refreshEvent = (e) => {
    refresh()
    e.cancelBubble = true
    e.preventDefault()
    return false
  }

  const close = () => {
    event && event.close && event.close()
    resetData()
  }

  const refresh = () => {
    event && event.refresh && event.refresh()
    resetData()
  }

  const resetData = () => {
    state.dragLeft = 0
    state.thumbAngle = data.angle || 0
  }

  const clearData = () => {
    clearCbs && clearCbs()
    resetData()
  }

  return {
    state,
    dragStart,
    dragEnd,
    dragMove,
    mouseDown,
    mouseMove,
    mouseUp,
    mouseLeave,
    closeEvent,
    refreshEvent,
    resetData,
    clearData,
    refresh,
    close
  }
}