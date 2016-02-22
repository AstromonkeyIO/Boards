var app = angular.module('boards', [])

app.controller('workflow-controller', function ($scope) 
{

	$scope.workflowId;

	$scope.addWorkflowButtonClicked = function() 
	{

	 	document.getElementById('light').style.display='block';
	 	document.getElementById('fade').style.display='block';

    }

    $scope.dismissPopupButtonClicked = function() 
    {

		document.getElementById('light').style.display='none';
		document.getElementById('fade').style.display='none';
		$('#create-new-workflow-input').val("");   	
    	$('#create-new-workflow-button').attr("disabled", true);  
		$scope.clearAddNewWorkflowForm();

    }

    $scope.checkDataInCreateNewWorkflowInput = function() 
    {
    	console.log($scope.newWorkflowName);
    	if($scope.newWorkflowName == "")
    	{
    	    $('#create-new-workflow-button').attr("disabled", true);
    	}
    	else
    	{
    		$('#create-new-workflow-button').attr("disabled", false);
    	}

    }

    $scope.addNewWorkflow = function() 
    {

    	var newWorkflowName = $scope.newWorkflowName;
    	$scope.dismissPopupButtonClicked();
		var workflow = {
			id: "1",
		    name: newWorkflowName
		};

		var workflowTemplate = document.getElementById('workflow-template').innerHTML;
  		workflowTemplate = Mustache.render(workflowTemplate, workflow);
  		
  		//console.log(output);
  		$('#workflow-container').append(workflowTemplate);
  		//document.getElementById('person').innerHTML = output;

    }

    $scope.clearAddNewWorkflowForm = function()
    {

    	$scope.newWorkflowName = "";
    	$('#create-new-workflow-input').val("");   	
    	$('#create-new-workflow-button').attr("disabled", true);   	

    }

    $scope.createNewTaskButtonClicked = function(workflowId)
	{

	 	document.getElementById('create-task-popup').style.display='block';
	 	document.getElementById('fade').style.display='block';
	 	$scope.workflowId = workflowId;

	}

	$scope.createNewTask = function()
	{

	 	var task = {
	 		id:"",
	 		name: $scope.createTaskForm.taskName,
	 		description: $scope.createTaskForm.description,
	 		date: $scope.createTaskForm.date,
	 		priority: "",
	 		assignee: ""
	 	}
		var taskTemplate = document.getElementById('task-template').innerHTML;
  		taskTemplate = Mustache.render(taskTemplate, task);

  		console.log($scope.workflowId);
  		$("#" + $scope.workflowId + " ul").append(taskTemplate);

		$scope.dismissCreateTaskPopupButtonClicked(); 

	}

	$scope.clearAddNewWorkflowForm = function()
	{



	}

	$scope.dismissCreateTaskPopupButtonClicked = function()
	{

	 	document.getElementById('create-task-popup').style.display='none';
	 	document.getElementById('fade').style.display='none';
	 	$scope.clearCreateTaskForm();

	}

	$scope.clearCreateTaskForm = function()
	{

    	$scope.createTaskForm.taskName = "";
    	$scope.createTaskForm.description = "";
    	$scope.createTaskForm.date = "";
    	$scope.createTaskForm.assignee = "";
    	$('#create-new-task-button').attr("disabled", true);   	


	}

	$scope.displayTaskDetailPopup = function(taskName)
	{
		console.log("here");
		document.getElementById('create-task-popup').style.display='block';
		document.getElementById('fade').style.display='block';

		$scope.createTaskForm.taskName = taskName; 
		$('#task-name-input').val(taskName);

	}

});

//$('.btn-group > .btn.active').text()
/*
app.controller('create-task-popup-controller', function ($scope) 
{

    $scope.addNewTask = function()
	{

		console.log("gooogoggo");

	}

});
*/
function createNewTaskButtonClicked(workflowId)
{

	angular.element($('#body')).scope().createNewTaskButtonClicked(workflowId);

}

function displayTaskDetailPopup(taskName)
{

	console.log("herllo" + taskName);
	angular.element($('#body')).scope().displayTaskDetailPopup(taskName);

	return false;

}

$(document).ready(function() {
    $("[rel='tooltip'], .tooltip").tooltip();
});

$(function () {
    $('.list-group-item > .show-menu').on('click', function(event) {
		event.preventDefault();
		$(this).closest('li').toggleClass('open');
	});
});



