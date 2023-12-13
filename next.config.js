/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    async rewrites() {
        return [
            {
                source: "/backend/phpScripts/:path*",
                destination: "http://frederikgraakjaer.dk/backend/phpScripts/:path*"
            }
        ];
    }
};
