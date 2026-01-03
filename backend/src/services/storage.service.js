const imagess = require('imagekit');

const imagek = new imagess({
    publicKey:process.env.IMAGEKIT_PUBLICKEY,
    privateKey:process.env.IMAGEKIT_PRIVATEKEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT,

});

async function dal(file, fileName){
    const result = await imagek.upload({
        file:file,
        fileName:fileName,
    })
    return result;

}

module.exports = {
    dal,
}