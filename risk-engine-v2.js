// Cedars Risk Engine v2 - DD<15% + Daily 2% Kill
// Foundations: Capital Preservation + Risk Control + Transparency
const fs = require('fs');
const START_EQUITY_SOL = parseFloat(process.env.START_EQUITY_SOL || '0.1'); // set at launch
const MAX_TOTAL_DD = 0.15; // 15%
const MAX_DAILY_LOSS = 0.02; // 2%
const STATE_FILE = './risk-state.json';

function loadState(){
  try{ return JSON.parse(fs.readFileSync(STATE_FILE)); }
  catch{ return { peak: START_EQUITY_SOL, dayStart: START_EQUITY_SOL, day: new Date().toISOString().slice(0,10), halted: false }; }
}
function saveState(s){ fs.writeFileSync(STATE_FILE, JSON.stringify(s, null, 2)); }

async function checkRiskEngine(currentEquitySOL){
  let s = loadState();
  const today = new Date().toISOString().slice(0,10);
  if(s.day !== today){ s.day = today; s.dayStart = currentEquitySOL; s.halted = false; }
  if(currentEquitySOL > s.peak) s.peak = currentEquitySOL;

  const totalDD = (s.peak - currentEquitySOL) / s.peak;
  const dailyLoss = (s.dayStart - currentEquitySOL) / s.dayStart;

  let reason = null;
  if(totalDD >= MAX_TOTAL_DD) reason = `TOTAL DD ${(totalDD*100).toFixed(2)}% >=15%`;
  if(dailyLoss >= MAX_DAILY_LOSS) reason = `DAILY LOSS ${(dailyLoss*100).toFixed(2)}% >=2%`;

  if(reason){
    s.halted = true;
    saveState(s);
    console.log(`🛑 KILL SWITCH: ${reason} - Trading halted. Transparency log saved.`);
    // Transparency: append to audit trail
    fs.appendFileSync('./trades.jsonl', JSON.stringify({time:new Date().toISOString(), type:'KILL_SWITCH', reason, equity:currentEquitySOL})+'\n');
    return { allowed: false, reason };
  }
  saveState(s);
  return { allowed: true, totalDD, dailyLoss };
}

module.exports = { checkRiskEngine };
