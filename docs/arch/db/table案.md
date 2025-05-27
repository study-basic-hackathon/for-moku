# **user**
id
email
name
bio(自己紹介文)
interests(興味のある分野、テキスト)
created_at
updated_at
deactivated_at

# **event**

id
user_group_id
name
start_time
end_time
venue_url
created_at
updated_at

# **user_event**

id
user_id
event_id

# **user_group**

id
name
description(グループの概要)
created_at
updated_at

# **user_group_assignment**

id
user_id
user_group_id
role(admin, memberの二つ)

(ここから下はnosql)

# **user_icons**

{
"email": "[user@example.com](mailto:user@example.com)",         // ユーザー識別用
"event_id": "123",                   // どのイベント画面か
"position": {
"x": 120.5,                        // x座標
"y": 340.2                         // y座標
},
"name": "Taro Yamada",              // 表示名
"bio": "I love backend programming",// 自己紹介
"interests": "AI, Web Development"  // 興味のある分野（カンマ区切り or 配列）
}