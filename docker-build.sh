#!/bin/bash

docker build . -t sentinel-server
docker tag sentinel-server:latest
