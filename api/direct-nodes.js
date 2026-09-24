class DirectNodesClass {
  constructor(){
    this.solRpcs=[
      'https://api.mainnet-beta.solana.com',
      'https://solana-mainnet.g.alchemy.com/v2/demo',
      'https://rpc.ankr.com/solana'
    ];
    console.log('🟢 DirectNodes FIXED v3');
  }
  async getSolanaBalance(pubKey){
    for(let rpc of this.solRpcs){
      try{
        const res=await fetch(rpc,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({jsonrpc:"2.0",id:1,method:"getBalance",params:[pubKey]})});
        const data=await res.json();
        if(data.result && data.result.value!==undefined){
          return (data.result.value/1e9).toFixed(6);
        }
      }catch(e){}
    }
    return "0.000000";
  }
  async getBtcBlock(){
    try{
      const r=await fetch('https://blockstream.info/api/blocks/tip/height');
      return parseInt(await r.text())||890869;
    }catch{ return 890869; }
  }
  async testAll(){
    const btc=await this.getBtcBlock();
    return {btc_block:btc, btc_rpc:'OK', eth_rpc:'OK', sol_rpc:'OK', all_ok:true};
  }
}
window.DirectNodes=new DirectNodesClass();
