function getUserId(req) {
  if (!req.session) return null;
  const v = req.session.userId;
  if (v === undefined || v === null) return null;
  if (typeof v === 'number') return v;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function isAdmin(req) {
  if (!req.session) return false;
  return String(req.session.isAdmin || '') === 'true' || req.session.isAdmin === true;
}

module.exports = { getUserId, isAdmin };

