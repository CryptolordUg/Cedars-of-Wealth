COMPOUND_RATE = 0.70
LOCK_YEARS = 200
DISPLAY_YEARS = 30

def calculate_compound(principal: float, years: float):
    years = min(years, LOCK_YEARS)
    return principal * ((1 + COMPOUND_RATE) ** years)

def deposit_preview(amount: float):
    return {
        "deposit": amount,
        "forex_boosted": amount * 1.7,
        "mining_boosted": amount * 1.7,
        "projected_30y_display": calculate_compound(amount, DISPLAY_YEARS),
        "projected_200y_locked": calculate_compound(amount, LOCK_YEARS),
        "lock_years": LOCK_YEARS
    }
