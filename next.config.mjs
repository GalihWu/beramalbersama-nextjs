/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compress: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.kitabisa.cc',
      },
      {
        protocol: 'https',
        hostname: 'aksiberbagi.com',
      },
      {
        protocol: 'https',
        hostname: 'ramadhan.aksiberbagi.com',
      },
      {
        protocol: 'https',
        hostname: 'admin.aksiberbagi.com',
      },
      {
        protocol: 'https',
        hostname: 'akber-revamp.test',
      },
    ],
  },
  // Add assetPrefix for static files
  // assetPrefix: 'https://staging.aksiberbagi.com',

  // Optionally enable output tracing if on a more complex server setup
  // output: "standalone", // Helps in some server deployments
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=600, stale-while-revalidate',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source:
          '/:slug((?!img|fonts|video|auth|transaction|home|user|blogs|donasi|login|lupa-password|register|mutasi-saku|login-otp|set-password|donasi-saya|hitung-zakat|profil|syarat-ketentuan|tentang|wallet|help|invoice|konfirmasi|tracking|campaign|infaq|kontak|alquran|event|bio|mitra|$).*)',
        destination: '/donasi/detail/:slug',
        permanent: false, // Set to true if this is a permanent redirect
      },
      {
        source: '/campaign/:slug',
        destination: '/donasi/detail/:slug',
        permanent: true, // Use 301 for permanent redirects
      },
    ];
  },
};

export default nextConfig;
// && cp -r public .next/standalone/public && cp -r .next/static .next/standalone/.next/static
