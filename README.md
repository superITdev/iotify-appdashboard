### Download and Import Example Dataset (PostgreSQL)
Make sure you have a PostgreSQL installed. You can download and import example dataset by running the following commands.

```
$ curl http://cube.dev/downloads/ecom-dump.sql > ecom-dump.sql
$ createdb ecom
$ psql --dbname ecom -f ecom-dump.sql
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