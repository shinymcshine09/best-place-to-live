/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'flagcdn.com',
                pathname: '/w320/**', // This is the directory you're using for flags
            },
        ],
    },
};
  
export default nextConfig;