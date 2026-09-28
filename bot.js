require('dotenv').config();
const bs58 = require('bs58');
const { Connection, PublicKey, Keypair, VersionedTransaction, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const fs = require('fs');

const RPC = process.env.RPC || 'https://solana-rpc.publicnode.com';
const TREASURY = new PublicKey(process.env.TREASURY || '6XQviXJ5EceCmZq6uGrnrsxBKSnLKSvXeT7MCFF6fTb');
const RISK_URL = process.env.RISK_URL || 'https://cryptolordug.github.io/Cedars-of-Wealth/forex-risk.json';
const keypair = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY.trim()));
const conn = new Connection(RPC, 'confirmed');

// 4 FOUNDATIONS CONFIG
const MIN_TRADE_SOL = 0.005; // ~$1
const FEE_RESERVE_SOL = 0.01; // Capital Preservation: never touch
const MAX_TRADES_PER_HOUR = 1;
let lastTradeTime = 0;
const LOG_FILE = './trades.jsonl';

function logTrade(data){
  const entry = { time: new Date().toISOString(), wallet: keypair.publicKey.toBase58(), ...data };
  fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + '\n'); // Verified Profitability + Transparency
  console.log('TRADE_LOG:', entry);
}

async function getRisk(){
  const r = await fetch(RISK_URL + '?t=' + Date.now()).then(x => x.json());
  return r.risk ?? 40;
}

async function getSolBalance(){
  const bal = await conn.getBalance(keypair.publicKey);
  return bal / LAMPORTS_PER_SOL;
}

async function jupiterSwap(inputMint, outputMint, amountLamports){
  // Risk Control + Transparency: get quote first
  const quoteRes = await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amountLamports}&slippageBps=100`);
  const quote = await quoteRes.json();
  if(!quote.routePlan) throw new Error('No Jupiter route');
  
  const swapRes = await fetch('https://quote-api.jup.ag/v6/swap', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ quoteResponse: quote, userPublicKey: keypair.publicKey.toBase58(), wrapAndUnwrapSol: true })
  });
  const { swapTransaction } = await swapRes.json();
  const buf = Buffer.from(swapTransaction, 'base64');
  const tx = VersionedTransaction.deserialize(buf);
  tx.sign([keypair]);
  const sig = await conn.sendTransaction(tx, { maxRetries: 3 });
  return { sig, quote };
}

async function checkAndTrade(){
  try{
    const risk = await getRisk();
    const solBal = await getSolBalance();
    console.log(new Date().toISOString(), `risk:${risk} SOL:${solBal.toFixed(4)} wallet:${keypair.publicKey.toBase58()}`);

    // Capital Preservation + Risk Control
    if(risk > 70){
      console.log('HALT risk >70 - Risk Control triggered, no trades');
      return;
    }
    if(Date.now() - lastTradeTime < 3600000 / MAX_TRADES_PER_HOUR){
      return; // max 1/hour
    }
    const tradable = solBal - FEE_RESERVE_SOL;
    if(risk < 50 && tradable >= MIN_TRADE_SOL){
      console.log(`Verified signal risk<50 - swapping ${MIN_TRADE_SOL} SOL -> USDC`);
      const SOL_MINT = 'So11111111111111111111111111111111111111112';
      const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
      const amountLamports = Math.floor(MIN_TRADE_SOL * LAMPORTS_PER_SOL);
      const { sig, quote } = await jupiterSwap(SOL_MINT, USDC_MINT, amountLamports);
      lastTradeTime = Date.now();
      logTrade({ type: 'SOL->USDC', amountSOL: MIN_TRADE_SOL, sig: `https://solscan.io/tx/${sig}`, risk, outAmount: quote.outAmount });
    } else {
      console.log('No trade: waiting for risk<50 or insufficient SOL');
    }
  }catch(e){ console.error('v4 error:', e.message); }
}

setInterval(checkAndTrade, 60000);
checkAndTrade();
console.log('Cedars v4 SOL LIVE started for', keypair.publicKey.toBase58());
