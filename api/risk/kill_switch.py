# POST /risk/kill-switch
def kill_switch(user_id):
    # insert into risk_events, block all signals/trades
    return {"killed": True}
