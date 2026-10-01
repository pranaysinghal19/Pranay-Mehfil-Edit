const MOCK_CODE = '123456';
const NETWORK_DELAY_MS = 500;

function delay() {
  return new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY_MS));
}

async function sendOTP(phone) {
  await delay();
  return {
    provider: 'mock',
    phone,
    delivered: true,
  };
}

async function verifyOTP(phone, code) {
  await delay();
  return {
    phone,
    verified: code === MOCK_CODE,
  };
}

module.exports = { sendOTP, verifyOTP };
