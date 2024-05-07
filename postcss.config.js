module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue({ file }) {
                // return file.indexOf('vant') !== -1 ? 16 : 32
                return file.indexOf('vant') !== -1 ? 16 : 16
            },
            propList: ['*']
        }
    }
}