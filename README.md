# User Analytics Dashboard
A sample User Analytics Dashboard for User API. 


### How do I get set up? ###

* Make sure you're up to date with the latest [docker](https://www.docker.com/get-started)

* Install Docker-Compose from [here](https://docs.docker.com/compose/install/)

* Create a Docker subnet with the following command
```bash
docker network create --subnet=172.19.0.0/24 analytics-dashboard
```

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
* You can also check out API format:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/aedfd74772b885c569a5)


### Screenshots ###
![](https://raw.githubusercontent.com/prafiles/user-analytics-dashboard/master/docs/1.png)
![](https://raw.githubusercontent.com/prafiles/user-analytics-dashboard/master/docs/2.png)
![](https://raw.githubusercontent.com/prafiles/user-analytics-dashboard/master/docs/3.png)

### Module Dependency Diagram ###
![](https://raw.githubusercontent.com/prafiles/user-analytics-dashboard/master/docs/4.png)