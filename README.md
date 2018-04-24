## Botforlunch - a Slack Bot for helping the companies to make groups for lunch.

The bot asks who wants to go out for lunch with an interactive button and then he makes groups of maximum 7 people and more or less the same amount of people, automatically at the same time of one day per week (every Fridays at 10:00).
Each group will have a leader that will make the reservation and the bot will check that the leaders and the differents groups are different each week.
At 12:00 the bot will stop accepting more people for the groups and will start making groups (if you press the interactive button, it will replaced by a message that say "The time is over").
- Extra: the users will be able to change their minds pressing the button "unsubscribe".

## Installation
- This is a Node.js project, so you’ll need to install the various dependencies by running: npm install.
- Open a secure HTTP connection to a service, you can use the tool localtunnel by running: npm install -g localtunnel
- Run localtunnel as such: lt --port 3000 --subdomain mybot
- Create a Slack app. Make sure to configure the bot user.
-> https://api.slack.com/applications/new
-> Add the Redirect URI: https://myawesomebot.localtunnel.me/oauth
-> Set the Interactive Components (as we will use an interactive button). Request URL: https://botforlunch.localtunnel.me/slack/receive
-> In the bot section, click on the “Add a bot to this app” button. You’ll need to provide an @-name for your bot at this point.
- Run your bot from the command line: CLIENT_ID=<my client id> CLIENT_SECRETt=<my client secret> PORT=3000 npm start
- Install your bot on a team visiting: https://mybot.localtunnel.me/login
- Add the bot to the lunch channel

##Dependencies
---------------------------

 * [Node.js](https://nodejs.org)
 * [Botkit](https://github.com/howdyai/botkit) Botkit is a chatbot framework for sending and receiving messages, calling platform APIs, and running custom code.
 * [botkit-storage-mongo](https://github.com/howdyai/botkit-storage-mongo) A Mongo storage module for Botkit that provides a simple system for storing information about a user, a channel, or a team.
 * [Later.js](https://bunkat.github.io/later) A javascript library for defining recurring schedules and calculating future (or past) occurrences for them. Includes support for using English phrases and Cron schedules.
