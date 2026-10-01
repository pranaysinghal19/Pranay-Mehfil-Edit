// Swappable OTP boundary.
// Replace this module's provider import when Twilio or another real provider is added.
// Route code should continue calling sendOTP / verifyOTP unchanged.

module.exports = require('./mockOtpProvider');
