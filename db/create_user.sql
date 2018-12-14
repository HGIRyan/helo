insert into helo_users
(
    username, hash_value
)
values 
(
    $1, $2
)
returning *;