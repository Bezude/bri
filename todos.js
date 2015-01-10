
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

function prefillTodos() {
  if(Todos.find().count() !== 0) return;

  var todos = ["Create a Todo", "Learn MeteorJS"];

  todos.forEach(function(todo) { new Todo(todo).save(); });
}

if (Meteor.isServer) {
  Meteor.startup(prefillTodos);
}

function setUpTodoTemplates() {
  Template.todos.helpers({
    todos: function () {
      return Todos.find();
    }
  });

  Template.createTodo.events({
    'click button': function() {
      var input = $("#newTodo");
      var name = input.val();

      input.val("")

      new Todo(name).save();
    }
  });
}

if (Meteor.isClient) {
  setUpTodoTemplates();
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
