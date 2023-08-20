const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withLess = require("next-with-less");
module.exports = withLess(withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  env: {
    API_BASE_URL: process.env.NEXT_PUBLIC_VITE_API_BASE_URL,
  },
  poweredByHeader: false,
  trailingSlash: true,
  reactDevOverlay: false,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  // reactStrictMode: true,
  rewrites: async () => [
    { source: '/api/:path*',
      destination: `http://127.0.0.1:8090/:path*` },
  ]
  

}));
