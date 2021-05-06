
const generateRandomString = (length=6)=>Math.random().toString(20).substr(2, length);
const randStr32 = sha256(generateRandomString(32));
const timestamp = sha256(Date.now());
const sign = abc;
