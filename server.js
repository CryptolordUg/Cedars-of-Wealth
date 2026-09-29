const express = require('express');
const WebSocket = require('ws');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Cedars Bridge Online - Trade endpoint ready');
});

app.post('/trade', async (req, res) => {
  const { 
    symbol = "R_100", 
    stake = 1, 
    contract_type = "CALL", 
    duration = 5, 
    duration_unit = "m" 
  } = req.body;

  const token = process.env.DERIV_TOKEN;
  if (!token) return res.status(500).json({ error: "DERIV_TOKEN not set in Render" });

  const ws = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=1084');
  let authorized = false;

  ws.on('open', () => {
    ws.send(JSON.stringify({ authorize: token }));
  });

  ws.on('message', (raw) => {
    const data = JSON.parse(raw);
    if (data.error) {
      ws.close();
      return res.status(400).json(data.error);
    }
    if (data.msg_type === 'authorize') {
      authorized = true;
      ws.send(JSON.stringify({
        buy: 1,
        price: stake,
        parameters: {
          amount: stake,
          basis: "stake",
          contract_type,
          currency: "USD",
          duration,
          duration_unit,
          symbol
        }
      }));
    }
    if (data.msg_type === 'buy') {
      ws.close();
      return res.json({ success: true, buy: data.buy });
    }
  });

  ws.on('error', (e) => {
    res.status(500).json({ error: e.message });
  });
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log('Live on', port));
