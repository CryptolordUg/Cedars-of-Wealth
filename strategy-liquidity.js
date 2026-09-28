// Cedars Strategy: Liquidity Sweep + Trend Pullback
// Foundations: Verified Profitability + Risk Control + Transparency
// No crypto trading - signal only

function detectLiquiditySweep(candles){
  // candles: [{high, low, close, ...}] last 50
  const len = candles.length;
  const recentHigh = Math.max(...candles.slice(len-20, len-1).map(c=>c.high));
  const last = candles[len-1];
  const swept = last.high > recentHigh && last.close < recentHigh; // wick sweep + reclaim
  return { swept, level: recentHigh };
}

function trendPullback(candles){
  const closes = candles.map(c=>c.close);
  const ema20 = closes.slice(-20).reduce((a,b)=>a+b,0)/20;
  const ema50 = closes.slice(-50).reduce((a,b)=>a+b,0)/50;
  const trend = ema20 > ema50 ? 'bullish' : 'bearish';
  const last = candles[candles.length-1];
  const pullback = trend==='bullish' 
    ? last.low <= ema20 && last.close > ema20
    : last.high >= ema20 && last.close < ema20;
  return { trend, pullback, ema20, ema50 };
}

function generateSignal(candles){
  const sweep = detectLiquiditySweep(candles);
  const tp = trendPullback(candles);
  // 360° rule: need BOTH
  if(sweep.swept && tp.pullback){
    return {
      signal: tp.trend==='bullish' ? 'BUY' : 'SELL',
      reason: `Liquidity sweep at ${sweep.level} + ${tp.trend} pullback to EMA20`,
      risk: 1, // 1% risk per trade
      transparency: { sweep, tp, time: new Date().toISOString() }
    };
  }
  return { signal: 'NO_TRADE', reason: 'Waiting for sweep + pullback confluence' };
}

module.exports = { generateSignal };
