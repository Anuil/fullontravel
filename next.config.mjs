// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

console.log("Next config loaded...");

const nextConfig = {
   eslint: {
    ignoreDuringBuilds: true,
  },
  staticPageGenerationTimeout: 120,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.fullontravel.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
 
};

export default nextConfig;

