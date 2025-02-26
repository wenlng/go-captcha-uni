/**
 * @Author Awen
 * @Date 2025/02/15
 * @Email wengaolng@gmail.com
 **/

export const getDomPosition = (id, cabs) => {
  try{
    const query = uni.createSelectorQuery().in(this);
    query.select(id).boundingClientRect(data => {
      cabs && cabs(data)
    }).exec();
  } catch (e) {
    console.warn(`gocaptcha boundingClientRect err`, e)
  }
}

export const getXY = (e) => {
  let xy = {x: 0, y: 0}
  try {
    if (e.touches && Array.isArray(e.touches) && e.touches.length > 0) {
      xy.x = e.touches[0].clientX || e.touches[0].pageX || 0;
      xy.y =  e.touches[0].clientY || e.touches[0].pageY || 0;
    } else if (e.target && typeof e.target.x !== 'undefined') {
      xy.x = e.target.x || 0;
      xy.y =  e.target.y || 0;
    } else if (e.detail && (typeof e.detail.clientX !== 'undefined' || typeof e.detail.pageX !== 'undefined')){
      xy.x = e.detail.clientX || e.detail.pageX || 0;
      xy.y =  e.detail.clientY || e.detail.pageY || 0;
    } else {
      xy.x = e.clientX || e.pageX || 0;
      xy.y = e.clientY || e.pageY || 0;
    }

    return xy
  } catch (e) {
    console.warn('>>>>>>>> go captcha err: ', e)
  }
}