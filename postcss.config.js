module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue({ file }) {
                // return file.indexOf('vant') !== -1 ? 16 : 32
                return file.indexOf('vant') !== -1 ? 16 : 16
            },
            propList: ['*'],
            // 配置不要转换的样式资源
            exclude: 'github-markdown'
        }
    }
}