json.id @message.id
json.content @message.content
json.image @message.image_url
json.name @message.user.name
json.user_id @message.user_id
json.group_id @message.group_id
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
