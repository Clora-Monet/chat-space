# README
# chatspace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false, unique: true|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through: :groups_users
### index
add_index :user, :username

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|create_at|string|null: false|
### Association
- belongs_to :user
- belongs_to :group

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false|
### Association
- has_many :message
- has_many :groups_users
- has_many :users, through: :groups_users


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user