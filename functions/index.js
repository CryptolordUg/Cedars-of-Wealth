# 1. Install tools
npm install -g firebase-tools
firebase login

# 2. Init functions in repo root
cd Cedars-of-Wealth
firebase init functions

# 3. Set hidden wallet (never in frontend)
firebase functions:config:set fee.wallet="TE26B7zQjMbahYAWcxEsSPC6aZEr2Hcz1u"

# 4. Paste worker
# File: functions/index.js  <- paste code I gave earlier

# 5. Deploy
cd functions && npm install firebase-functions firebase-admin tronweb
cd ..
firebase deploy --only functions
