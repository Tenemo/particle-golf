import webpack, { Configuration } from 'webpack';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const commonConfig: Configuration = {
    target: `web`,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                PORT: JSON.stringify(process.env.PORT),
                ANALYZE: JSON.stringify(process.env.ANALYZE),
                SENTRY_DSN: JSON.stringify(process.env.SENTRY_DSN),
            },
        }),
    ],
    resolve: {
        extensions: [`.ts`, `.tsx`, `.js`, `.jsx`, `.css`, `.scss`],
    },
    performance: {
        hints: false,
    },
};
