MIN_WITHDRAWAL = 5.00

class PaymentAdapter:
    def withdraw(self, user_id, amount, to_address: str, chain: str):
        raise NotImplementedError

class CryptoWithdrawAdapter(PaymentAdapter):
    """Instant automated crypto withdrawal only - no MTN, no bank"""
    def withdraw(self, user_id, amount, to_address: str, chain: str):
        if amount < MIN_WITHDRAWAL:
            raise ValueError("Minimum withdrawal is $5")
        # 1. check 200-year lock: SELECT locked_until FROM withdrawal_locks
        # 2. check ledger balance with row lock
        # 3. create ledger_entries (debit user, credit vault)
        # 4. broadcast on-chain tx to to_address
        # 5. log to audit_log
        pass
