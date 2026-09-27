require('dotenv').config();
const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
const bs58 = require('bs58');

const RPC = process.env.RPC || 'https://api.devnet.solana.com';
const TREASURY = new PublicKey(process.env.TREASURY || '6XQviXJ5EceCmZq6uGrnrsxBKSnLKSvXeT7MCFF6fTb');
const RISK_URL = process.env.RISK_URL || 'https://cryptolordug.github.io/Cedars-of-Wealth/forex-risk.json';
const keypair = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY.trim()));
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
    }
  }catch(e){ console.error('loop error', e.message); }
}

setInterval(checkAndWithdraw, 60000);
checkAndWithdraw();
console.log('Cedars bot started');
