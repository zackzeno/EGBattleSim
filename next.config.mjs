/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true
    }
}

const productionNextConfig = {
    output: 'export',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    images: {
        loader: 'custom',
        loaderFile: './src/loader/prodloader.js'
    }
}

export default process.env.NODE_ENV === 'production' ? productionNextConfig : nextConfig
