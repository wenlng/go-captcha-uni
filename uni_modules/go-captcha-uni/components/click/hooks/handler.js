import {reactive, toRaw} from "vue";
import {getXY} from "../../../helper/helper.js";

export function useHandler(_, event, emit, ukey, app, clearCbs) {
  const dots = reactive({list: []})

  const clickEvent = (e) => {
    const xy = getXY(e)
    const mouseX = xy.x
    const mouseY = xy.y

    try{
      const query = uni.createSelectorQuery().in(app);
      query.select(`#gc-click-picture-${ukey}`).boundingClientRect(data => {
        handleEvent(mouseX, mouseY, data.left || 0, data.top || 0)
      }).exec();
    } catch (e) {
      console.warn(`gocaptcha boundingClientRect err`, e)
    }

    e.cancelBubble = true
    e.preventDefault()
    return false
  }

  const handleEvent = (mouseX, mouseY, domX, domY) => {
    let xPos = mouseX - domX;
    let yPos = mouseY - domY;
    if (xPos < 0) {
      xPos = 0;
    }
    if (yPos < 0) {
      yPos = 0;
    }

    const xx = parseInt(xPos.toString())
    const yy = parseInt(yPos.toString())
    const date = new Date()
    const index = dots.list.length

    dots.list.push({key: date.getTime(), index: index + 1, x: xx, y: yy})

    event.click && event.click(xx, yy)
    emit('event-click', xx, yy)
  }

  const confirmEvent = (e) => {
    event.confirm && event.confirm(toRaw(dots.list), () => {
      resetData()
    })
    emit('event-confirm', toRaw(dots.list), () => {
      resetData()
    })

    e.cancelBubble = true
    e.preventDefault()
    return false
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
    dots.list = []
  }

  const clearData = () => {
    resetData()
    clearCbs && clearCbs()
  }

  return {
    dots,
    clickEvent,
    confirmEvent,
    closeEvent,
    refreshEvent,
    resetData,
    clearData,
    refresh,
    close,
  }
}
