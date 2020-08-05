#!/bin/bash

# wait for database container
# for use as Docker ENTRYPOINT
echo "WAIT FOR DB!"

while ! nc -w 1 -z mysqldb 3306; do
    sleep 0.1
done

exec "$@"