#Introduction
This is a web-application in which you have to guess the song from the initial 30 seconds of it.



#Spotify-configuration

After making a developer's account for Spotify, you have to make an app named Flow and enter your client-id and client-secret in the code.
Also add the uri of Room.html to the uri of Spotify-API.
I have used Authorization Flow for accessing the token which is the essential component to use Spotify web-API.



#Server

You have to install express and sockets in the server directory using
'npm install express' 
and 
'npm install socket.io'.
Sockets are used to communicate with other users using the 'emit' command.
You can start the server using 'npm start'.



#Starting-the-application

First of all click on play after entering the game and then select a room in which you wanna go.
After entering the room click on authorization.
Now login using the previously configured spotify account.
Now you can start the game and interact with other users as well and see your as well as your competitor's scores on one side with the answers on the other.



#Controls

You will get 30 sec to enter the name of the song.
After the completion of the song click on next button to guess the next one.
Once you have entered the correct answer you will not be able to comment further and your score will be incremented by 100pts.
You can click on Exit if you wanna exit.

