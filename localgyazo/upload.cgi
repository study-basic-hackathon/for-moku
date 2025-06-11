#!/usr/bin/env ruby
# -*- ruby -*-
#
# $Date$
# $Rev$
#
# https://raw.githubusercontent.com/gyazo/Gyazo/master/Server/upload.cgiより（2025/6/11に取得）
require 'cgi'
require 'digest/md5'
require 'sdbm'
require 'json'

cgi = CGI.new("html3")


# 認証トークンの取得と検証
# 環境変数からHTTP_AUTHORIZATIONヘッダーを取得へぇ〜
auth_header = ENV['HTTP_AUTHORIZATION'] 
# ヘッダの内容を出力
STDERR.puts "Authorization Header: #{auth_header.inspect}"
if auth_header.nil? || !auth_header.start_with?('Bearer ')
  cgi.out("status" => "401") { "Unauthorized: No valid token provided" }
  exit
end

token = auth_header.split(' ')[1]
if token != ENV['GYAZO_API_TOKEN']
  cgi.out("status" => "401") { "Unauthorized: Invalid token" }
  exit
end

# 画像データの処理
imagedata = cgi.params['imagedata'][0].read
hash = Digest::MD5.hexdigest(imagedata)

id = Digest::MD5.hexdigest(cgi.remote_addr + Time.now.to_s)
create_newid = true

dbm = SDBM.open('db/id',0644)
dbm[hash] = id
dbm.close

File.open("data/#{hash}.png","wb").print(imagedata)

# レスポンスの形式を本家と同じに形式に
response = {
  "image_id" => hash,
  "permalink_url" => "http://localhost:8888/data/#{hash}.png",
  "thumb_url" => "http://localhost:8888/data/#{hash}.png",
  "url" => "http://localhost:8888/data/#{hash}.png",
  "type" => "png"
}

headers = {
  "Content-Type" => "application/json",
  "X-Gyazo-Id" => id
}

cgi.out(headers) { response.to_json + "\n" }