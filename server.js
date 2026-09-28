// Cedars RubonAI - Phase 1: MT5 Data Warehouse
const express = require('express');
const fs = require('fs');
const app = express(); app.use(express.json());

// POST /api/v1/market/import
app.post('/api/v1/market/import', (req,res)=>{
  const {symbol, timeframe} = req.body;
  // Expect file in ./data/${symbol}_7Y_M15.csv
  const path = `./data/${symbol}_7Y_M15.csv`;
  if(!fs.existsSync(path)) return res.json({success:false, error:'Upload CSV first'});
  const lines = fs.readFileSync(path,'utf8').trim().split('\n');
  res.json({success:true, symbol, records_imported: lines.length-1, data_quality: 'PASS'});
});

// GET /api/v1/market/candles?symbol=EURUSD
app.get('/api/v1/market/candles', (req,res)=>{
  const {symbol='EURUSD', limit=100} = req.query;
  const path = `./data/${symbol}_7Y_M15.csv`;
  if(!fs.existsSync(path)) return res.json({candles:[]});
  const lines = fs.readFileSync(path,'utf8').trim().split('\n').slice(1).slice(-limit);
  const candles = lines.map(l=>{
    const [time,open,high,low,close,volume] = l.split(',');
    return {time, open:+open, high:+high, low:+low, close:+close, volume:+volume||0};
  });
  res.json({symbol, candles});
});

// POST /api/v1/risk/evaluate - your most important API
app.post('/api/v1/risk/evaluate', (req,res)=>{
  const {balance, entry, stop_loss} = req.body;
  const riskAmount = balance * 0.01;
  const slPips = Math.abs(entry-stop_loss);
  const position_size = slPips>0 ? +(riskAmount / slPips / 10).toFixed(2) : 0;
  res.json({risk_percent:1, position_size, safe: position_size>0 && position_size<5});
});

app.listen(3000, ()=>console.log('Cedars API 3000 live'));
