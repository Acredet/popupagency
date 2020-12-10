const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
	userId: mongoose.Schema.Types.ObjectId,
	title: {
		routeGuidance: {
			coordinates: {
				type: [Number],
				index: "2dsphere",
			},
			formattedAddress: {
				type: String,
				required: true,
			},
		},
		en: {
			type: String,
			// required: true,
			unique: true,
		},
		sv: {
			type: String,
			// required: true,
			unique: true,
		},
	},
	beskreving: {
		en: {
			type: String,
			default: "",
		},
		sv: {
			type: String,
			default: "",
		},
	},
	bildgalleri: Array,
	cover: Array,
	epost: String,
	prisperdag: {
		// ✔
		type: Number,
		min: 0,
	},
	prisperhelg: {
		// ✔
		type: Number,
		min: 0,
	},
	prisperlanghelg: {
		// ✔
		type: Number,
		min: 0,
	},
	prispervecka: {
		// ✔
		type: Number,
		min: 0,
	},
	prispermanad: {
		// ✔
		type: Number,
		min: 0,
	},
	prioteradpris: {
		// ✔
		period: {
			type: String,
		},
		val: {
			type: Number,
			min: 0,
		},
	},
	egenskaper: [Object],
	yta: {
		// ✔
		type: Number,
		min: 0,
	},
	placering: String,
	stad: {
		en: {
			type: String,
			default: "",
		},
		sv: {
			type: String,
			default: "",
		},
	},
	plats: String,
	kategori: Array,
	planritning: Array,
	minstahyresperiod: String,
	langstahyresperiod: String,
	fasta: Boolean,
	butik: Boolean,
	mat: Boolean,
	event: Boolean,
	sasongBoxen: String,
	timezone: String,
	vagvisningen: String,
	centrumgalleri: Array,
	fran: Date,
	till: Date,
	kontaktperson: String,
	expiry: Date,
	draft: {
		type: Boolean,
		default: false,
	},
	views: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Place", PlaceSchema);
