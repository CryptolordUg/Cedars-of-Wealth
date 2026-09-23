// engines/walletAPI.js - FINAL REAL - COW-RUBONAI-1095
const WalletAPI = {
  treasury: {
    TRC20: "TE26B7zQjMbahYAWcxEsSPC6aZEr2Hcz1u",
    BEP20: "0x0d4c2B95e8FB7Be3DB9953bAcEf3A4Be643bA77B",
    ERC20: "0x0d4c2B95e8FB7Be3DB9953bAcEf3A4Be643bA77B",
    BTC: "bc1q2mnpctqrfn8q673wsd27uqlm5t7vqmrhaj2cj0"
  },
  minWithdraw: 50,
  autoApprove: "24/7 - RubonAI",
  dailyROI: 1.5,
  contractDays: 1095,
  integrityHash: "SHA256:7f3a9c2e4b STABLE",
  getDepositAddress(chain){
    if(chain==="TRC20") return this.treasury.TRC20;
    if(chain==="BTC") return this.treasury.BTC;
    return this.treasury.BEP20;
  },
  calculateROI(p){ return {daily:(p*1.5/100).toFixed(2), total1095:(p*1.5/100*1095).toFixed(2)} }
};
