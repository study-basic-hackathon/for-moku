# 参考：https://github.com/gitnira/gyazo_in_docker/blob/main/Dockerfile

FROM ubuntu/apache2:2.4-20.04_beta

# upload.cgiはrubyで動く
RUN apt-get update && apt-get install -y wget ruby

# apache2のcgiモジュールの有効化    
RUN a2enmod cgi

# mod_rewrite
RUN a2enmod rewrite

# mod_header
RUN a2enmod headers

# /etc/apache2/sites-available/000-default.conf を編集
# これにより、リバースプロキシやCGI経由でもHTTP_AUTHORIZATIONヘッダーが
# 正しく環境変数としてCGIスクリプトに渡るようになる
# sedの中にある\ \ はタブを表している
RUN sed -i '/<\/VirtualHost>/i\ \ RewriteEngine On\n\ \ RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization},L]' /etc/apache2/sites-available/000-default.conf

# PassEnv GYAZO_API_TOKEN の追加
RUN sed -i '/<\/VirtualHost>/i\ \ PassEnv GYAZO_API_TOKEN' /etc/apache2/sites-available/000-default.conf

# apache2の設定ファイル内でcgiを読み込むように設定する()
RUN sed -i "s/#AddHandler cgi-script .cgi/AddHandler cgi-script .cgi/" /etc/apache2/mods-available/mime.conf
RUN sed -i "1,/Options Indexes FollowSymLinks/s/Options Indexes FollowSymLinks/Options Indexes FollowSymLinks ExecCGI/" /etc/apache2/apache2.conf

# ServerNameディレクティブを追加
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# 保存先ディレクトリを作成する
RUN install -d -m 755 -g www-data -o www-data /var/www/html/data
RUN install -d -m 755 -g www-data -o www-data /var/www/html/db

# ローカルのupload.cgiを置き換え
COPY upload.cgi /var/www/html/upload.cgi
RUN chown www-data:www-data /var/www/html/upload.cgi
RUN chmod +x /var/www/html/upload.cgi

RUN service apache2 restart