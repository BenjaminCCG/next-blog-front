import styles from './style/index.module.less';
import { MdPreview,
  //  MdCatalog
   } from 'md-editor-rt';
import { APIS } from '@/network/api/api';
import request from '@/network/axios';
import 'md-editor-rt/lib/preview.css';
import { Article  } from '@/network/api/api-params-moudle';
import { useEffect, useState } from 'react';

function About({initData}:{initData:Article}) {
  const [id] = useState('preview-only');
  const [articleDetail] = useState<Article>(initData);
  // const [scrollElement,setScrollElement] = useState<HTMLElement>();



  useEffect(()=>{
    // setScrollElement(document.documentElement)   
     
  },[])

  
  return (
    <div className={styles.article_wrap}>
      <div className={styles.article_content} id="md">
            <h2>{articleDetail.title}</h2>
            <MdPreview
              editorId={id}
              className={styles.md_preview}
              modelValue={articleDetail.content as string}
              previewTheme="smart-blue"
            />
          </div>
          {/* <div className={styles.md_cat}>
            <MdCatalog editorId={id} scrollElement={scrollElement} />
          </div> */}
    </div>
  );
}

export async function getStaticProps() {
  const initData: Article = await request.post(APIS.ARTICLE_DETAIL, {id:99999});
  return {
    props: {
      initData
    }
  };
}

export default About;
