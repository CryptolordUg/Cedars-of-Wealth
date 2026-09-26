MIN_WITHDRAWAL = 5.00
class CryptoWithdrawAdapter:
    def withdraw(self, user_id, amount, to_address, chain):
        if amount < MIN_WITHDRAWAL: raise ValueError("Minimum withdrawal is $5")
        # check 200-year lock, broadcast tx
        pass
