import * as path from 'path';

import * as webpack from 'webpack';

const extConfig: webpack.Configuration = {
    target: "node",
    entry: "./src/extension.ts",
    output: {
        filename: "extension.js",
        libraryTarget: "commonjs2",
        path: path.resolve(__dirname, "out"),
    },
    resolve: { extensions: [".ts", ".js"] },
    module: { rules: [{ test: /\.ts$/, loader: "ts-loader" }] },
    externals: { vscode: "vscode" },

};


const webviewConfig: webpack.Configuration = {
    target: "web",
    entry: "./webview-src/index.tsx",
    output: {
        filename: "[name].wv.js",
        path: path.resolve(__dirname, "out"),
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    module: {
        rules: [{
            test: /\.tsx?$/, use: [
                { loader: "babel-loader" },
                {
                    loader: 'ts-loader', options: { configFile: "tsconfig.webview.json", transpileOnly: true }
                }],
        }]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};
export default [webviewConfig, extConfig];