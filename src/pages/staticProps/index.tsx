/*
 * @Author: ChangCheng
 * @Date: 2023-08-19 21:19:47
 * @LastEditTime: 2023-08-19 23:28:54
 * @LastEditors: ChangCheng
 * @Description: 
 * @FilePath: \next-blog-front\src\pages\staticProps\index.tsx
 */

import request from '@/network/axios';
import { APIS } from '@/network/api/api';
import { ArticleType } from '@/network/api/api-params-moudle';


export default ()=><></>

export async function getSliderBarData() {
  const res : ArticleType[] = await request.post(APIS.ARTICLE_TYPE_LIST, {});
  const typeList = [{ name: '全部', id: 0 }, ...res];
  return {
    typeList
  };
}
