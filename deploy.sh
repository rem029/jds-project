echo "Update packages"
yarn run bootstrap

echo "Update database"
yarn migrate-latest


echo "Reloading PM2 Application"
pm2 reload jds-app-staging

echo "PM2 Update"
pm2 update