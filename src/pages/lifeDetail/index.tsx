import styles from './style/index.module.less';
import request from '@/network/axios'
import { APIS } from '@/network/api/api';
import { Article } from '@/network/api/api-params-moudle';
import { useState } from 'react';

function LifeDetail({initData}:{initData:Article}) {
  const [lifeDetail] = useState<Article>(initData);
  


  return (
    <div className={styles.article_wrap}>
      <div className={styles.article_content} id="md">
        <h2>{lifeDetail.title}</h2>
        <p className={`flex justify-between ${styles.article_info}`}>
          <span>作者：Benjamin</span>
          <span>日期：{lifeDetail.createTime}</span>
        </p>
        <div
          className={styles.editor_wrapper}
          dangerouslySetInnerHTML={{
            __html: lifeDetail.content as string
          }}
        ></div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context:any){ 
  const initData = await request.post(APIS.LIFE_DETAIL,context.query)

  return {
    props: {
      initData
    },

  }
}


export default LifeDetail;
