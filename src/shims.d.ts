/*
 * @Author: zld 17875477802@163.com
 * @Date: 2025-05-27 23:43:56
 * @LastEditors: zld 17875477802@163.com
 * @LastEditTime: 2025-05-27 23:44:03
 * @FilePath: \plant\src\shims.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}