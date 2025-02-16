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