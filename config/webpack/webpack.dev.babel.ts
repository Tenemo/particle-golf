import path from 'path';
import { merge } from 'webpack-merge';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ReactRefreshBabel from 'react-refresh/babel';
import webpack, { WatchIgnorePlugin } from 'webpack';

import { commonConfig } from './webpack.common.babel';
import packageJSON from '../../package.json';

const PORT = process.env.PORT || 3000;

export default merge(commonConfig, {
    mode: `development`,
    devServer: {
        historyApiFallback: true,
        port: PORT as number,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': `*`,
        },
    },
    entry: [
        `core-js/stable`,
        `react`,
        `react-dom`,
        `eventsource-polyfill`,
        path.join(process.cwd(), `src/index`),
    ],
    output: {
        filename: `[name].js`,
        publicPath: `http://localhost:${PORT}/`,
    },
    devtool: `eval-source-map`,
    plugins: [
        new HtmlWebpackPlugin({
            title: packageJSON.name,
            template: `src/index.html`,
            inject: true,
        }),
        // remove the plugin if it doesn't work at all, otherwise the error is due to incorrect @types
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            failOnError: false,
        }),
        new WatchIgnorePlugin({ paths: [/(css|scss)\.d\.ts$/] }),
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
    ],
    optimization: {
        minimize: false,
        emitOnErrors: false,
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: `babel-loader`,
                        // typings not available yet
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        options: { plugins: [ReactRefreshBabel] },
                    },
                ],
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    `style-loader`,
                    {
                        loader: '@teamsupercell/typings-for-css-modules-loader',
                        options: {
                            formatter: 'prettier',
                            banner:
                                '// Automatically generated by @teamsupercell/typings-for-css-modules-loader. \n// Please do not edit this file manually.',
                        },
                    },
                    {
                        loader: `css-loader`,
                        options: {
                            modules: {
                                localIdentName: `[path]__[local]`,
                                auto: (resourcePath: string) =>
                                    !resourcePath.includes('node_modules') &&
                                    !resourcePath.includes('global.'),
                            },
                            sourceMap: true,
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: `postcss-loader`,
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-flexbugs-fixes',
                                    'autoprefixer',
                                ],
                            },
                            sourceMap: true,
                        },
                    },
                    {
                        loader: `sass-loader`,
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|svg|ttf|eot)$/,
                use: [
                    {
                        loader: `url-loader`,
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/,
                use: [
                    {
                        loader: `url-loader`,
                    },
                ],
            },
        ],
    },
});
