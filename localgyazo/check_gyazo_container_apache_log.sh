#!/bin/bash
# コンテナのApacheログを確認する(直近50行)
docker exec -it gyazo-local tail -n 50 /var/log/apache2/error.log