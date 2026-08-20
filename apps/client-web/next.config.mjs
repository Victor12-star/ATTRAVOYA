/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enforces Next.js to transpile our local monorepo packages natively!
  // This completely resolves "Unsupported Server Component type" and import errors.
  transpilePackages: ["@attravoya/config", "@attravoya/validation"],
};

export default nextConfig;
