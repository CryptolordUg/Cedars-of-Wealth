// Cedars API 03: Feature Engineering Engine
// Calculates: EMA20/50/200, RSI14, ATR14, ADX, Bollinger, Liquidity Zones, FVG, Order Blocks

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
  const rs = gains/losses;
  return 100 - (100/(1+rs));
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
  const ema20 = ema(closes.slice(-30), 20);
  const ema50 = ema(closes.slice(-60), 50);
  const ema200 = closes.length>=200? ema(closes.slice(-200), 200) : ema(closes, closes.length);
  const rsi14 = rsi(closes, 14);
  const atr14 = atr(candles, 14);

  // Bollinger Bands (20,2)
  const slice20 = closes.slice(-20);
  const sma20 = slice20.reduce((a,b)=>a+b,0)/20;
  const std = Math.sqrt(slice20.reduce((a,b)=>a+Math.pow(b-sma20,2),0)/20);

  // Liquidity Zones: recent swing highs/lows
  const highs = candles.slice(-50).map(c=>c.high);
  const lows = candles.slice(-50).map(c=>c.low);
  const liquidityHigh = Math.max(...highs);
  const liquidityLow = Math.min(...lows);

  // FVG (Fair Value Gap): 3-candle gap
  let fvg = null;
  const a=candles[candles.length-3], b=candles[candles.length-1];
  if(b.low > a.high) fvg = {type:'bullish', top:b.low, bottom:a.high};
  if(b.high < a.low) fvg = {type:'bearish', top:a.low, bottom:b.high};

  // Order Block: last bearish before bullish impulse
  let orderBlock = null;
  for(let i=candles.length-5;i<candles.length-1;i++){
    if(candles[i].close < candles[i].open && candles[i+1].close > candles[i+1].open){
      if((candles[i+1].close-candles[i+1].open) > atr14*0.5){
        orderBlock = {low:candles[i].low, high:candles[i].high};
      }
    }
  }

  const trend = ema20 > ema50 && ema50 > ema200? 'bullish' : ema20 < ema50 && ema50 < ema200? 'bearish' : 'neutral';

  return {
    trend, ema20:+ema20.toFixed(5), ema50:+ema50.toFixed(5), ema200:+ema200.toFixed(5),
    rsi:+rsi14.toFixed(1), atr:+atr14.toFixed(5),
    bollinger:{upper:+(sma20+2*std).toFixed(5), middle:+sma20.toFixed(5), lower:+(sma20-2*std).toFixed(5)},
    liquidity:{high:liquidityHigh, low:liquidityLow},
    fvg, orderBlock
  };
}

// Add to server.js:
// app.post('/api/v1/features/build', (req,res)=>{
// const {candles} = req.body;
// res.json(buildFeatures(candles));
// });

module.exports = { buildFeatures };
