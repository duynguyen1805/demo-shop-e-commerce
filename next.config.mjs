/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "scontent.webpluscnd.net",
        port: "",
        pathname: "/photos-df/**",
      },
      {
        protocol: "https",
        hostname: "cf.shopee.vn",
        port: "",
        pathname: "/file/**",
      },
      {
        protocol: "https",
        hostname: "down-vn.img.susercontent.com",
        port: "",
        pathname: "/file/**",
      },
      {
        protocol: "https",
        hostname: "cdn2.cellphones.com.vn",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
