const MillionLint = require("@million/lint");
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  /*  experimental: {
    serverActions: true,
  }, */
  images: {
    domains: [
      "getlasso.co",
      "images.unsplash.com",
      "v5.airtableusercontent.com",
      "d1muf25xaso8hp.cloudfront.net",
      // Add the domain here
      "ik.imagekit.io",
    ],
  },
};
// module.exports = nextConfig;
// export default MillionLint.next({ rsc: true })(nextConfig);
module.exports = MillionLint.next({ rsc: true })(nextConfig);
