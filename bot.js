require('dotenv').config();
const bs58 = require('bs58');
const { Connection, PublicKey, Keypair, Transaction } = require('@solana/web3.js');
const { getAssociatedTokenAddress, createTransferInstruction } = require('@solana/spl-token');

const RPC = process.env.RPC || 'https://solana-rpc.publicnode.com';
const TREASURY = new PublicKey(process.env.TREASURY || '6XQviXJ5EceCmZq6uGrnrsxBKSnLKSvXeT7MCFF6fTb');
const RISK_URL = process.env.RISK_URL || 'https://cryptolordug.github.io/Cedars-of-Wealth/forex-risk.json';
const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');

const keypair = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY.trim()));
const conn = new Connection(RPC, 'confirmed');

async function getRisk(){
  const r = await fetch(RISK_URL + '?t=' + Date.now()).then(x => x.json());
  return r.risk ?? 40;
}

async function doWithdraw90(){
  try {
    const fromAta = await getAssociatedTokenAddress(USDC_MINT, keypair.publicKey);
    const toAta = await getAssociatedTokenAddress(USDC_MINT, TREASURY);
    const bal = await conn.getTokenAccountBalance(fromAta);
    const rawAmount = BigInt(bal.value.amount);
    const amount = rawAmount * 90n / 100n;
    if (amount <= 0n) return console.log('no USDC to move');
    const ix = createTransferInstruction(fromAta, toAta, keypair.publicKey, amount);
    const { blockhash } = await conn.getLatestBlockhash();
    const tx = new Transaction({ recentBlockhash: blockhash, feePayer: keypair.publicKey }).add(ix);
    tx.sign(keypair);
    const sig = await conn.sendRawTransaction(tx.serialize());
    console.log('LIVE WITHDRAW 90% sig:', sig);
  } catch(e) {
    console.error('withdraw failed:', e.message);
  }
}

async function checkAndWithdraw(){
  try {
    const risk = await getRisk();
    console.log(new Date().toISOString(), 'risk:', risk, 'wallet:', keypair.publicKey.toBase58());
    if (risk > 70) {
      console.log('HALT risk >70 - triggering live withdraw 90% to', TREASURY.toBase58());
      await doWithdraw90();
    }
  } catch(e){ console.error('loop error', e.message); }
}

setInterval(checkAndWithdraw, 60000);
checkAndWithdraw();
console.log('Cedars bot LIVE started for', keypair.publicKey.toBase58());
