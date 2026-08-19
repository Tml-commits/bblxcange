import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.coingecko.com" },
      { protocol: "https", hostname: "coin-images.coingecko.com" },
      { protocol: "https", hostname: "cdn.coinranking.com" },
      { protocol: "https", hostname: "resource.cwallet.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "resource.ccpayment.com" },
      // Mobile landing page assets
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.txoin.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "img-16169.orzbhae.com" },
      // Binance / CoinGecko
      { protocol: "https", hostname: "**.binance.com" },
      { protocol: "https", hostname: "s2.coinmarketcap.com" },
    ],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
