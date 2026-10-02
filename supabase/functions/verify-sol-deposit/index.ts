import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
const TREASURY = "6XQviXJ5EceCmZq6uGrnrsxBKSnLKSvXeT7MCFF6fTb"
serve(async (req)=>{
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!)
  const body = await req.json()
  for(const tx of body){
    if(tx.accountData?.some((a:any)=>a.account===TREASURY)){
      const sig = tx.signature; const amount = tx.nativeTransfers?.[0]?.amount / 1e9 || 0
      await supabase.from("deposits").upsert({ tx_sig: sig, treasury: TREASURY, network: "solana", status: "confirmed", verified: true, amount_usd: amount*150 }, {onConflict: "tx_sig"})
    }
  }
  return new Response(JSON.stringify({ok:true, treasury:TREASURY}), {headers: {"Content-Type":"application/json"}})
})
