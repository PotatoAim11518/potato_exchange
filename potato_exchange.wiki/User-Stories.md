# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the log-in form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-in form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to the Homepage.
      * So that I can easily log out to keep my information secure.

## PotatoExchange

### Meeting Rooms
* As a logged in or logged out user, I want to be presented with the option to browse existing meeting rooms or create a new one.
  * When I'm on the homepage:
    * I can click on a card to browse all meeting rooms
      * So that I can be directed to a listing of all the different meeting rooms I can attend.
    * I can click on a card to Host a new meeting room.
      * So that I can create a new meeting room if I'm logged in.
      * So that I can be taken to user signup/login if I'm not logged in.

* As a logged in user, I want to be able to create a meeting room.
  * When I click on the Host card:
    * I am presented with a form to host a meeting room to host.
      * So that I can enter the details to my meeting room and create it.

* As a logged in or logged out user, I want to be able to enter and interact with a meeting room.
  * When I click into a meeting room that I am not the host of:
    * I can see the details of the meeting room
      * So that I can see who's the host, the queue size, who's next up in the queue, and a description of the room.
    * I can see a public chat room associated with the meeting room
      * So that I can see the chat activity
    * I can see a "Join queue" button to join the queue
      * So that I can click it to join the queue to meet the host.
      * So that I can click it and be prompted to sign up/login if I'm logged out.
  * When I am in a meeting room where I am in queue:
    * I can see the "Join queue" button replaced with a "Leave queue" button that I can click
      * So that I can leave the queue.
  * When I leave a meeting room:
    * I am prompted with a message that tells me this will forfeit my position in queue
      * So that I can be removed from the queue.
  * When I click into a meeting room that I am the host of:
    * I can see two sections representing myself and the user who is first in line for access
      * So that I can interact with that user via chat or video
    * I can see a button to "Edit" the meeting room details
      * So that I can change the name of the meeting, the description, and queue size.
    * I can see a button to "Lock queue"
      * So I can prevent more people from joining the queue.
    * I can see a button to to "Close Room"
      * So I can be prompted with a dialogue to confirm closing the room and removing all users in queue.
    * I can see a chat box
      * So that I can send messages to all the users in chat

### Chat Rooms
* As a logged in or logged out user, I want to be able to see a chat room in each meeting room
  * When I'm in a meeting room:
    * I can see a chat box
      * So that I can see the last 10 messages
    * I can see an input field
      * So I can enter a message to send
    * I can click a "Send" button
      * So I can send the message if I'm logged in
      * So I can be directed to the signup/login page if I'm not logged in

### Video Call
* As the host of a meeting room, I want to be able to video chat with the other user.
  * When I'm in the meeting room, I can click an "Enable Video" button
    * So that I can allow video to be used and interact with the other user.
* As a logged in user in a meeting room, I want to be able to video chat with the host of the call.
  * When I'm in the meeting room, I can click an "Enable Video" button
    * So that I can allow video to be used and interact with the host.


**BONUS**

### User Profiles
* As a logged in user, I can check my profile to see information about my account
  * When I click on the profile button
    * I can see a page with information about my account
      * So that I can see what type of user I am and make edits to information.
