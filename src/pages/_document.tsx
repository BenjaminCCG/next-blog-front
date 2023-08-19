import Document, { Head, Html, Main, NextScript } from 'next/document';
import { AppConfig } from '../utils/AppConfig';

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this




  public render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head />
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
