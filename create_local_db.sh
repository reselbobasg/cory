if [ ! "$(docker ps -q -f name=mysqldb)" ]; then

    # docker rm -f mysqldb
    docker run --name=mysqldb -p 3307:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql/mysql-server:8.0
fi


mysql -h 127.0.0.1 -P 3306 -u root -p cory
