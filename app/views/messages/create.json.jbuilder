json.content @message.content
json.image @message.image_url
json.name @message.user.name
json.group_id @message.group_id
json.create_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id @message.id
