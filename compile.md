# Compile and publishing how-to

To compile, we use docker. You need to have up and running:

- docker
- docker-compose

First, you have to build the image:

    docker-compose build

Compile the eembedded-form-glue component:

    docker-compose up -d
    docker exec -ti glue_node yarn install
    docker exec -ti glue_node webpack

publish it:

    docker exec -ti glue_node npm login
    docker exec -ti glue_node npm publish


## Build without docker

Coming soon...