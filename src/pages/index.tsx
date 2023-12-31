import SliderBar from '@/components/sliderBar';
import styles from './style/index.module.less';
import { useSetState } from 'react-use';
import { queryArticlePage, queryUser } from '@/network/api/api';
import { Article, ArticleType } from '@/network/api/api-params-moudle';
import Router from 'next/router';
import { useBusinessStore } from '@/store/business';
import { Button } from 'antd';
import { useSearchParams } from 'next/navigation';
import Loading from '@/components/Loading/index';
import {  useEffect, useState } from 'react';
import request from '@/network/axios';
import { APIS } from '@/network/api/api';
import { PageListRes } from '@/network/api/api-res-model';
import { getSliderBarData } from './staticProps';
import ScrollToTopButton from '@/components/ScrollTop';
import { useUserStore } from '@/store/user';
interface Props {
  initData: PageListRes<Article>;
  typeList: ArticleType[];
 }
function Home({ initData,typeList }: Props) {
  const handleClick = (id: number,e:any) => {
    e.preventDefault()
    Router.push('/article?id=' + id);
  };
  const [total, setTotal] = useState(initData.total!);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useSetState({
    pageNum: 1,
    pageSize: 10
  });
  const [articleList, setArticleList] = useState<Article[]>(initData.records!);

  const fetchArticlePage = async (typeId?: number) => {
    setLoading(true);
    const res = await queryArticlePage({
      ...pageInfo,
      typeId,
      isAdmin: 1
    });

    setLoading(false);
    if (pageInfo.pageNum === 1) {
      setArticleList(res.records!);
    } else {
      setArticleList([...articleList, ...res.records!]);
    }
    setTotal(res.total!);
  };
  const {  shouldFetchData, setShouldFetchData } = useBusinessStore();

  const loadMore = () => {
    if (pageInfo.pageNum * pageInfo.pageSize < total) {
      setShouldFetchData(true);
      setPageInfo({
        pageNum: pageInfo.pageNum + 1
      });
    }
  };

  const search = useSearchParams();

  useEffect(() => {
    const typeId = search.get('type');
    if (shouldFetchData) {
      fetchArticlePage(Number(typeId) || undefined);
    }
    return () => {
      setShouldFetchData(false);
    }
  }, [search.get('type'), pageInfo.pageNum]);

  useEffect(() => {
    setPageInfo({
      pageNum: 1
    });
  }, [search.get('type')]);

  const {setUserInfo,userInfo} = useUserStore();
  const fetchGithubUserInfo = async (id: string) => {
    const res = await queryUser(id);
    setUserInfo(res)
  }

  useEffect(() => {
    if(search.get('userId')&&!userInfo.id){
      fetchGithubUserInfo(search.get('userId')!)
    }
  },[search.get('userId')])

  return (
    <>
      <div className={styles.article_wrap}>
        <div className={styles.article_content}>
          <Loading list={articleList} loading={loading}>
            {articleList.map((item, index) => {
              return (
                <a className={styles.article_content_item} key={index} onClick={(e) => handleClick(item.id!,e)}>
                  <img src={item.cover} alt="" />
                  <div className={styles.article_content_item_info}>
                    <h2 className={styles.article_content_item_info_title}>{item.title}</h2>
                    <div className={styles.article_content_item_info_desc}>{item.intro}</div>
                    <div className={styles.article_content_item_info_bottom}>
                      <div className={styles.article_content_item_info_bottom_author}>作者：Benjamin</div>
                      <div className={styles.article_content_item_info_bottom_time}>{item.createTime}</div>
                      <div className={styles.article_content_item_info_bottom_type}>
                        {typeList.find((i) => i.id === item.typeId)?.name}
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </Loading>
          {pageInfo.pageNum * pageInfo.pageSize < total && (
            <Button type="primary" block onClick={loadMore}>
              加载更多数据~
            </Button>
          )}
        </div>
        <SliderBar typeList={typeList} />
      </div>
      <ScrollToTopButton></ScrollToTopButton>

    </>
  );
}

export async function getServerSideProps(context: any) {
    const typeId = context.query?.type;
    // const {setUserInfo} = useUserStore();
    // if(context.query.userId){
    //   const userInfo = await request.get<User>(APIS.QUERY_USER+'?userId='+context.query.userId);
    //   console.log(userInfo,'userInfo');

    //   setUserInfo(userInfo);
    // }
    const initData: PageListRes<Article> = await request.post(APIS.ARTICLE_PAGE, {
      pageNum: 1,
      pageSize: 10,
      typeId: Number(typeId) || undefined,
      isAdmin: 1
    });
    const { typeList } = (await getSliderBarData())
    return {
      props: {
        initData,
        typeList
      }
    };


}
export default Home;
