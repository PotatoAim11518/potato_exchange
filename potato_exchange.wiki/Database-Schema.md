# **Database Schema**

## `users`

| column name    | data type | details                 |
|----------------|-----------|-----------------------  |
| id             | integer   | not null, primary key   |
| username       | string    | not null, unique        |
| first_name     | string    | not null                |
| last_name      | string    | not null                |
| email          | string    | not null, unique        |
| hashedPassword | string    | not null                |
| admin          | boolean   | not null, default:false |
| moderator      | boolean   | not null, default:false |
| created_at     | datetime  | not null                |
| updated_at     | datetime  | not null                |

## `meetings`

| column name   | data type | details               |
|---------------|-----------|-----------------------|
| id            | integer   | not null, primary key |
| host_id       | integer   | not null              |
| name          | string    | not null, unique      |
| description   | string    | not null              |
| queue_limit   | integer   | not null              |
| created_at    | datetime  | not null              |
| updated_at    | datetime  | not null              |

* `host_id` references `users` table

## `chatrooms`

| column name   | data type | details               |
|---------------|-----------|-----------------------|
| id            | integer   | not null, primary key |
| meeting_id    | integer   | not null              |
| created_at    | datetime  | not null              |
| updated_at    | datetime  | not null              |

* `meeting_id` references `meetings` table

## `messages`

| column name   | data type | details               |
|---------------|-----------|-----------------------|
| id            | integer   | not null, primary key |
| user_id       | integer   | not null              |
| chatroom_id   | integer   | not null              |
| message       | string    | not null              |
| created_at    | datetime  | not null              |
| updated_at    | datetime  | not null              |

* `user_id` references `users` table
* `chatroom_id` references `chatrooms` table
