const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
	{
		savedFilters: {
			type: Array,
			default: [],
		},
		name: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 50,
		},
		email: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 255,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 1024,
		},
		role: {
			type: String,
			default: "searcher",
		},
		fav: {
			type: [String],
			default: [],
		},
	},
	{ timestamps: { createdAt: "created_at" } }
);

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, isAdmin: this.role === "admin" },
		process.env.jwtPrivateKey
	);
	return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
	const schema = {
		name: Joi.string().min(5).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		role: Joi.string(),
		password: Joi.string().min(5).max(255).required(),
	};
	return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
