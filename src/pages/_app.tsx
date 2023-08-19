import '../styles/global.css';

import type { AppProps } from 'next/app';

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
    <Component {...pageProps} />
  </Layout>
  </ConfigProvider>
);

export default MyApp;
