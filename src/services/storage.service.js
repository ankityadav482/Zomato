const ImageKit = require('imagekit')

const imagekit = new ImageKit({
    publicKey: 'public_zCRAr68RuX6yhceLB+PiIXq6wuQ=',
    privateKey: 'private_c+eNkv7ks1lDnVWsIHMDP9rhi9o=',
    urlEndpoint:'https://ik.imagekit.io/xr1zbzbcf'
})

async function uploadFile(file, fileName){
    const result = await imagekit.upload({
        file:file,
        fileName:fileName
    })
    return result;
}

module.exports = {
    uploadFile
}