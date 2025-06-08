
## 📘 RDBテーブル一覧（リレーショナルデータベース）

### **users**

| 項目名        | 型             | 説明                             |
|---------------|----------------|----------------------------------|
| id            | bigint     | ユーザーID（主キー）             |
| email         | string         | メールアドレス                   |
| name          | string         | ユーザー名                       |
| bio           | text           | 自己紹介文                       |
| interests     | text           | 興味のある分野（カンマ区切り）   |
| created_at    | datetime       | 作成日時                         |
| updated_at    | datetime       | 更新日時                         |
| deactivated_at| datetime/null  | 退会日時（退会していない場合はnull）|

### **events**

| 項目名        | 型             | 説明                                             |
|---------------|----------------|--------------------------------------------------|
| id            | bigint         | イベントID（主キー）                            |
| user_group_id | bigint         | 所属グループID（外部キー）                      |
| name          | string         | イベント名                                       |
| description   | text           | イベントの概要                                 |
| start_time    | datetime       | 開始日時                                         |
| end_time      | datetime       | 終了日時                                         |
| event_url     | string (URL)   | イベントの詳細URL（connpassのURL想定）            |
| venue_url     | string (URL)   | 会場のURL（インスタベースのURL想定）            |
| image_json    | JSON           | 会場の椅子などの配置情報                        |
| image_url     | string (URL)   | 会場の椅子などの配置情報を画像化したものURL。当日画面の背景に使用する |
| created_at    | datetime       | 作成日時                                         |
| updated_at    | datetime       | 更新日時                                         |

### **user_event_participations**

| 項目名     | 型         | 説明                          |
|------------|------------|-------------------------------|
| id         | bigint     | 主キー                        |
| user_id    | bigint     | 参加ユーザーID（外部キー）    |
| event_id   | bigint     | 参加イベントID（外部キー）    |
| created_at | datetime       | 作成日時         |
| updated_at | datetime       | 更新日時         |


### **user_groups**

| 項目名     | 型             | 説明             |
|------------|----------------|------------------|
| id         | bigint         | グループID       |
| name       | string         | グループ名       |
| description| text           | グループの概要   |
| created_at | datetime       | 作成日時         |
| updated_at | datetime       | 更新日時         |

### **user_group_assignments**

| 項目名         | 型             | 説明                               |
|----------------|----------------|------------------------------------|
| id             | bigint         | 割り当てID                         |
| user_id        | bigint         | ユーザーID                         |
| user_group_id  | bigint         | ユーザーグループID                 |
| role           | enum           | ロール（admin または member）     |
| created_at | datetime       | 作成日時         |
| updated_at | datetime       | 更新日時         |


## 📙 NoSQLコレクション（user_icons）

検討中。
