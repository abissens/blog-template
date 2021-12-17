const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        common: './src/common.ts',
        index: './src/index.ts',
        page: './src/page.ts',
    },
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'output'),
    },
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'static', to: '' },
            ],
        }),
    ],
};