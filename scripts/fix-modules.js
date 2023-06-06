const fs = require('fs');
const fixWindowError = () => {
  const file = './node_modules/bitcore-lib/lib/crypto/random.js';
  let fileData = fs.readFileSync(file).toString();
  fileData = fileData.replace(
    `Random.getRandomBufferBrowser = function(size) {
  if (!window.crypto && !window.msCrypto)
    throw new Error('window.crypto not available');

  if (window.crypto && window.crypto.getRandomValues)
    var crypto = window.crypto;
  else if (window.msCrypto && window.msCrypto.getRandomValues) //internet explorer
    var crypto = window.msCrypto;
  else
    throw new Error('window.crypto.getRandomValues not available');

  var bbuf = new Uint8Array(size);
  crypto.getRandomValues(bbuf);
  var buf = Buffer.from(bbuf);

  return buf;
};`,
    `Random.getRandomBufferBrowser = function(size) {
  var bbuf = new Uint8Array(size);
  crypto.getRandomValues(bbuf);
  var buf = Buffer.from(bbuf);

  return buf;
};`
  );
  fs.writeFileSync(file, fileData);
};

const fixWindowError2 = () => {
  const file = './node_modules/tiny-secp256k1/lib/rand.browser.js';
  let fileData = fs.readFileSync(file).toString();
  fileData = fileData.replace('window.crypto', 'crypto');
  fs.writeFileSync(file, fileData);
};

const fixWindowError3 = () => {
  const file = './node_modules/bitcoinjs-lib/src/payments/p2tr.js';
  let fileData = fs.readFileSync(file).toString();
  fileData = fileData.replace(
    'signature: types_1.typeforce.maybe(types_1.typeforce.BufferN(64))',
    'signature: types_1.typeforce.maybe(types_1.typeforce.Buffer)'
  );
  fs.writeFileSync(file, fileData);
};

const fixBufferError = () => {
  const file = './node_modules/bitcore-lib/lib/crypto/signature.js';
  let fileData = fs.readFileSync(file).toString();
  fileData = fileData.replace(
    `var Signature = function Signature(r, s) {
  if (!(this instanceof Signature)) {
    return new Signature(r, s);
  }
  if (r instanceof BN) {
    this.set({
      r: r,
      s: s
    });
  } else if (r) {
    var obj = r;
    this.set(obj);
  }
};`,
    `var Signature = function Signature(r, s) {
  if (!(this instanceof Signature)) {
    return new Signature(r, s);
  }
  if (r instanceof BN) {
    this.set({
      r: r,
      s: s
    });
  } else if (r) {
    var obj = r;
    this.set(obj);
  }

  this.r = BN.fromString(this.r.toString(16), 16)
  this.s = BN.fromString(this.s.toString(16),16)
};`
  );
  fs.writeFileSync(file, fileData);
};

const fixBufferWhenRecoverMessageError = () => {
  const file = './node_modules/bitcore-lib/lib/crypto/signature.js';
  let fileData = fs.readFileSync(file).toString();
  fileData = fileData.replace(
    `Signature.fromCompact = function(buf) {
  $.checkArgument(BufferUtil.isBuffer(buf), 'Argument is expected to be a Buffer');

  var sig = new Signature();

  var compressed = true;
  var i = buf.slice(0, 1)[0] - 27 - 4;
  if (i < 0) {
    compressed = false;
    i = i + 4;
  }

  var b2 = buf.slice(1, 33);
  var b3 = buf.slice(33, 65);

  $.checkArgument(i === 0 || i === 1 || i === 2 || i === 3, new Error('i must be 0, 1, 2, or 3'));
  $.checkArgument(b2.length === 32, new Error('r must be 32 bytes'));
  $.checkArgument(b3.length === 32, new Error('s must be 32 bytes'));

  sig.compressed = compressed;
  sig.i = i;
  sig.r = BN.fromBuffer(b2);
  sig.s = BN.fromBuffer(b3);

  return sig;
};`,
    `Signature.fromCompact = function(buf) {
  $.checkArgument(BufferUtil.isBuffer(buf), 'Argument is expected to be a Buffer');

  var compressed = true;
  var i = buf.slice(0, 1)[0] - 27 - 4;
  if (i < 0) {
    compressed = false;
    i = i + 4;
  }

  var b2 = buf.slice(1, 33);
  var b3 = buf.slice(33, 65);

  $.checkArgument(i === 0 || i === 1 || i === 2 || i === 3, new Error('i must be 0, 1, 2, or 3'));
  $.checkArgument(b2.length === 32, new Error('r must be 32 bytes'));
  $.checkArgument(b3.length === 32, new Error('s must be 32 bytes'));

  var sig = new Signature(BN.fromBuffer(b2), BN.fromBuffer(b3));
  sig.compressed = compressed;
  sig.i = i;

  return sig;
};`
  );
  fs.writeFileSync(file, fileData);
};

const run = async () => {
  let success = true;
  try {
    fixWindowError();
    fixWindowError2();
    fixWindowError3();
    fixBufferError();
    fixBufferWhenRecoverMessageError();
  } catch (e) {
    console.error('error:', e.message);
    success = false;
  } finally {
    console.log('Fix modules result: ', success ? 'success' : 'failed');
  }
};

run();
