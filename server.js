cd ~/Cedars-of-Wealth && git pull origin main && pm2 restart cedars-api --update-env || pm2 start server.js --name cedars-api
