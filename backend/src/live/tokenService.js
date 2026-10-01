const crypto = require('node:crypto');

const DEFAULT_TTL_MS = 120 * 1000;

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function issueLiveToken({ ttlMs = DEFAULT_TTL_MS, now = Date.now() } = {}) {
  const token = crypto.randomBytes(32).toString('base64url');
  return {
    token,
    tokenHash: hashToken(token),
    issuedAt: new Date(now),
    expiresAt: new Date(now + ttlMs),
  };
}

function isExpired(expiresAt, now = Date.now()) {
  return new Date(expiresAt).getTime() <= now;
}

function safelyMatchesToken(rawToken, storedHash) {
  if (!rawToken || !storedHash) return false;

  const candidate = Buffer.from(hashToken(rawToken), 'hex');
  const expected = Buffer.from(storedHash, 'hex');

  if (candidate.length !== expected.length) return false;
  return crypto.timingSafeEqual(candidate, expected);
}

module.exports = {
  DEFAULT_TTL_MS,
  hashToken,
  issueLiveToken,
  isExpired,
  safelyMatchesToken,
};
