module.exports = {
    devServer: {
        proxy: {
            '/api/': {
                target: 'http://52.198.52.213:10000'
            }
        }
    }
};