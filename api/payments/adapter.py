class PaymentAdapter:
  def deposit(self, user_id, amount): raise NotImplementedError
  def withdraw(self, user_id, amount): raise NotImplementedError
class MobileMoneyAdapter(PaymentAdapter): pass
class BankAdapter(PaymentAdapter): pass
