const express = require('express');
const WebSocket = require('ws');
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Cedars Bridge Online - Trade endpoint ready at /trade');
});
app.post('/trade', async (req, res) => {
  const { symbol, stake, contract_type, duration, duration_unit } = req.body;
  if (!process.env.DERIV_TOKEN) {
    return res.json({ success: false, error: 'DERIV_TOKEN not set in Render' });
  }
  const ws = new WebSocket('wss://ws.derivws.com/websockets/v3?app_id=1089');
  ws.on('open', () => {
    ws.send(JSON.stringify({ authorize: process.env.DERIV_TOKEN }));
  });
  ws.on('message', (data) => {
    const response = JSON.parse(data);
    if (response.msg_type === 'authorize') {
      ws.send(JSON.stringify({
        buy: 1,
        price: stake || 1,
        parameters: {
          amount: stake || 1,
          basis: 'stake',
          contract_type: contract_type || 'CALL',
          currency: 'USD',
          duration: duration || 5,
          duration_unit: duration_unit || 'm',
          symbol: symbol || 'R_100'
        }
      }));
    }
    if (response.msg_type === 'buy') {
      ws.close();
      return res.json({ success: true, result: response });
    }
    if (response.error) {
      ws.close();
      return res.json({ success: false, error: response.error });
    }
  });
  ws.on('error', (err) => {
    return res.json({ success: false, error: err.message });
  });
  setTimeout(() => {
    try { ws.close(); } catch(e){}
    if (!res.headersSent) {
      res.json({ success: false, error: 'Timeout connecting to Deriv' });
    }
  }, 10000);
});
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Live on ${PORT}`));
