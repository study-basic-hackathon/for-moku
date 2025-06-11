#!/bin/bash
ACCESS_TOKEN=YOUR_ACCESS_TOKEN
IMAGE_PATH=./sample_img/test.png
LOCAL_END_POINT=https://upload.gyazo.com/api/upload

curl -X POST -H "Authorization: Bearer $ACCESS_TOKEN" -F "imagedata=@$IMAGE_PATH" "$LOCAL_END_POINT"