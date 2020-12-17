const express = require("express");
const router = express.Router();
const Place = require("../models/place");
const Region = require("../models/region");
const Tag = require("../models/tag");
const Category = require("../models/category");
const Centrum = require("../models/centrum");

router.get("/", async (req, res) => {
	try {
		const regions = await Region.find({}, { __v: 0 });
		const tags = await Tag.find({}, { __v: 0 });
		const categories = await Category.find({}, { __v: 0 });
		const centrums = await Centrum.find({}, { __v: 0 });
		const places = await Place.find({ draft: false }, { __v: -0 });
		const listings = [];
		for (let place of places) {
			let newPlace = { ...place.toObject() };
			const listingRegion = regions.find(
				(region) => region.name.en === place.stad.en
			);
			if (listingRegion.centrum) {
				const centrum = await Centrum.findById(listingRegion.centrum);
				if (centrum) {
					newPlace.centurmTitle = centrum.title;
					newPlace.hemsida = centrum.hemsida;
					newPlace.centrumgalleri = centrum.centrumgalleri;
					newPlace.centrumtextarea = centrum.centrumtextarea;
					newPlace.oppettider = centrum.oppettider;
					// newPlace.location = centrum.routeGuidance;
				}
			}
			listings.push(newPlace);
		}
		res.status(200).json({ listings, tags, categories, regions, centrums });
	} catch (e) {
		res.status(401).json({
			error: true,
			message: "error fetching the available popups",
		});
	}
});
module.exports = router;
