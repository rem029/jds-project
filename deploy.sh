echo "Update packages"
yarn run bootstrap

echo "Update database"
yarn migrate-latest

echo "Start cron job"
yarn cron-add-issue

echo "Start server if not started"
yarn start:pm2:staging

echo "Reloading PM2 Application"
pm2 reload jds-app-staging
pm2 reload jds-add-issue-every-12hr

echo "PM2 Update"
pm2 update