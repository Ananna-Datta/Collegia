/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
    ],
    // OR to allow all external:
    // remotePatterns: [{ protocol: "https", hostname: "**", pathname: "/**" }],
  },
};

export default nextConfig;
