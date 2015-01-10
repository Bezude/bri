if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Todos = new Mongo.Collection("todos");

    function Todo(name) {
      this.name = name;
    }

    Todo.prototype = {
      valid: function() {
        return this.name && this.name != "";
      },

      save: function() {
        Todos.insert({name: this.name});
      }
    };
  });
}
