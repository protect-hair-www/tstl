/*
 * @Author: hzheyuan
 * @Date: 2022-02-20 15:06:15
 * @LastEditTime: 2022-03-10 16:57:20
 * @LastEditors: hzheyuan
 * @Description: some helper functions
 * @FilePath: \tstl\demo\util.ts
 */
export function randomNum(low, high) {
    const num = Math.floor(Math.random() * (high - low) + low);
    return num;
}

/**
 * @description: test on kind of iterator (keys, values, entries)
 * @param {*} type
 * @return {*}
 */
export const testIteratorOf = (type) => {
    return (cntr) => {
        let str = '';
        switch (type) {
            case 'keys':
                for (const item of cntr.keys()) str += ` ${item}`
                console.log('keys: ', str)
                return str
            case 'values':
                for (const item of cntr.values()) str += ` ${item}`
                console.log('values: ', str)
                return str
            case 'entries':
                for (const item of cntr.entries()) str += ` ${JSON.stringify(item)}`
                console.log('entries: ', str)
                return str
            default:
                break;
        }
    }
}

/**
 * @description: test three kind of iterator (keys, values, entries)
 * @param {*} cntr
 * @return {*}
 */
export const testAllIterators = (cntr) => {
    testIteratorOf('keys')(cntr);
    testIteratorOf('values')(cntr);
    testIteratorOf('entries')(cntr);
}

/**
 * @description: traverse a container and print log
 * @param {*}
 * @return {*}
 */
export const traverseCntr = (cntr, desc?: string) => {
  let begin = cntr.begin(), str = ''
  for(let item of begin) {
    str += ` ${item}`
  }
  if(desc) console.log(`${desc}: `, str)
  else console.log(str)
}

