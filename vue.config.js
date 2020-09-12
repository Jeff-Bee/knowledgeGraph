module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    runtimeCompiler: true,
    lintOnSave: false, // eslint-loader 是否在保存的时候检查

    devServer: {
        disableHostCheck: true,
        port: 8080,
    }
}