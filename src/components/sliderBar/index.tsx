import React, { useRef } from 'react';
import styles from './style/index.module.less';
import { useMount } from 'react-use';
import { useBusinessStore } from '@/store/business';
import { useSearchParams } from 'next/navigation';
import Router  from 'next/router';
import { ArticleType } from '@/network/api/api-params-moudle';
// import { ArticleType } from '@/network/api/api-params-moudle';

export default function SliderBar({typeList}:{typeList:ArticleType[]}) {
  const hoverRef = useRef<HTMLDivElement | null>(null);

  const handleEnter = (e: React.MouseEvent) => {
    if(hoverRef.current){
    hoverRef.current!.style.top = (e.target as HTMLDivElement).offsetTop + 'px';

    }
  };
  const searchParams= useSearchParams();
  const { setShouldFetchData} = useBusinessStore();

  const setPosition = () => {
    const current = Number(searchParams.get('type')) || 0;
    if(hoverRef.current){
      hoverRef.current!.style.top =
      (document.querySelectorAll('.article_item')[current] as HTMLDivElement)?.offsetTop + 'px';
    }
    
  };

  const handleClick = (id: number) => {
    setShouldFetchData(true);
    Router.push('/?type=' + id,undefined,{shallow:true});
  };

  
  // const fetchTypeList = async () => {
  //   const res = await queryTypeList({});
  //   setTypeList([{ name: '全部', id: 0 }, ...res]);
  // };
  useMount(() => {
    setPosition();
    // fetchTypeList().then(() => {
    //   setPosition();
    // });
  });

  return (
    <div className={styles.slider_bar}>
      <div className={styles.user_info}>
        <div className={styles.user_info_bgc} />
        <img src={'/assets/images/avatar.jpg'} alt="" />
        <div className={styles.user_info_name}>Benjamin</div>
        <div className={styles.user_info_desc}>前端开发工程师</div>
      </div>
      {/* 文章分类 */}
      <div className={styles.article}>
        <div className={styles.article_title}>文章分类</div>
        <div className={`${styles.article_list} relative`} onMouseLeave={setPosition}>
          <div ref={hoverRef} className={`${styles.hoverRef} absolute top-0 left-0 w-full cursor-pointer `}></div>
          {typeList.map((item, idx) => {
            return (
              <div
                className={`${styles.article_list_item} ${
                  Number(searchParams.get('type')) === idx ? '!text-black' : ''
                } article_item relative z-10`}
                onClick={() => handleClick(item.id!)}
                onMouseEnter={handleEnter}
                key={item.id}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

