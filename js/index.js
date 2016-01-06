
var app =  angular.module('chatApp', ['firebase']);
var messageList = $('#message-list');
var messageInput = $('#messageInput');

app.controller('chatController', ['$scope', 'Message', function($scope,Message)
{


    var messagesRef = new Firebase('https://chillapp7793.firebaseio.com/messages/01');
    
 
    $scope.user="Guest";
 
    $scope.messages= Message.all;

    $(messageList).scrollTop($(messageList).prop('scrollHeight'));

    var message = {'user': '', 'text': ''};

    messageInput.keypress(function (e) 
    {
        if (e.keyCode == 13) 
        {
          //FIELD VALUES
          //var username = nameField.val();
          message.text = messageInput.val();
          //SAVE DATA TO FIREBASE AND EMPTY FIELD
          Message.create(message);
          messageInput.val('');

        }
    });

    $scope.inserisci = function(message)
    {

        Message.create(message);
        messageList[0].scrollTop = messageList[0].scrollHeight;

    };


    messagesRef.limitToLast(10).on('child_added', function (snapshot) 
    {
    //GET DATA
    console.log("listening!");
    messageList.scrollTop(messageList[0].scrollHeight);
    /*
    var data = snapshot.val();
    var username = data.name || "anonymous";
    var message = data.text;

    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
    var messageElement = $("<li>");
    var nameElement = $("<strong class='example-chat-username'></strong>")
    nameElement.text(username);
    messageElement.text(message).prepend(nameElement);

    //ADD MESSAGE
    messageList.append(messageElement)

    //SCROLL TO BOTTOM OF MESSAGE LIST
    messageList[0].scrollTop = messageList[0].scrollHeight;
    */
    });


}]);

app.factory('Message', ['$firebase', function($firebase) 
{

    var ref = new Firebase('https://chillapp7793.firebaseio.com/');
    
    var messages = $firebase(ref.child('messages/01')).$asArray();

    var Message = {
    all: messages,
    create: function (message) 
    {

        message.user = "bob";
 
        messages.$add(message).then(function(ref) 
        {

          var id = ref.key();
          console.log("added record with id " + id);
          messageList.scrollTop(messageList[0].scrollHeight);

        });

    },
    get: function (messageId) 
    {

        return $firebase(ref.child('messages/01').child(messageId)).$asObject();

    },
    delete: function (message) 
    {

        return messages.$remove(message);

    }
    };
     
    return Message;
 
}]);
 


$(function () 
{

    if (window.location == window.parent.location) {
        $('#fullscreen').html('<span class="glyphicon glyphicon-resize-small"></span>');
        $('#fullscreen').attr('href', 'http://bootsnipp.com/mouse0270/snippets/PbDb5');
        $('#fullscreen').attr('title', 'Back To Bootsnipp');
    }

    $('.navbar').mouseenter( function(event) {
        event.preventDefault();
        $(this).closest('.navbar-minimal').toggleClass('open');
    })

    $('.navbar').mouseleave( function(event) {
        event.preventDefault();
        $(this).closest('.navbar-minimal').toggleClass('open');
    })

});
