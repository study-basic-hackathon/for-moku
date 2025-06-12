#!/bin/bash
ACCESS_TOKEN=sampletoken
IMAGE_PATH=./sample_img/test.png
LOCAL_END_POINT=http://localhost:8888/upload.cgi

curl -X POST -H "Authorization: Bearer $ACCESS_TOKEN" -F "imagedata=@$IMAGE_PATH" "$LOCAL_END_POINT"