$(document).ready(onReady);

function onReady() {
  console.log("ready!");
  getTasks();
  $("#addButton").on("click", addTasks);
}

function getTasks() {
  return $.ajax({
    type: "GET",
    url: "/todo",
    success: function(res) {
      return taskAppend(res);
      //console.log("in client GET route", res);
    }
  });
}

function taskAppend(data) {
  console.log(data);
  $("#taskTable").empty();
  for (var i = 0; i < data.length; i++) {
    var taskItem = data[i];

    $("#taskTable").append(
      '<tr data-todoid="' +
        taskItem.id +
        '"><td>' +
        taskItem.task +
        "</td>" +
        "<td>" +
        '<button onclick="deleteItems(' +
        taskItem.id +
        ')">Delete Button </button>' +
        "</td>" +
        "<td>" +
        '<button onclick="completeItems(' +
        taskItem.id +
        ')">Complete Button </button>' +
        //everything from + on is added
        "</td></tr>"
    );
  }
}

function deleteItems(id) {
  $.ajax({
    type: "DELETE",
    url: "/todo/" + id,
    success: function(data) {
      console.log("successfully deleted", id);
      getTasks();
    }
  });
}

function completeItems(id) {
  $.ajax({
    type: "PUT",
    url: "/todo/" + id,
    sucess: function(data) {
      console.log("updated", id);
      getTasks();
    }
  });
}

// $('[data-todoid="2"]').html();

// $('[data-todoid="2"] td:first-of-type').text();
function addTasks() {
  var itemToAdd = {
    task: $("#inputBox").val()
  };
  // var to hold value from form

  console.log("addTasks", itemToAdd);

  // var to holding data we want to send to the server

  $.ajax({
    type: "POST",
    url: "/todo",
    data: itemToAdd,
    success: function() {
      //change background in here? something with td
      //need something else
      return getTasks();
    }
  });
}
