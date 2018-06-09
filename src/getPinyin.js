import lowerCase from 'lodash/lowerCase'
import pinyinlite from 'pinyinlite'

/**
 * 生成全拼和拼音缩写
 * @param {string} name 
 * @returns {string}
 */
const generatePinyin = (name) => {
  try {
    const pinyinArray = pinyinlite(name).filter((v) => {
      return v.length > 0
    })
    const mergedPinyinArray = mergePinyinArray(pinyinArray)
    const quanpin = generateQuanpin(mergedPinyinArray)
    const pinyinAbbr = generatePinyinAbbr(mergedPinyinArray)
    if (quanpin === pinyinAbbr) {
      return quanpin
    } else {
      return `${quanpin} ${pinyinAbbr}`
    }
  } catch (e) {
    return ''
  }
}

/**
 * 生成全拼
 * @param {any[]} mergedPinyinArray 
 * @returns {string}
 */
const generateQuanpin = (mergedPinyinArray) => (
  mergedPinyinArray.map((v) => v.join('')).join(' ')
)


/**
 * 生成拼音首字母缩写
 * @param {any[]} mergedPinyinArray 
 * @returns {string}
 */
const generatePinyinAbbr = (mergedPinyinArray) => (
  mergedPinyinArray.map((v) => (v.map((s) => s[0]).join(''))).join(' ')
)

/**
 * 将可能具有多音字的原始拼音数组合并成一个新的数组
 * eg: [['wang'], ['yi'], ['yun'], ['yin'], ['le', 'yue']] => [['wang', 'yi', 'yun', 'yin', 'le'], ['wang', 'yi', 'yun', 'yin', 'yue']]
 * @param {any[]} pinyinArray 
 */
const mergePinyinArray = (pinyinArray) => {
  let resultArray = [
    []
  ]
  pinyinArray.forEach((p) => {
    if (p.length === 1) {
      resultArray.forEach((r) => {
        r.push(lowerCase(p[0]))
      })
    } else {
      const newResultArray = []
      p.forEach((s) => {
        newResultArray.push(...resultArray.map((r) => [...r, lowerCase(s)]))
      })
      resultArray = newResultArray
    }
  })
  return resultArray
}

export default (name) => generatePinyin(name)
