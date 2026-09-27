require('dotenv').config();
const { Connection, PublicKey, Keypair } = require('@solana/web3.js');

const RPC = process.env.RPC || 'https://api.devnet.solana.com';
const TREASURY = new PublicKey(process.env.TREASURY || '6XQviXJ5EceCmZq6uGrnrsxBKSnLKSvXeT7MCFF6fTb');
const RISK_URL = process.env.RISK_URL || 'https://cryptolordug.github.io/Cedars-of-Wealth/forex-risk.json';

// Load keypair from base58 private key
function loadKeypair(){
  const bs58chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  const pk = process.env.PRIVATE_KEY.trim();
  let bytes = [];
  // simple bs58 decode without extra dep
  const alphabet = bs58chars;
  let num = 0n;
  // fallback: use dynamic import if needed
  // For VPS, run: npm install bs58
  const bs58 = require('bs58');
  return Keypair.fromSecretKey(bs58.decode(pk));
}

const keypair = loadKeypair();
const conn = new Connection(RPC, 'confirmed');

async function getRisk(){
  const r = await fetch(RISK_URL+'?t='+Date.now()).then(x=>x.json());
  return r.risk ?? 40;
}

async function checkAndWithdraw(){
  try{
    const risk = await getRisk();
    console.log(new Date().toISOString(), 'risk:', risk, 'wallet:', keypair.publicKey.toBase58());
    if(risk > 70){
      console.log('HALT >70 - TRIGGER withdraw 90% to', TREASURY.toBase58());
      // await doWithdraw90(); // uncomment after devnet test
    }
  }catch(e){
    console.error('loop error', e.message);
  }
}

async function doWithdraw90(){
  console.log('doWithdraw90 placeholder - add SPL transfer ix here');
}

setInterval(checkAndWithdraw, 60000);
checkAndWithdraw();
console.log('Cedars bot started');
