import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'eu-central-1',
})

const upload = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString())
    },
  }),
})

export const uploadMiddleware = upload.single('file')

export const uploadController = (req, res) => {
  const {
    file: { location },
  } = req
  res.json({ location })
}
