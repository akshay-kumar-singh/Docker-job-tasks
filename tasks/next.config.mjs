/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      MONGODB_URI: process.env.MONGODB_URI,  // Environment variable for MongoDB connection
    },
  };
  
  export default nextConfig;
  