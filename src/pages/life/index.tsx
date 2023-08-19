import Loading from '@/components/Loading';
import styles from './style/index.module.less';
import { queryLifePage } from '@/network/api/api';
import { Article } from '@/network/api/api-params-moudle';
import { Button } from 'antd';
import { useSetState } from 'react-use';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { APIS } from '@/network/api/api';
import request from '@/network/axios';
import { PageListRes } from '@/network/api/api-res-model';
function Life({ initData }: { initData: PageListRes<Article>}) {

  const [lifeList, setLifeList] = useState<Article[]>(initData.records!);
  const [total, setTotal] = useState(initData.total!);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useSetState({
    pageNum: 1,
    pageSize: 10
  });
  const fetchLifePage = async () => {
    setLoading(true);

    const res = await queryLifePage(pageInfo);
    setLoading(false);

    // setLifeList(res.records!);
    if (pageInfo.pageNum === 1) {
      setLifeList(res.records!);
    } else {
      setLifeList([...lifeList, ...res.records!]);
    }
    setTotal(res.total!);
  };
  const [shouldFetchData, setShouldFetchData] = useState(false);

  const loadMore = () => {
    if (pageInfo.pageNum * pageInfo.pageSize < total) {
      setShouldFetchData(true);
      setPageInfo({
        pageNum: pageInfo.pageNum + 1
      });
    }
  };
  useEffect(() => {
    if (shouldFetchData) {
      fetchLifePage();
    }
  }, [pageInfo.pageNum]);

  const lifeClick = (id: number) => {
    Router.push('/lifeDetail?id=' + id);
  };
  return (
    <div className={styles.life_wrap}>
      <Loading list={lifeList} loading={loading}>
        {lifeList.map((item, index) => {
          return (
            <div className={styles.life_wrap_item} key={index} onClick={() => lifeClick(item.id!)}>
              <img src={item.cover} alt="" />
              <div className={styles.life_wrap_item_info}>
                <div className={styles.life_wrap_item_info_title}>{item.title}</div>
                <div className={styles.life_wrap_item_info_desc}>{item.intro}</div>
                <div className={styles.life_wrap_item_info_bottom}>
                  <div className={styles.life_wrap_item_info_bottom_author}>作者：Benjamin</div>
                  <div className={styles.life_wrap_item_info_bottom_time}>{item.createTime}</div>
                </div>
              </div>
            </div>
          );
        })}
      </Loading>
      {pageInfo.pageNum * pageInfo.pageSize < total && (
        <Button type="primary" block onClick={loadMore}>
          加载更多数据~
        </Button>
      )}
    </div>
  );
}

export async function getStaticProps() {
    const initData: PageListRes<Article> = await request.post(APIS.LIFE_PAGE, {
      pageNum: 1,
      pageSize: 10
    });
    return {
      props: {
        initData
      }
    };
  }



export default Life;
