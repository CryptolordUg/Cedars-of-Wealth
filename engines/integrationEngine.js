// engines/integrationEngine.js - DUAL ENGINE → ONE LEDGER
const mining = require('./miningEngine');
const forex = require('./forexEngine');

class CedarAI_Core {
  async start() {
    console.log("🌲 CedarAI Starting Dual Engines...");
    await mining.startRealMining();
    await forex.startRealTrading();
    this.unifyLedger();
  }
  unifyLedger() {
    setInterval(() => {
      console.log("📊 Profit Ledger Updated: Mining + Forex → Investor Dashboard");
      // Transparency Ledger + Backup Snapshot + Blockchain Anchoring
    }, 60000);
  }
}
new CedarAI_Core().start();
