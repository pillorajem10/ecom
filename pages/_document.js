import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../src/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <meta property="og:description" content="Full-stack developer that can create your website for your business" key="ogdesc" />
          {/*<meta name="description" content="Full-stack developer" />
          <meta name="keywords" content="full-stack developer, MERN stack developer, freelance developer" />
          <meta
            property="og:title"
            content="JemPillora"
            key="title"
          />
          <meta
            property="og:description"
            content="Full-stack developer that can create your website for your business"
            key="description"
          />
          <meta
            property="og:image"
            content="%PUBLIC_URL%/favicon.jpeg"
            key="image"
          />
          <meta
            property="og:site_name"
            content="JemPillora"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://jempillora.vercel.app/" key="og:url"/>*/}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};
