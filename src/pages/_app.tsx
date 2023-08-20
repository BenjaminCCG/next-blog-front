import '../styles/global.css';

import type { AppProps } from 'next/app';
import ScrollToTopButton from '@/components/ScrollTop';

import Layout from '@/layout';
import { ConfigProvider } from 'antd';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider
  theme={{
    token: {
      colorPrimary: '#97dffd'
    }
  }}
>
  <Layout>
  <ScrollToTopButton></ScrollToTopButton>
    <Component {...pageProps} />
  </Layout>
  </ConfigProvider>
);

export default MyApp;
