import { request } from '@/network/axios';

import type {
  Article,
  ArticleType,
  getCanvasData,
  Message,
  PageListReq,
  User,
} from './api-params-moudle';
import type { GetCityTotal, PageListRes } from './api-res-model';

/** 这里枚举定义所有接口 */
export enum APIS {
  GET_CITY_TOTAL_NUMBER = '/xxxx/xxxx/xxxxx',
  ARTICLE_PAGE = '/article/page',
  ARTICLE_TYPE_LIST = '/articleType/list',
  LIFE_PAGE = '/life/page',
  ARTICLE_DETAIL = '/article/queryById',
  LIFE_DETAIL = '/life/queryById',
  MESSAGE_PAGE = '/message/page',
  MESSAGE_SAVE = '/message/save',
  SEND_CODE = '/user/code',
  FRONT_LOGIN = '/user/front/login',
  QUERY_USER = '/user/github/userInfo',
}

/** 一个示例 */
export const getCityTotalNumber = (params: getCanvasData) =>
  request.get<GetCityTotal>(APIS.GET_CITY_TOTAL_NUMBER, params);

export const queryArticlePage = (data: Article & PageListReq) =>
  request.post<PageListRes<Article>>(APIS.ARTICLE_PAGE, data);

export const queryTypeList = (data: ArticleType) =>
  request.post<ArticleType[]>(APIS.ARTICLE_TYPE_LIST, data);

export const queryLifePage = (data: Article & PageListReq) =>
  request.post<PageListRes<Article>>(APIS.LIFE_PAGE, data);

export const queryArticleDetail = (data: {id:number}) =>
  request.post<Article>(APIS.ARTICLE_DETAIL,data);

export const queryLifeDetail = (data: {id:number}) =>
  request.post<Article>(APIS.LIFE_DETAIL,data);

export const queryMessagePage = (data: PageListReq) =>
  request.post<PageListRes<Message>>(APIS.MESSAGE_PAGE, data);

export const saveMessage = (data: Message) =>
  request.post(APIS.MESSAGE_SAVE, data);


export const getCaptcha = (data:{phone:string}) => {
  return request.post<{code:string}>(APIS.SEND_CODE,data)
}

export const frontLogin = (data:{phone:string,code:string}) => {
  return request.post<User>(APIS.FRONT_LOGIN,data)
}

export const queryUser = (id:string) => {
  return request.get<User>(APIS.QUERY_USER+'?userId='+id)
}