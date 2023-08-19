import { Empty, Skeleton } from 'antd';
import React from 'react';

interface Props {
  list: any[];
  loading: boolean;
  children: React.ReactNode;
}
export default function Loading(props: Props) {
  return (
    <>
      {props.loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : props.list.length > 0 ? (
        props.children
      ) : (
        <Empty description="暂无数据" />
      )}
    </>
  );
}
