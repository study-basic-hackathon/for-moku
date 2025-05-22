echo "### initialize start ####"
set PGCLIENTENCODING=utf-8
chcp 65001
set PGPASSWORD=postgres

# 既存のデータベースとユーザーの削除
psql -U postgres --command="DROP DATABASE IF EXISTS formoku"
psql -U postgres --command="DROP DATABASE IF EXISTS test_formoku"
psql -U postgres --command="DROP USER IF EXISTS formoku"

# ユーザーの作成
psql -U postgres --command="CREATE USER formoku"
psql -U postgres --command="ALTER ROLE formoku WITH PASSWORD 'formoku'"

# 本番用データベースの作成
psql -U postgres --command="CREATE DATABASE formoku LC_COLLATE 'ja_JP.UTF-8' LC_CTYPE 'ja_JP.UTF-8' ENCODING 'UTF8' TEMPLATE template0"
psql -U postgres --command="ALTER DATABASE formoku OWNER TO formoku"
psql -U postgres --command="GRANT ALL PRIVILEGES ON DATABASE formoku TO formoku"
psql -U postgres --command="ALTER ROLE formoku CREATEDB"

# テスト用データベースの作成
psql -U postgres --command="CREATE DATABASE test_formoku LC_COLLATE 'ja_JP.UTF-8' LC_CTYPE 'ja_JP.UTF-8' ENCODING 'UTF8' TEMPLATE template0"
psql -U postgres --command="ALTER DATABASE test_formoku OWNER TO formoku"
psql -U postgres --command="GRANT ALL PRIVILEGES ON DATABASE test_formoku TO formoku"

# データベース接続設定
set PGDATABASE=formoku
set PGPASSWORD=formoku
set PGUSER=formoku

# SQLファイルの実行
psql -U formoku -d formoku -f /docker-entrypoint-initdb.d/sql/02-sample.sql