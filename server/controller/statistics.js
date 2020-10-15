const Category = require('../models/category')
const Region = require('../models/region')
const Tag = require('../models/tag')
const Centrum = require('../models/centrum')
const Place = require('../models/place')
const { User } = require('../models/user')

exports.getStatics = async (req, res) => {
  const allCentrum = await Centrum.countDocuments({})
  const allPlace = await Place.countDocuments({})

  const allCategory = await Category.countDocuments({})
  const allRegion = await Region.countDocuments({})
  const allTag = await Tag.countDocuments({})

  const users = {
    admin: await User.countDocuments({ role: 'admin' }),
    searcher: await User.countDocuments({ role: 'searcher' }),
    manager: await User.countDocuments({ role: 'manager' }),
    owner: await User.countDocuments({ role: 'owner' })
  }

  res.status(200).json({ allCentrum, allPlace, users, allCategory, allRegion, allTag })
}
