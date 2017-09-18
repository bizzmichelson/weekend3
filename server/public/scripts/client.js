$(document).ready(onReady);

function onReady() {
  console.log("ready!");
  getTasks();
  $("#addButton").on("click", addTasks);
}
var tasks = [];
function getTasks() {
  $.ajax({
    type: "GET",
    url: "/todo/get",
    success: function(res) {
      taskAppend(res);
      //console.log("in client GET route", res);
      tasks = res;
    }
  });
}

function taskAppend(data) {
  console.log(data);
  $("#taskTable").empty();
  for (var i = 0; i < data.length; i++) {
    var taskItem = data[i];

    $("#taskTable").append(
      '<tr id="task-' + taskItem.id + 
          '" ><td>' +
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
    if (taskItem.complete) {
      $("#task-" + taskItem.id).addClass("completed");
    }
  }
}

function deleteItems(id) { 
  var sure = confirm("are you sure?");
  if(sure) {
    $.ajax({
      type: "DELETE",
      url: "/todo/delete/" + id,
      success: function(data) {
        console.log("successfully deleted", id);
        getTasks();
      }
    });
  }else{
    return;
  }
}

function completeItems(id) {
  var updatedItem;
  for (var i = 0; i < tasks.length; i++) {
    var taskItem = tasks[i];
    if (taskItem.id === id) {
      updatedItem = taskItem;
      break;
    }
  }
  updatedItem.complete = !updatedItem.complete;

  $.ajax({
    type: "PUT",
    url: "/todo/update",
    data: updatedItem,
    success: function(data) {
      console.log("updated");
      if (updatedItem.complete) {
        $("#task-" + id).addClass("completed");
      } else {
        $("#task-" + id).removeClass("completed");
      }
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
    url: "/todo/add",
    data: itemToAdd,
    success: function() {
      //change background in here? something with td
      //need something else
      return getTasks();
    }
  });
}
