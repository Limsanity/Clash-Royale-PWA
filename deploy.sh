ssh root@pomo
cd Clash-Royale-PWA
git pull
npm run build
pm2 restart app
