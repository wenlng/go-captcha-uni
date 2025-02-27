import {reactive, watch} from "vue";
import {getXY} from "../../../helper/helper.js";

export function useHandler(
  data,
  event,
  config,
  emit,
  ukey,
  app,
  clearCbs
) {
  const state = reactive({dragLeft: 0, thumbLeft: data.thumbX || 0, isFreeze: false})
  const caches = reactive({
    isStarting: false,
    isMoving: false,
    startX: 0,
    currentThumbX: 0,
    maxWidth: 0,
    containerMaxWidth: 0,
    tileOffsetLeft: 0,
    ratio: 0,
  })
  const systemInfo = uni.getSystemInfoSync();
  const isPcBrowser = systemInfo.model && systemInfo.model.toUpperCase() === 'PC'

  watch(() => data, (newData, _) => {
    if(!state.isFreeze){
      state.thumbLeft = newData.thumbX || 0
    }
  },{ deep: true })


  const handleDragStart = (clientX, cdata, tdata) => {
    try{
      const query = uni.createSelectorQuery().in(app);
      query.select(`#gc-slide-drag-bar-${ukey}`).boundingClientRect(dbdata => {
        const query1 = uni.createSelectorQuery().in(app);
        query1.select(`#gc-slide-drag-block-${ukey}`).boundingClientRect(bddata => {
          const offsetLeft = bddata.left - dbdata.left
          const blockWidth = bddata.width
          const width = cdata.width
          const tileWith  = tdata.width

          caches.tileOffsetLeft = tdata.left - cdata.left
          caches.maxWidth = width - blockWidth
          caches.containerMaxWidth = width - tileWith
          const tileMaxWith = width - (tileWith + caches.tileOffsetLeft)
          caches.ratio = tileMaxWith / caches.maxWidth
          caches.startX = clientX - offsetLeft
        }).exec();
      }).exec();
    } catch (e) {
      console.warn(`gocaptcha boundingClientRect err`, e)
    }
  }

  const handleStart = (e) => {
    const xy = getXY(e)
    const clientX = xy.x

    try{
      const query = uni.createSelectorQuery().in(app);
      query.select(`#gc-slide-container-${ukey}`).boundingClientRect(cdata => {
        const query1 = uni.createSelectorQuery().in(app);
        query1.select(`#gc-slide-tile-${ukey}`).boundingClientRect(tdata => {
          handleDragStart(clientX, cdata, tdata)
        }).exec();
      }).exec();
    } catch (e) {
      console.warn(`gocaptcha boundingClientRect err`, e)
    }

    state.isFreeze = true
    caches.isStarting = true
  }

  const handleMove = (e) => {

    if (!caches.isStarting) {
      return
    }
    caches.isMoving = true

    const xy = getXY(e)
    const clientX = xy.x

    let left = clientX - caches.startX
    let ctX = caches.tileOffsetLeft + (left * caches.ratio)
    if (left >= caches.maxWidth) {
      state.dragLeft = caches.maxWidth
      state.thumbLeft = caches.currentThumbX = caches.containerMaxWidth
      return
    }

    if (left <= 0) {
      state.dragLeft = 0
      state.thumbLeft = caches.currentThumbX = caches.tileOffsetLeft
      return
    }

    state.dragLeft = left
    state.thumbLeft = caches.currentThumbX = ctX

    event.move && event.move(caches.currentThumbX, data.thumbY || 0)
    emit('event-move', caches.currentThumbX, data.thumbY || 0)

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

    event.confirm && event.confirm({x: parseInt(caches.currentThumbX.toString()), y: data.thumbY || 0}, () => {
      resetData()
    })

    emit('event-confirm', {x: parseInt(caches.currentThumbX.toString()), y: data.thumbY || 0}, () => {
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
    event.close && event.close()
    emit('event-close')
    resetData()
  }

  const refresh = () => {
    event.refresh && event.refresh()
    emit('event-refresh')
    resetData()
  }

  const resetData = () => {
    state.dragLeft = 0
    state.thumbLeft = data.thumbX || 0
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