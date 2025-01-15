// next.config.mjs
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
      ignoreDuringBuilds: true, // Ignores all lint errors during build
    },
    
  };
  
  export default nextConfig;
  