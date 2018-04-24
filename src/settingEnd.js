class SettingEnd {
  constructor(bot, message, controller) {
    this.numbersGroups = 0;
    this.groups = [];
    this.dimension = 0;
    this.matching = false;
  }

  shuffle(bot, message, controller, total_group) {
    var shuffled = [];
    while (true) {
      if (!total_group.length) {
        break
      };
      var out = total_group.shift();
      var random = Math.floor(Math.random() * (shuffled.length + 1));
      var start = shuffled.slice(0, random);
      var middle = out;
      var end = shuffled.slice(random, shuffled.length);
      shuffled = (start).concat(middle).concat(end);
    }
    this.dividedGroups(bot, message, controller, shuffled);
  }

  dividedGroups(bot, message, controller, total_group) {
    this.groups = [];
    this.numbersGroups = Math.ceil(total_group.length / 7);
    let i = 0;
    if (this.numbersGroups < 2) {
      this.groups.push(total_group);
    } else {
      if (total_group.length % this.numbersGroups === 0) {
        this.dimension = total_group.length / this.numbersGroups;
        while (i < total_group.length) {
          this.groups.push(total_group.slice(i, i += this.dimension));
        }
      } else {
        while (i < total_group.length) {
          this.dimension = Math.ceil((total_group.length - i) / this.numbersGroups--);
          this.groups.push(total_group.slice(i, i += this.dimension));
        }
      }
    }
    this.checkMatchingGroups(bot, message, controller, total_group);
  }

  checkMatchingGroups(bot, message, controller, total_group){
  this.getStoredUsers(controller).then(data => {
    this.groups.sort();
    this.groups.forEach(m => m.sort());
    if (this.groups.length > 1) {
      for (let i = 0; i < this.groups.length; i++) {
        this.matching = this.groups[i].length == data[i].members.length &&
          this.groups[i].every((v, a) => {
            return v === data[i].members[a];
          });
        if (this.matching) {
          this.shuffle(bot, message, controller, total_group);
          break;
        }
      }
      if (!this.matching) {
        this.assigningRoles(bot, message, controller);
      }
    }
  })
}

  getStoredUsers(controller) {
    return new Promise((resolve, reject) => {
      controller.storage.users.all((error, users) => {
        resolve(users);
      })
    })
  }

  assigningRoles(bot, message, controller) {
    this.groups.map(group => this.leaders(group, controller).then(data => {
      bot.reply(message, `the leader is <@${data.id}> and the members are:`);
      for (var i = 0; i < data.members.length; i++) {
        bot.reply(message, `<@${data.members[i]}>`);
      }
    }).catch(e => console.log(e)))
  }

  leaders(group, controller) {
    return new Promise((resolve, reject) => {
      let randomPosition = Math.floor((Math.random() * group.length));
      let leader = group[randomPosition];
      let completeGroup = {
        id: leader,
        members: group
      };
      this.checkCoincidencesLeader(completeGroup, controller).then(data => {
        if (data) {
          this.leaders(group, controller);
        } else {
          controller.storage.users.save(completeGroup);
          resolve(completeGroup);
        }
      })
    })
  }

  checkCoincidencesLeader(completeGroup, controller) {
    return new Promise((resolve, reject) => {
      controller.storage.users.get(completeGroup.id, function(error, user) {
        resolve(user);
      });
    })
  }


  makeGroups(bot, message, controller, total_group) {
    this.dividedGroups(bot, message, controller, total_group);
  }
}

module.exports = SettingEnd;
