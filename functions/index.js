// functions/index.js
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const TronWeb = require('tronweb');
const tron = new TronWeb({fullHost:'https://api.trongrid.io', privateKey: process.env.TRON_PK});

exports.sendFee = onDocumentCreated("fee_queue/{id}", async (e)=>{
  const d = e.data.data();
  // $5 USDT TRC20 = 5 * 1e6
  await tron.contract().at("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t")
    .transfer(d.to, 5_000_000).send();
});
