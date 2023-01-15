postgresql:

psql -U main -d main

Правим конфиг на мастере

docker exec -ti -u 0 seener_db bash

create user replica with replication encrypted password 'asd8235ms0vfg';

nano /var/lib/postgresql/data/postgresql.conf
Добавим в конец

listen_addresses = '\*':

echo listen_addresses = '\*' >> postgresql.conf;

psql postgres

postgres=# CREATE ROLE username superuser;
postgres=# ALTER ROLE username WITH LOGIN;
