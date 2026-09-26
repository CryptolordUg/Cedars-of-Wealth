MIN_WITHDRAWAL = 5.00
SUPPORTED_CHAINS = ["bitcoin", "ethereum", "solana", "tron", "bsc"]

class CryptoWithdrawAdapter:
    def withdraw(self, user_id: str, amount: float, to_address: str, chain: str):
        if amount < MIN_WITHDRAWAL:
            raise ValueError("Minimum withdrawal is $5")
        if chain not in SUPPORTED_CHAINS:
            raise ValueError(f"Unsupported chain: {chain}")
        # TODO: check 200-year lock, broadcast tx
        return {"status": "pending", "to": to_address, "chain": chain, "amount": amount}
