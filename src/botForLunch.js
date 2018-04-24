const Botkit = require('botkit');
const SettingStart = require("./settingStart");
class botForLunch {
  constructor(controller) {
    this.settingStart = null;
    controller.on('bot_channel_join', function (bot, message) {
    bot.reply(message, "I'm here!");
    this.settingStart = new SettingStart(bot, message, controller);
    this.settingStart.automaticButton(bot, message, controller);
    });
  }
}

module.exports =  botForLunch;
