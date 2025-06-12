#!/bin/bash
ACCESS_TOKEN=sampletoken
IMAGE_PATH=./sample_img/test.png
LOCAL_UPLOAD_END_POINT=http://localhost:8888/upload.cgi
IMAGE_ID=9df287df93f172c657036f91944b07c9
LOCAL_DELETE_END_POINT=http://localhost:8888/delete.cgi/$IMAGE_ID

curl -X POST -H "Authorization: Bearer $ACCESS_TOKEN" -F "imagedata=@$IMAGE_PATH" "$LOCAL_UPLOAD_END_POINT"

curl -X DELETE -H "Authorization: Bearer $ACCESS_TOKEN" "$LOCAL_DELETE_END_POINT"

