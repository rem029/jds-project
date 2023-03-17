sudo -u postgres createdb -U postgres -p 5433 -O postgres jds-db
sudo -u postgres psql -U postgres -p 5433 jds-db < ../sql/jds-db.sql