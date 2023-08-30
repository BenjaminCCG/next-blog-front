import Document, { Head, Html, Main, NextScript } from 'next/document';
import { AppConfig } from '../utils/AppConfig';
// Need to create a custom _document because i18n support is not compatible with `next export`.
const noOverlayWorkaroundScript = `
  window.addEventListener('error', event => {
    event.stopImmediatePropagation()
  })

  window.addEventListener('unhandledrejection', event => {
    event.stopImmediatePropagation()
  })
`
class MyDocument extends Document {
  public render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head >
        {process.env.NODE_ENV !== 'production' && <script dangerouslySetInnerHTML={{ __html: noOverlayWorkaroundScript }} />}
            <link rel="stylesheet" href="//at.alicdn.com/t/c/font_4225926_nr625sqckjq.css" />
           </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <script src="/assets/js/heart.js"></script>
        <script src="/assets/js/flower.js"></script>
      </Html>
    );
  }
}

export default MyDocument;
