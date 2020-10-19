const express = require('express')
const auth = require('../middleware/auth')
const { getCentrums, getOneCentrum, addCentrum, deleteCentrum, getAddress, updateCentrum, getAddressByCountryName } = require('../controller/centrum')
const router = express.Router()
const { multer, uploadImage } = require('../middleware/upload')

const fields = [{ name: 'centrumgalleri[]' }]

router
  .route('/', auth)
  .get(getCentrums)
  .post(multer.fields(fields), addCentrum)

router
  .route('/:id', auth)
  .get(getOneCentrum)
  .delete(deleteCentrum)
  .patch(multer.fields(fields), updateCentrum)

router.post('/address', getAddress)
router.post('/address-by-country-name', getAddressByCountryName)

router.post('/images', multer.single('centrumgalleri'), uploadImage)

module.exports = router
