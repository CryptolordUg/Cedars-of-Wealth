// CEDARS REAL $1 SIGNER - Solana + Tron = Best for $1
class RealSigner {
  constructor(){
    this.solRpc = localStorage.getItem('CEDARS_SOL_RPC') || 'https://api.mainnet-beta.solana.com';
    console.log('💰 Real Signer Loaded - $1 Ready');
  }

  // Connect Phantom - REAL wallet
  async connectPhantom(){
    if(!window.solana || !window.solana.isPhantom){
      alert('Install Phantom Wallet first:\nhttps://phantom.app/');
      window.open('https://phantom.app/','_blank');
      return null;
    }
    const resp = await window.solana.connect();
    return resp.publicKey.toString();
  }

  // Get REAL SOL balance
  async getRealBalance(pubKey){
    const res = await fetch(this.solRpc, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        jsonrpc:"2.0", id:1,
        method:"getBalance",
        params:[pubKey]
      })
    });
    const data = await res.json();
    const sol = (data.result?.value || 0) / 1e9;
    return sol;
  }

  // SEND REAL $1 SOL - LIVE MAINNET
  async sendRealSOL(toAddress, amountSOL=0.005){ // 0.005 SOL ~ $1
    try{
      if(!window.solana) throw new Error('Phantom not connected');
      
      const connection = new solanaWeb3.Connection(this.solRpc);
      const fromPubkey = window.solana.publicKey;
      const toPubkey = new solanaWeb3.PublicKey(toAddress);
      
      const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports: Math.floor(amountSOL * 1e9)
        })
      );
      
      transaction.feePayer = fromPubkey;
      let blockhashObj = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhashObj.blockhash;
      
      const {signature} = await window.solana.signAndSendTransaction(transaction);
      return {tx: signature, explorer: `https://solscan.io/tx/${signature}`};
      
    }catch(e){
      return {error: e.message};
    }
  }
}

window.RealSigner = new RealSigner();
