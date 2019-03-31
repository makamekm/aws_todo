# aws_todo

To connect to dev mongodb:
```
docker run -d --restart unless-stopped --name mongo -e MONGODB_ENABLE_IPV6=no -e MONGODB_USERNAME=root -e MONGODB_PASSWORD=root -e MONGODB_DATABASE=test -p 27017:27017 -d bitnami/mongodb:latest
export DB_URL="mongodb://root:root@localhost/test?retryWrites=true"
yarn dev
```