# User Analytics Dashboard
A sample User Analytics Dashboard for User API. 


### How do I get set up? ###

* Make sure you're up to date with the latest [docker](https://www.docker.com/get-started)

* Install Docker-Compose from [here](https://docs.docker.com/compose/install/)

* Clone source from Github:
```bash
git clone https://github.com/prafiles/user-analytics-dashboard
```

* Then do a docker-compose pull.
```bash
cd user-analytics-dashboard && docker-compose pull
```

* Finally create MongoDB persistent docker volume.
```bash
docker volume create --name=dashboard-mongodb
```
* To run dashboard
```bash
docker-compose up dashboard
```

