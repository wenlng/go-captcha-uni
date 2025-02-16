import {reactive, watch} from "vue";

export function useHandler(
  data,
  event,
  config,
  ukey,
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

  watch(() => data, (newData, _) => {
    if(!state.isFreeze){
      state.thumbAngle = newData.angle || 0
    }
  },{ deep: true })

  const dragStart = (e) => {
    const clientX = e.touches[0].clientX || e.touches[0].pageX ||0;

    try{
      const query = uni.createSelectorQuery().in(this);
      query.select(`#gc-rotate-container-${ukey}`).boundingClientRect(cdata => {
        const query1 = uni.createSelectorQuery().in(this);
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
      const query = uni.createSelectorQuery().in(this);
      query.select(`#gc-rotate-drag-bar-${ukey}`).boundingClientRect(dbdata => {
        const query1 = uni.createSelectorQuery().in(this);
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

  const dragMove = (e) => {
    if (!caches.isStarting) {
      return
    }
    caches.isMoving = true
    const clientX = e.touches[0].clientX || e.touches[0].pageX ||0;

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

  const dragEnd = (e) => {
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

  const mouseDown = (e) => {
    dragStart(e)
  }

  const mouseMove = (e) => {
    dragMove(e)
  }

  const mouseUp = (e) => {
    dragEnd(e)
  }

  const mouseLeave = (e) => {
    dragEnd(e)
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