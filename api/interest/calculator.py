COMPOUND_RATE = 0.70  # 70% boost
LOCK_YEARS = 200

def calculate_compound(principal: float, years: float):
    # 70% annual compound, locked 200 years max
    years = min(years, LOCK_YEARS)
    return principal * ((1 + COMPOUND_RATE) ** years)

def deposit_preview(amount: float):
    return {
        "deposit": amount,
        "forex_boosted": amount * 1.7,
        "mining_boosted": amount * 1.7,
        "projected_200y": calculate_compound(amount, 200),
        "lock_years": LOCK_YEARS
    }

def withdraw_preview(balance: float, withdraw_amount: float):
    if withdraw_amount < 5.00:
        return {"error": "Minimum withdrawal is $5.00"}
    fee = withdraw_amount * 0.02
    return {"gross": withdraw_amount, "fee": fee, "net": withdraw_amount - fee, "remaining": balance - withdraw_amount}
