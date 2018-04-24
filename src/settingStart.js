const later = require('later');
const Botkit = require('botkit');
const SettingEnd = require("./settingEnd");

class SettingStart {
  constructor(bot, message, controller) {
    this.total_group = [];
    this.messageButton = '';
    this.textSchedStart = {};
    this.textSchedEnd = {};
    this.disabledButton = true;
    this.settingEnd = null;
    controller.hears("me", 'interactive_message_callback', (bot, message) => {
      (this.disabledButton === false) ? this.addUser(bot, message): this.disablingButton(bot, message);
    });
    controller.hears('unsubscribe', 'interactive_message_callback', (bot, message) => {
      (this.disabledButton === false) ? this.deleteUser(bot, message): this.disablingButton(bot, message);
    });
  }

  automaticButton(bot, message, controller) {
    later.date.localTime();
    this.textSchedStart = later.parse.text('at 10:00am every friday');
    later.setInterval(() => {
      this.startEvent(bot, message);
    }, this.textSchedStart);
    this.textSchedEnd = later.parse.text('at 12:00pm every friday');
    later.setInterval(() => {
      this.endEvent(bot, message, controller);
    }, this.textSchedEnd);
  }

  startEvent(bot, message) {
    this.disabledButton = false;
    bot.reply(message, {
      attachments: [{
        title: 'Ey! Who is going to have lunch out today?',
        callback_id: '123',
        attachment_type: 'default',
        actions: [{
            "name": "me",
            "text": "me!",
            "value": "me",
            "type": "button",
            "style": "primary",
          },
          {
            "name": "unsubscribe",
            "text": "unsubscribe",
            "value": "unsubscribe",
            "type": "button",
            "style": "danger",
            "confirm": {
              "title": "Are you sure?",
              "text": "You will be remove from the list",
              "ok_text": "Yes",
              "dismiss_text": "No"
            }
          }
        ]
      }]
    });
  }

  addUser(bot, message) {
    if (this.total_group.indexOf(message.user) > -1) {
      bot.reply(message, {
        text: '<@' + message.user + '> you are already included'
      });
    } else {
      this.total_group.push(message.user);
      bot.reply(message, {
        text: '<@' + message.user + '> you are in!'
      });
    }
  }

  deleteUser(bot, message) {
    let index = this.total_group.indexOf(message.user);
    if (index > -1) {
      this.total_group.splice(index, 1);
    }
    bot.reply(message, {
      text: 'ohhhhhhhh <@' + message.user + '> we will miss you!',
    })
  }

  disablingButton(bot, message) {
    this.disabledButton = false;
    bot.replyInteractive(message, {
      text: 'The time is over',
    })
  }

  endEvent(bot, message, controller) {
    this.disabledButton = true;
    this.settingEnd = new SettingEnd(bot, message, controller);
    this.settingEnd.makeGroups(bot, message, controller, this.total_group);
  }
}

module.exports = SettingStart;
