const express = require("express");
const auth = require("../middleware/auth");
const { multer } = require("../middleware/upload");

const {
	getPublishedPlaces,
	getDraftPlaces,
	getPlacesAddedByUser,
	addPlace,
	deletePlace,
	updatePlace,
	getOnePlace,
	deleteAllPlace,
	getAddress,
	getAddressByCountryName,
	addWatch,
} = require("../controller/places");
const fields = [
	{ name: "bildgalleri[]" },
	{ name: "cover[]" },
	{ name: "planritning[]" },
];
const router = express.Router();

router
	.route("/", auth)
	.get(getPublishedPlaces)
	.post(auth, multer.fields(fields), addPlace)
	.delete(deleteAllPlace);

router
	.route("/:id", auth)
	.get(getOnePlace)
	.delete(deletePlace)
	.patch(multer.none(), updatePlace);

router.get("/user/:userid", auth, getPlacesAddedByUser);
router.get("/listings/drafts", auth, getDraftPlaces);
router.patch("/view/:id", addWatch);

router.post("/address", getAddress);
router.post("/address-by-country-name", getAddressByCountryName);

router.post("/images", multer.fields(fields), (req, res) => {
	const names = req.files[req.body.name].map((file) => file.filename);
	return res.status(200).json(...names);
});
module.exports = router;
