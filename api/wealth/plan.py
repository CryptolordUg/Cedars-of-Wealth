# POST /wealth/plan
def create_plan(user_id, income):
  return {"savings": income*0.2, "trading_cap": income*0.1, "reserve": income*0.7}
