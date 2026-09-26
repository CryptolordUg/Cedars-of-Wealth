const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev_change_me';
const PORT = process.env.PORT || 8080;

app.post('/v2/auth/login', (req, res) => {
  const token = jwt.sign({ user: 'demo', role: 'trader' }, JWT_SECRET, { expiresIn: '12h' });
  res.json({ access_token: token, expires: 43200 });
});

function auth(req, res, next) {
  const h = req.headers.authorization || '';
  const token = h.replace('Bearer ', '');
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ error: 'unauthorized' });
  }
}

app.get('/v2/forex/quotes', auth, (req, res) => {
  const symbol = req.query.symbol || 'EURUSD';
  res.json({ symbol, bid: 1.0853, ask: 1.0856, spread: 3, time: new Date().toISOString(), source: 'cedars-mvp' });
});

app.get('/v2/forex/candles', auth, (req, res) => {
  res.json({ symbol: req.query.symbol || 'EURUSD', timeframe: req.query.timeframe || 'H1', candles: [] });
});

app.post('/v2/risk/check', auth, (req, res) => {
  const { balance = 1, risk_percent = 1 } = req.body;
  const max_risk = balance * risk_percent / 100;
  const approved = max_risk <= balance * 0.02 && balance > 0;
  res.json({ approved, risk_score: approved ? 22 : 95, max_risk, lot_size: 0.01, reason: approved ? 'OK' : 'Risk too high' });
});

app.post('/v2/risk/position-size', auth, (req, res) => {
  const { balance = 100, risk_percent = 1 } = req.body;
  res.json({ balance, risk_percent, lot_size: 0.01, max_risk: balance * risk_percent / 100 });
});

app.post('/v2/cedars-wealth-engine', auth, (req, res) => {
  const wealth_score = 78 + Math.floor(Math.random() * 15);
  res.json({
    pair: "EURUSD",
    action: wealth_score > 85 ? "BUY" : "SKIP",
    confidence: 82,
    risk_reward: "1:3",
    position_size: "0.01",
    wealth_score,
    risk_score: 18,
    next_action: "Protect Capital"
  });
});

app.post('/v2/trade/paper', auth, (req, res) => {
  res.json({ status: 'paper-filled', id: Date.now(), ...req.body });
});

app.get('/v2/gateway/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(PORT, () => console.log(`Cedars MVP on ${PORT}`));
