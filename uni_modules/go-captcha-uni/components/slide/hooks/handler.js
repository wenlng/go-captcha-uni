import {onBeforeUnmount, reactive, watch} from "vue";
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
    pointerX: 0,
    measured: false,
  })
  const systemInfo = uni.getSystemInfoSync();
  const isPcBrowser = systemInfo.model && systemInfo.model.toUpperCase() === 'PC'
  const isH5 = systemInfo.uniPlatform === 'web'
  const isApp = systemInfo.uniPlatform === 'app'
  const canUseDom = typeof document !== 'undefined' && typeof document.getElementById === 'function'

  watch(() => data, (newData, _) => {
    if(!state.isFreeze){
      state.thumbLeft = newData.thumbX || 0
    }
  },{ deep: true })


  const handleDragStart = (clientX, cdata, tdata, dbdata, bddata) => {
    if (!cdata?.width || !tdata?.width || !dbdata?.width || !bddata?.width) return false
    const offsetLeft = bddata.left - dbdata.left
    const blockWidth = bddata.width
    const width = cdata.width
    const tileWith = tdata.width

    caches.tileOffsetLeft = tdata.left - cdata.left
    caches.maxWidth = Math.max(0, width - blockWidth)
    caches.containerMaxWidth = Math.max(0, width - tileWith)
    const tileMaxWith = width - (tileWith + caches.tileOffsetLeft)
    caches.ratio = caches.maxWidth > 0 ? tileMaxWith / caches.maxWidth : 0
    caches.startX = clientX - offsetLeft
    return caches.maxWidth > 0
  }

  const applyDrag = clientX => {
    if (!caches.measured || !caches.isStarting) return

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
  }

  const asEl = node => {
    if (!node) return null
    if (node.nodeType === 1) return node
    if (node.$el && node.$el.nodeType === 1) return node.$el
    return null
  }

  const rectOf = id => {
    const vm = app?.proxy || app
    const root = vm?.$el
    const el = root && root.nodeType === 1 ? root.querySelector(`#${id}`) : null
    const node = el || (canUseDom ? document.getElementById(id) : null)
    return node ? node.getBoundingClientRect() : null
  }

  const measureFromEvent = (e, clientX) => {
    const raw = asEl(e?.currentTarget) || asEl(e?.target)
    if (!raw || typeof raw.closest !== 'function') return false
    const root = raw.closest('.go-captcha')
    const bar = raw.closest('.gc-drag-slide-bar') || root?.querySelector('.gc-drag-slide-bar')
    if (!root || !bar) return false
    return handleDragStart(
      clientX,
      root.querySelector('.gc-body')?.getBoundingClientRect(),
      root.querySelector('.gc-tile')?.getBoundingClientRect(),
      bar.getBoundingClientRect(),
      bar.querySelector('.gc-drag-block')?.getBoundingClientRect()
    )
  }

  const measureSync = clientX => {
    return handleDragStart(
      clientX,
      rectOf(`gc-slide-container-${ukey}`),
      rectOf(`gc-slide-tile-${ukey}`),
      rectOf(`gc-slide-drag-bar-${ukey}`),
      rectOf(`gc-slide-drag-block-${ukey}`)
    )
  }

  const onWindowMove = e => {
    if (!caches.isStarting) return
    const xy = getXY(e)
    caches.pointerX = xy.x
    caches.isMoving = true
    if (!caches.measured && (measureFromEvent(e, xy.x) || measureSync(xy.x))) caches.measured = true
    applyDrag(xy.x)
    if (e.touches) e.preventDefault && e.preventDefault()
  }

  const onWindowUp = e => {
    detachWindow()
    handleEnd(e)
  }

  const detachWindow = () => {
    if (typeof window === 'undefined') return
    window.removeEventListener('mousemove', onWindowMove)
    window.removeEventListener('mouseup', onWindowUp)
    window.removeEventListener('touchmove', onWindowMove)
    window.removeEventListener('touchend', onWindowUp)
    window.removeEventListener('touchcancel', onWindowUp)
  }

  const attachWindow = () => {
    if (typeof window === 'undefined') return
    detachWindow()
    window.addEventListener('mousemove', onWindowMove)
    window.addEventListener('mouseup', onWindowUp)
    window.addEventListener('touchmove', onWindowMove, {passive: false})
    window.addEventListener('touchend', onWindowUp)
    window.addEventListener('touchcancel', onWindowUp)
  }

  const measureDrag = (clientX, attempt = 0) => {
    const root = app?.proxy || app
    const query = uni.createSelectorQuery().in(root)
    query.select(`#gc-slide-container-${ukey}`).boundingClientRect()
    query.select(`#gc-slide-tile-${ukey}`).boundingClientRect()
    query.select(`#gc-slide-drag-bar-${ukey}`).boundingClientRect()
    query.select(`#gc-slide-drag-block-${ukey}`).boundingClientRect()
    query.exec(res => {
      if (!caches.isStarting) return
      const ready = handleDragStart(clientX, res?.[0], res?.[1], res?.[2], res?.[3])
      if (!ready) {
        if (attempt < 8) setTimeout(() => measureDrag(clientX, attempt + 1), 40)
        return
      }
      caches.measured = true
      applyDrag(caches.pointerX || clientX)
    })
  }

  const handleStart = (e) => {
    if (caches.isStarting) return
    const xy = getXY(e)
    const clientX = xy.x
    caches.pointerX = clientX
    caches.measured = false
    caches.isMoving = false
    state.isFreeze = true
    caches.isStarting = true
    if (canUseDom && (measureFromEvent(e, clientX) || measureSync(clientX))) {
      caches.measured = true
    } else {
      measureDrag(clientX)
    }
    if (isH5) attachWindow()
  }

  const handleMove = (e) => {
    if (!caches.isStarting) {
      return
    }
    caches.isMoving = true

    const xy = getXY(e)
    caches.pointerX = xy.x
    if (canUseDom && !caches.measured && (measureFromEvent(e, xy.x) || measureSync(xy.x))) {
      caches.measured = true
    }
    applyDrag(caches.pointerX)

    e.cancelBubble = true
    e.preventDefault && e.preventDefault()
  }

  const handleEnd = (e) => {
    const canConfirm = caches.isStarting && caches.isMoving && caches.measured && caches.currentThumbX >= 0
    caches.isStarting = false
    caches.isMoving = false
    state.isFreeze = false
    if (isH5) detachWindow()

    if (!canConfirm) {
      return
    }

    event.confirm && event.confirm({x: parseInt(caches.currentThumbX.toString()), y: data.thumbY || 0}, () => {
      resetData()
    })

    emit('event-confirm', {x: parseInt(caches.currentThumbX.toString()), y: data.thumbY || 0}, () => {
      resetData()
    })

    e.cancelBubble = true
    e.preventDefault && e.preventDefault()
  }

  const isEmptyTouch = e => isH5 && isPcBrowser && e?.type && String(e.type).indexOf('touch') === 0 && !(e.touches && e.touches.length)

  const dragStart = (e) => {
    if (!isH5 && !isApp && isPcBrowser) return
    if (isEmptyTouch(e)) return
    handleStart(e)
    return false
  }

  const dragMove = (e) => {
    if (!isH5 && !isApp && isPcBrowser) return
    if (isEmptyTouch(e)) return
    handleMove(e)
    return false
  }

  const dragEnd = (e) => {
    if (!isH5 && !isApp && isPcBrowser) return
    if (isEmptyTouch(e)) return
    handleEnd(e)
    return false
  }

  const mouseDown = (e) => {
    if (!isH5 && !isPcBrowser) return
    handleStart(e)
    return false
  }
  const mouseMove = (e) => {
    if (!isH5 && !isPcBrowser) return
    handleMove(e)
    return false
  }

  const mouseUp = (e) => {
    if (!isH5 && !isPcBrowser) return
    handleEnd(e)
    return false
  }

  const mouseLeave = (e) => {
    if (isH5) return
    if (!isPcBrowser) return
    handleEnd(e)
  }

  onBeforeUnmount(() => {
    caches.isStarting = false
    if (isH5) detachWindow()
  })

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
