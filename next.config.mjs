/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.myanimelist.net",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "storage.googleapis.com",
                port: "",
                pathname: "/anidex-profile-images/**",
            },
            {
                protocol: "https",
                hostname: "myanimelist.net",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "img.youtube.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
