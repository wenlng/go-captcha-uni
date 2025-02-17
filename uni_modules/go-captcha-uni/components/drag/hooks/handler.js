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
  const state = reactive({x: data.thumbX || 0, y: data.thumbY || 0, isFreeze: false})
  const caches = reactive({
    isStarting: false,
    isMoving: false,
    startX: 0,
    startY: 0,
    tileLeft: 0,
    tileTop: 0,
    maxWidth: 0,
    maxHeight: 0,
  })

  const systemInfo = uni.getSystemInfoSync();
  const isPcBrowser = systemInfo.model && systemInfo.model.toUpperCase() === 'PC'

  watch(() => data, (newData, _) => {
    if(!state.isFreeze){
      state.x = newData.thumbX || 0
      state.y = newData.thumbY || 0
    }
  },{ deep: true })

  const handleStart = (e) => {
    const xy = getXY(e)
    const clientX = xy.x
    const clientY = xy.y

    try{
      const query = uni.createSelectorQuery().in(app);
      query.select(`#gc-drag-container-${ukey}`).boundingClientRect(cdata => {
        const query1 = uni.createSelectorQuery().in(app);
        query1.select(`#gc-drag-tile-${ukey}`).boundingClientRect(tdata => {
          handleDragStart(clientX, clientY, cdata, tdata)
        }).exec();
      }).exec();
    } catch (e) {
      console.warn(`gocaptcha boundingClientRect err`, e)
    }

    state.isFreeze = true
    caches.isStarting = true
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragStart = (clientX, clientY, cdata, tdata) => {
    const offsetLeft = tdata.left - cdata.left
    const offsetTop = tdata.top - cdata.top
    const width = cdata.width
    const height = cdata.height
    const tileWith  = tdata.width
    const tileHeight  = tdata.height

    caches.tileOffsetLeft = tdata.left - cdata.left
    caches.maxWidth = width - tileWith
    caches.maxHeight = height - tileHeight
    caches.startX = clientX - offsetLeft
    caches.startY = clientY - offsetTop
  }

  const handleMove = (e) => {
    if (!caches.isStarting) {
      return
    }
    caches.isMoving = true
    const xy = getXY(e)
    const clientX = xy.x
    const clientY = xy.y

    let left = clientX - caches.startX
    let top = clientY - caches.startY

    if (left <= 0) {
      left = 0
    }

    if (top <= 0) {
      top = 0
    }

    if (left >= caches.maxWidth) {
      left = caches.maxWidth
    }

    if (top >= caches.maxHeight) {
      top = caches.maxHeight
    }

    state.x = left
    state.y = top
    caches.tileLeft = left
    caches.tileTop = top
    event.move && event.move(left, top)

    e.cancelBubble = true
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  const handleEnd = (e) => {
    caches.isStarting = false

    if (!caches.isMoving) {
      return
    }

    caches.isMoving = false
    state.isFreeze = false

    if (caches.tileLeft < 0 || caches.tileTop < 0) {
      return
    }

    event.confirm && event.confirm({x: caches.tileLeft, y: caches.tileTop}, () => {
      resetData()
    })

    e.cancelBubble = true
    e.preventDefault()
    e.stopPropagation()
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
    state.x = data.thumbX || 0
    state.y = data.thumbY || 0
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