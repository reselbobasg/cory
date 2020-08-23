DATA_DIR=$PWD'/data';

if [ -d "$DATA_DIR" ]; then
    rm -rf $DATA_DIR
fi

mkdir $DATA_DIR

if [ ! "$(docker ps -q -f name=mongodb)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=mongodb)" ]; then
        # cleanup
        docker rm -f mongodb
    fi
    # run your container
    docker run -d -p 27017:27017  -v $DATA_DIR:/data/db --name mongodb mongo
fi

