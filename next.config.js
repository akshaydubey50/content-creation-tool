/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
  /*  experimental: {
    serverActions: true,
  }, */ output: "standalone",
  images: {
    domains: [
      "getlasso.co",
      "images.unsplash.com",
      "v5.airtableusercontent.com",
      "d1muf25xaso8hp.cloudfront.net",
      // Add the domain here
      "ik.imagekit.io",
      "placehold.co",
      "media.licdn.com",
      "pbs.twimg.com"
    ],
  },
};
module.exports = nextConfig;
// export default MillionLint.next({ rsc: true })(nextConfig);
