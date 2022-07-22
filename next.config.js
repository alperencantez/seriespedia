/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["static.tvmaze.com", "www.invenura.com"],
  },
};

module.exports = nextConfig;
