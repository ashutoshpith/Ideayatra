/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
  swcMinify: false, // Disable SWC minification

  webpack: (config, { isServer }) => {
    config.optimization.minimize = false;
    config.module.rules.push({
      test: /\.(webm|mp4|ogg)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]",
          outputPath: "static/videos/",
          publicPath: "/_next/static/videos/",
        },
      },
    });

    return config;
  },
};

export default nextConfig;
