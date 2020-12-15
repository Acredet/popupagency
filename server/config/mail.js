// import nodemailer from "nodemailer"
const nodemailer = require("nodemailer");
const config = require("../config/default.json");

const transporter = nodemailer.createTransport({
	host: "mailcluster.loopia.se",
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: config.user,
		pass: config.pass,
	},
	tls: {
		rejectUnauthorized: false,
	},
});
exports.transporter = transporter;
const getPasswordResetURL = (user, token) => {
	//  `http://popup.dk.se/api/mail/${user._id}/${token}`

	if (user.lang === "en") {
		return `http://popup.dk.se/en/settings/${user._id}/${token}/forgetPassword`;
	}
	return `http://popup.dk.se/settings/${user._id}/${token}/forgetPassword`;
};
exports.getPasswordResetURL = getPasswordResetURL;

const resetPasswordTemplate = (user, url) => {
	const from = "no-reply@Popup.se";
	const to = user.email;
	const subject = "🌻 Popup Password Reset 🌻";
	const html = `
  <p>Hey ${user.name || user.email},</p>
  <p>We heard that you lost your Popup password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Do something outside today! </p>
  <p>–Your friends at Popup</p>
  `;

	return { from, to, subject, html };
};

const bookingTemplate = (user, details) => {
	const from = "no-reply@Popup.se";
	const to = user.email;
	const subject = "🌻 Popup Booking Serivce 🌻";
	const html = `
	<p>Hi <b>${user.name}</b> you have a new listing booking:</p>
	${
		details.link
			? `<p>Listing : <b>https://popup.dk.se/${details.link}</b></p>`
			: ""
	} 
	${details.name ? `<p>From : <b>${details.name}</b></p>` : ""} 
	${details.phone ? `<p>Telefon : <b>${details.phone}</b></p>` : ""} 
	${details.email ? `<p>Email : <b>${details.email}</b></p>` : ""} 
	${details.from ? `<p>From : <b>${details.from}</b></p>` : ""} 
	${details.to ? `<p>To : <b>${details.to}</b></p>` : ""} 
	${details.message ? `<p>Details : <b>${details.message}</b></p>` : ""} 
	  
	<p>–Your friends at Popup</p>
  `;

	return { from, to, subject, html };
};

exports.resetPasswordTemplate = resetPasswordTemplate;
exports.bookingTemplate = bookingTemplate;
