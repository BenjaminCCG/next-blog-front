/** 文档说明
 * @Description: 接口传入参数类型声明文档
 * @author liuJie
 * @Email 1547698569@qq.com
 * @date 2022/1/13 11:35
 */

export interface getCanvasData {
  startTime: string;
  endTime: string;
  city: string;
}

export interface PageListReq {
  pageNum: number;
  pageSize: number;
}

export interface Article {
  id?: number;
  title?: string;
  content?: string;
  createTime?: string;
  updateTime?: string;
  cover?: string;
  intro?: string;
  typeId?: number;
  isAdmin?: number;
}

export interface ArticleType {
  id?: number;
  name?: string;
  createTime?: string;
  updateTime?: string;
}

export interface Message {
  id?: number;
  name?: string;
  createTime?: string;
  updateTime?: string;
  ip?: string;
  comment?: string;
}
