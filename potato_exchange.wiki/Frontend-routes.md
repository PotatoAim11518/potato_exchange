# User-facing routes
## Log in modal

On any page displays a log in modal form

* `[POST] /login`


## Sign up modal

On any page displays a sign up modal form

* `[POST] /signup`

## Home
* `[GET]` ```/```

Home page that shows the two cards for actions a user can take and user auth buttons at the top


## Meeting hosting and joining
* `[GET]` `[POST]` ```/host``` ________________________________ `[GET]` ```/join```


## Meeting Rooms
* `[GET]` `[PATCH]` `[DELETE]` ```/meeting/:meeting_id```

* `[GET]` `[POST]` ```/chat/:meeting_id```
