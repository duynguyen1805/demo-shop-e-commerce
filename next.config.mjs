/** @type {import('next').NextConfig} */
const nextConfig = {
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
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
