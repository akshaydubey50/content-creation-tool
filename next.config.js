/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    
    images: {
      domains: [
        'getlasso.co',
        'images.unsplash.com',
        'd1muf25xaso8hp.cloudfront.net' // Add the domain here
      ]
    },
  }
  
  module.exports = nextConfig;
  