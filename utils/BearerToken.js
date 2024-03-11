const getBearerToken = (token = '') => {
  return token.replace('Bearer', '').trim();
};

module.exports = getBearerToken;
