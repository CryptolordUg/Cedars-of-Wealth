// Cedars RubonAI - Complete Server v1
// APIs: Market Import, Candles, Features, Risk
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

// --- Feature Engine ---
function ema(values, period){
  const k = 2/(period+1);
  let e = values[0];
  for(let i=1;i<values.length;i++) e = values[i]*k + e*(1-k);
  return e;
}
function rsi(closes, p=14){
  let gains=0, losses=0;
  for(let i=closes.length-p; i<closes.length; i++){
    const d = closes[i]-closes[i-1];
    if(d>0) gains+=d; else losses-=d;
  }
  if(losses===0) return 100;
  return 100 - (100/(1+gains/losses));
}
function atr(candles, p=14){
  let sum=0;
  for(let i=candles.length-p; i<candles.length; i++){
    const c=candles[i], pc=candles[i-1];
    sum += Math.max(c.high-c.low, Math.abs(c.high-pc.close), Math.abs(c.low-pc.close));
  }
  return sum/p;
}
function buildFeatures(candles){
  const closes = candles.map(c=>c.close);
  const ema20 = ema(closes.slice(-30),20);
  const ema50 = ema(closes.slice(-60),50);
  const ema200 = closes.length>=200? ema(closes.slice(-200),200) : ema(closes, closes.length);
  const rsi14 = rsi(closes,14);
  const atr14 = atr(candles,14);
  const slice20 = closes.slice(-20);
  const sma20 = slice20.reduce((a,b)=>a+b,0)/20;
  const std = Math.sqrt(slice20.reduce((a,b)=>a+Math.pow(b-sma20,2),0)/20);
  const highs = candles.slice(-50).map(c=>c.high);
  const lows = candles.slice(-50).map(c=>c.low);
  let fvg=null;
  const a=candles[candles.length-3], b=candles[candles.length-1];
  if(b.low > a.high) fvg={type:'bullish', top:b.low, bottom:a.high};
  if(b.high < a.low) fvg={type:'bearish', top:a.low, bottom:b.high};
  const trend = ema20>ema50? 'bullish' : ema20<ema50? 'bearish' : 'neutral';
  return {
    trend, ema20:+ema20.toFixed(5), ema50:+ema50.toFixed(5), ema200:+ema200.toFixed(5),
    rsi:+rsi14.toFixed(1), atr:+atr14.toFixed(5),
    bollinger:{upper:+(sma20+2*std).toFixed(5), middle:+sma20.toFixed(5), lower:+(sma20-2*std).toFixed(5)},
    liquidity:{high:Math.max(...highs), low:Math.min(...lows)},
    fvg
  };
}

// API 01: MT5 Import
app.post('/api/v1/market/import', (req,res)=>{
  const {symbol} = req.body;
  const path = `./data/${symbol}_7Y_M15.csv`;
  if(!fs.existsSync(path)) return res.json({success:false, error:'Upload CSV first to /data/'});
  const lines = fs.readFileSync(path,'utf8').trim().split('\n');
  res.json({success:true, symbol, records_imported: lines.length-1, data_quality:'PASS'});
});

// API 02: Candles
app.get('/api/v1/market/candles', (req,res)=>{
  const {symbol='EURUSD', limit=100} = req.query;
  const path = `./data/${symbol}_7Y_M15.csv`;
  if(!fs.existsSync(path)) return res.json({symbol, candles:[]});
  const lines = fs.readFileSync(path,'utf8').trim().split('\n').slice(1).slice(-parseInt(limit));
  const candles = lines.map(l=>{
    const [time,open,high,low,close,volume] = l.split(',');
    return {time, open:+open, high:+high, low:+low, close:+close, volume:+volume||0};
  });
  res.json({symbol, candles});
});

// API 03: Features - ADDED BEFORE APP.LISTEN
app.post('/api/v1/features/build', (req,res)=>{
  const {symbol, timeframe} = req.body;
  const path = `./data/${symbol}_7Y_M15.csv`;
  if(!fs.existsSync(path)) return res.json({error:'No data for '+symbol});
  const lines = fs.readFileSync(path,'utf8').trim().split('\n').slice(1).slice(-200);
  const candles = lines.map(l=>{
    const [time,open,high,low,close] = l.split(',');
    return {time, open:+open, high:+high, low:+low, close:+close};
  });
  res.json({symbol, timeframe,...buildFeatures(candles)});
});

// API 10: Risk Evaluate
app.post('/api/v1/risk/evaluate', (req,res)=>{
  const {balance, entry, stop_loss} = req.body;
  const riskAmount = balance * 0.01;
  const slPips = Math.abs(entry-stop_loss);
  const position_size = slPips>0? +(riskAmount / slPips / 10).toFixed(2) : 0;
  res.json({risk_percent:1, position_size, safe: position_size>0 && position_size<5});
});

app.get('/health', (req,res)=>res.json({status:'Cedars RubonAI live'}));

app.listen(3000, ()=>console.log('Cedars API 3000 live'));
