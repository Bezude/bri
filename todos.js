Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({});
    }
  });
  Template.body.events({
    "submit .new-task": function (event) {
      // This function is called when the new task form is submitted
      console.log("Your mother was a hamster and your father smelled of elderberries.");
      console.log(event);
      var text = event.target.text.value;

      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    }
  });
}
