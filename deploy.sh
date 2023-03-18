echo "Update packages"
yarn run bootstrap

echo "Update database"
yarn migrate-latest


echo "Reloading PM2 Application"
pm2 reload jds-app-staging
pm2 reload jds-add-issue-every-15min

echo "PM2 Update"
pm2 update