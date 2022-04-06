/*
 * @Author: hzheyuan
 * @Date: 2022-04-06 10:38:25
 * @LastEditTime: 2022-04-06 10:53:55
 * @LastEditors: hzheyuan
 * @Description: 
 * @FilePath: \tstl\src\exp\Abstracts\AbstractSequentialList.ts
 */
import { AbstractList } from "./AbstractList";
export abstract class AbstractSequentialList<E> extends AbstractList<E> {
    get(index: number): E {
        try {
            return this.listIterator(index).next().value
        } catch (error) {
            throw new Error('')
        }
    }
}