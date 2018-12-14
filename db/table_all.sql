-- Create Table
create table helo_users (
    user_id serial primary key not null,
    username varchar(50) not null ,
    hash_value text not null
)

create table helo_post (
    post_id serial primary key not null, 
    post_title VARCHAR(100),
    users_id integer REFERENCES helo_users
)


-- User Check
insert into helo_users 
(
    username, hash_value
)
values 
(
    $1, $2
)
-- Creating User
insert into helo_users
(
    username, hash_value
)
values 
(
    $1, $2
)
returning *;

-- Get All Posts 
select * from helo_users

-- 