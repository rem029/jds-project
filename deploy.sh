echo "Update packages"
yarn run bootstrap

echo "Update repo"
git pull origin main

echo "Update database"
yarn migrate-latest

echo "Reloading PM2 Application"
pm2 reload jds-app-staging
