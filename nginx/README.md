#NGINX SETUP

## 1. Copy files

`jds` and `api.jds` files goes to
```
/etc/nginx/sites-available/
```

`jds-backend-upstream.conf` file goes to
```
/etc/nginx/conf.d
```

## 2. Create link to sites-enabled

```
cd /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/jds
sudo ln -s /etc/nginx/sites-available/api.jds
ls -l
```

## 3. Test

```
sudo nginx -t
```

No errors or warnings? Proceed to step 3. If yes, fix it please.

## 4. Reload Nginx
```
nginx -s reload
systemctl restart nginx
```

## 5. Redirect Hostname to server.

## 6. Run Certbot on server

```
certbot --nginx -d jds.rem029.com --redirect
certbot --nginx -d api.jds.rem029.com --redirect
```

OR

```
sudo certbot --nginx -d jds.rem029.com -d www.jds.rem029.com
sudo certbot --nginx -d api.jds.rem029.com -d www.api.jds.rem029.com
```


## References
https://dev.to/zeeshanhshaheen/how-to-deploy-react-js-and-nodejs-app-on-a-single-digitalocean-droplet-using-nginx-1pcl