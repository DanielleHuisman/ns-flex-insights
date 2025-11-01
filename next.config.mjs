import createNextIntlPlugin from 'next-intl/plugin';

import './src/env.mjs';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    turbopack: {
        resolveAlias: {
            fs: {
                browser: './src/fs.ts'
            }
        }
    }
};

export default withNextIntl(nextConfig);
