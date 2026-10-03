// Cedars Genesis Auto-Payout — TRON TRC20 Primary + BSC BEP20 Backup
// Vercel Serverless — Requires ENV: TRON_PRIVATE_KEY, BSC_PRIVATE_KEY, TATUM_API_KEY

import { TronWeb } from 'tronweb';
import { ethers } from 'ethers';

const MASTER_TRON = 'TE26B7zQjMbahYAWcxEsSPC6aZEr2Hcz1u';
const MASTER_BSC = '0x0d4c2B95e8FB7Be3DB9953bAcEf3A4Be643bA77B';
const USDT_TRON_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // TRC20 USDT
const USDT_BSC_CONTRACT = '0x55d398326f99059fF775485246999027B3197955'; // BSC USDT
const MIN = 30;
const FEE = 10;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'POST only'});
  const { id, to, amount, network } = req.body;
  
  if (!to || !amount) return res.status(400).json({error:'Missing wallet/amount'});
  if (amount < MIN) return res.status(400).json({error:`Min $${MIN}`});
  
  const willSend = amount - FEE; // Net to investor
  if (willSend <= 0) return res.status(400).json({error:'Amount too low after fee'});

  try {
    let txHash = '';
    
    if (network === 'BSC' || to.startsWith('0x')) {
      // BSC BEP20 — Fee $0.20 — Profit $9.80
      const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
      const wallet = new ethers.Wallet(process.env.BSC_PRIVATE_KEY, provider);
      const usdt = new ethers.Contract(USDT_BSC_CONTRACT, ['function transfer(address to, uint amount) returns (bool)'], wallet);
      const tx = await usdt.transfer(to, ethers.parseUnits(willSend.toString(), 18));
      txHash = tx.hash;
      await tx.wait();
    } else {
      // TRON TRC20 — Primary — Fee $0.80 — Profit $9.20
      const tronWeb = new TronWeb({
        fullHost: 'https://api.trongrid.io',
        privateKey: process.env.TRON_PRIVATE_KEY
      });
      const contract = await tronWeb.contract().at(USDT_TRON_CONTRACT);
      const tx = await contract.transfer(to, tronWeb.toSun(willSend)).send();
      txHash = tx;
    }

    // Log to Supabase / Genesis ledger
    // await supabase.from('treasury_vaults').insert({ gross_inflow: 7.5, user_payout: willSend, margin: FEE })

    return res.status(200).json({
      success: true,
      sent: willSend,
      feeKept: FEE,
      to_masked: to.slice(0,4)+'****'+to.slice(-4),
      network: network || 'TRON TRC20',
      txHash,
      message: `Auto-sent $${willSend} USDT to hidden wallet`
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message, master: MASTER_TRON });
  }
}
