#!/usr/bin/env ruby
# -*- ruby -*-
#
# $Date$
# $Rev$
#
require 'cgi'
require 'json'
require 'sdbm'

cgi = CGI.new("html3")

# DELETEメソッドのチェック
if ENV['REQUEST_METHOD'] != 'DELETE'
  cgi.out("status" => "405") { "Method Not Allowed" }
  exit
end

# 認証トークンの取得と検証
auth_header = ENV['HTTP_AUTHORIZATION']
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

# URLから画像IDを取得
path_info = ENV['PATH_INFO']
if path_info.nil? || path_info.empty?
  cgi.out("status" => "400") { "Bad Request: No image ID provided" }
  exit
end

image_id = path_info[1..-1] # 先頭の'/'を除去

# データベースから画像IDを削除
dbm = SDBM.open('db/id', 0644)
dbm.delete(image_id)
dbm.close

# 画像ファイルを削除
image_path = "data/#{image_id}.png"
if File.exist?(image_path)
  File.delete(image_path)
end

# 成功レスポンスを返す
response = {
  "success" => true,
  "image_id" => image_id
}

headers = {
  "Content-Type" => "application/json"
}

cgi.out(headers) { response.to_json + "\n" } 