import SliderBar from '@/components/sliderBar';
import styles from './style/index.module.less';
import {MdPreview} from 'md-editor-rt';
import {  useState } from 'react';
import 'md-editor-rt/lib/preview.css';
import { Article as AT, ArticleType } from '@/network/api/api-params-moudle';
import request from '@/network/axios';
import { APIS } from '@/network/api/api';
import { getSliderBarData } from '../staticProps';
interface Props {
  initData: AT;
  typeList: ArticleType[];
 }
function Article({ initData ,typeList}: Props) {
  const [id] = useState('preview-only');
  const [articleDetail] = useState<AT>(initData);
  return (
    <div className={styles.article_wrap}>
      <div className={styles.article_content} id="md">
        <h2>{articleDetail.title}</h2>
        <p className={`flex justify-between ${styles.article_info}`}>
          <span>
            分类：
            {typeList.find((i) => i.id === articleDetail.typeId)?.name}
          </span>
          <span>日期：{articleDetail.createTime}</span>
        </p>
        <MdPreview
          editorId={id}
          className={styles.md_preview}
          modelValue={articleDetail.content as string}
          previewTheme="smart-blue"
        />

      </div>
      <SliderBar typeList={typeList} />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const initData = await request.post(APIS.ARTICLE_DETAIL, context.query);
  const { typeList } = (await getSliderBarData())

  return {
    props: {
      initData,
      typeList
    }
  };
}

export default Article;
