### Download and Import Example Dataset (PostgreSQL)


### Prepare db(PostgreSQL)
- Make sure you have a PostgreSQL installed.
- Confirm database-user of name "postgres" with password "root".
    For this, we can use "pgAdmin" tool running on browser installed with PostgreSQL.
- After that, run this commands.
```
$ createdb --username=postgres iotifyDB
$ psql --username=postgres --dbname iotifyDB -f iotifyDB-dump.sql
```

### Backend run
To start backend and playground use this commands

```
npm install
npm run dev
```

### Frontend run
To start frontend application use this commands

```
$ cd dashboard-app
$ npm install
$ npm run serve
```