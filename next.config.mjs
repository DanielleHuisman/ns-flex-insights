import createNextIntlPlugin from 'next-intl/plugin';

import './src/env.mjs';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        webpackBuildWorker: true
    },
    webpack: (config) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        config.resolve.fallback = {
            fs: false
        };

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return config;
    }
};

export default withNextIntl(nextConfig);
