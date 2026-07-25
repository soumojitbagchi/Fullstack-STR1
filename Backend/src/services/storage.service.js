const imageKit= require("@imagekit/nodejs").default()
const {toFile}= require('@imagekit/nodejs')

const client = new imageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

const uploadFile=async (buffer , fileName, folder="")=>{
    const file = await client.files.upload({
        file:await imageKit.toFile(Buffer.from(buffer)),
        fileName:fileName,
        folder:"fullstack-STR"
    })
    return file
}
module.exports=uploadFile