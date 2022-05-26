# LoginTimeLogs

docker run --name logdb -e MONGO_INITDB_ROOT_USERNAME=skytechnosa -e MONGO_INITDB_ROOT_PASSWORD=DyyldaNglOFn93mv -d mongo

docker run --name logdb -v /var/mongo:/etc/mongo -e MONGO_INITDB_ROOT_USERNAME=skytechnosa -e MONGO_INITDB_ROOT_PASSWORD=DyyldaNglOFn93mv -e MONGO_INITDB_DATABASE=logtimedb -d -p 27017:27017 mongo

docker run --name logdb -v /mongo/data:/data/db -d -p 27017:27017 mongo
