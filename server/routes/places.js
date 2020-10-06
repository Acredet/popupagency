const express = require('express')
const auth = require('../middleware/auth')
const { multer } = require('../middleware/upload')

const {
  getPlaces,
  getPlacesAddedByUser,
  addPlace,
  deletePlace,
  updatePlace,
  getOnePlace
} = require('../controller/places')
const fields = [{ name: 'bildgalleri[]' }, { name: 'cover[]' }, { name: 'planritning[]' }]
const router = express.Router()

router
  .route('/', auth)
  .get(getPlaces)
  .post(auth, multer.fields(fields), addPlace)

router
  .route('/:id', auth)
  .get(getOnePlace)
  .delete(deletePlace)
  .patch(multer.none(), updatePlace)

router.get('/user/:userid', auth, getPlacesAddedByUser)

router.post('/images', multer.fields(fields), (req, res) => {
  console.log(req.files[req.body.name], req.body.name)
  const names = req.files[req.body.name].map(file => file.filename)
  return res.status(200).json(...names)
})
module.exports = router
