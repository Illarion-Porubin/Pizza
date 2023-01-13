const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true
});


class CloudinaryController {
    async delete(req, res) {
        console.log(true)
        console.log(req.params.id)
        try {
            if(req) {
                cloudinary.uploader.destroy(req.params.id).then(result=>console.log(result));
            }
        } catch (e) {
            res.status(500).json(`Не удалось картинку`)
        }    
    }
}

module.exports = new CloudinaryController();