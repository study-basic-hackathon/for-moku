
## 📘 RDBテーブル一覧（リレーショナルデータベース）

### **user**

| 項目名        | 型             | 説明                             |
|---------------|----------------|----------------------------------|
| id            | int / UUID     | ユーザーID（主キー）             |
| email         | string         | メールアドレス                   |
| name          | string         | ユーザー名                       |
| bio           | text           | 自己紹介文                       |
| interests     | text           | 興味のある分野（カンマ区切り）   |
| created_at    | datetime       | 作成日時                         |
| updated_at    | datetime       | 更新日時                         |
| deactivated_at| datetime/null  | 退会日時（退会していない場合はnull）|

### **event**

| 項目名        | 型             | 説明                                             |
|---------------|----------------|--------------------------------------------------|
| id            | int / UUID     | イベントID（主キー）                            |
| user_group_id | int / UUID     | 所属グループID（外部キー）                      |
| name          | string         | イベント名                                       |
| start_time    | datetime       | 開始日時                                         |
| end_time      | datetime       | 終了日時                                         |
| venue_url     | string (URL)   | 会場のURL（インスタベースのURL想定）            |
| image_json    | JSON           | 会場の椅子などの配置情報                        |
| image_url     | string (URL)   | 会場の椅子などの配置情報を画像化したものURL。当日画面の背景に使用する |
| created_at    | datetime       | 作成日時                                         |
| updated_at    | datetime       | 更新日時                                         |

### **user_event_participation**

| 項目名     | 型         | 説明                          |
|------------|------------|-------------------------------|
| id         | int / UUID | 主キー                        |
| user_id    | int / UUID | 参加ユーザーID（外部キー）    |
| event_id   | int / UUID | 参加イベントID（外部キー）    |

### **user_group**

| 項目名     | 型             | 説明             |
|------------|----------------|------------------|
| id         | int / UUID     | グループID       |
| name       | string         | グループ名       |
| description| text           | グループの概要   |
| created_at | datetime       | 作成日時         |
| updated_at | datetime       | 更新日時         |

### **user_group_assignment**

| 項目名         | 型             | 説明                               |
|----------------|----------------|------------------------------------|
| id             | int / UUID     | 割り当てID                         |
| user_id        | int / UUID     | ユーザーID                         |
| user_group_id  | int / UUID     | ユーザーグループID                 |
| role           | enum           | ロール（admin または member）     |

## 📙 NoSQLコレクション（user_icons）

### **user_icons**

| フィールド名   | 型               | 説明                                               |
|----------------|------------------|----------------------------------------------------|
| email          | string           | ユーザー識別用メールアドレス                      |
| event_id       | string / number  | 対象イベントID                                     |
| position.x     | float            | X座標                                              |
| position.y     | float            | Y座標                                              |
| name           | string           | 表示名                                             |
| bio            | string           | 自己紹介                                           |
| interests      | string / array   | 興味のある分野（カンマ区切り または 配列）        |
