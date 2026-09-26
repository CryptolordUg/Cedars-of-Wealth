import asyncio, json, random
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

router = APIRouter()

async def event_gen(stream_type: str):
    while True:
        if stream_type == "forex":
            data = {"pair":"EURUSD","price": round(1.08+random.uniform(-0.002,0.002),5), "signal": random.choice(["BUY","SELL","HOLD"])}
        else:
            data = {"hashrate": round(random.uniform(120,180),2), "payout_btc": round(random.uniform(0.0001,0.0005),6)}
        yield f"data: {json.dumps(data)}\n\n"
        await asyncio.sleep(2)

@router.get("/live")
async def live(type: str = "forex"):
    return StreamingResponse(event_gen(type), media_type="text/event-stream")
