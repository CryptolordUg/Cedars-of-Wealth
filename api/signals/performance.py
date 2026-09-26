# GET /signals/performance
def performance(strategy_id):
  return {"win_rate": 0.0, "expectancy": 0.0, "drawdown": 0.0} # calc from closed signals
