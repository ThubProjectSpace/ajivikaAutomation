var appClient
var client
       
var app = {

    initialize: function() {
        this.bindEvents();
        $(window).on("navigate", function (event, data) {          
            event.preventDefault();      
        })
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        app.mqttInit();
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log('deviceready');
         
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    },

    mqttInit: function() {
            var wsbroker = "34.226.134.195";  //mqtt websocket enabled broker
            var wsport = 3033 // port for above
                
            client = new Paho.MQTT.Client(wsbroker, wsport,
                    "myclientid_" + parseInt(Math.random() * 100, 10));
                
                client.onConnectionLost = function (responseObject) {
                  console.log("connection lost: " + responseObject.errorMessage);
            };

                
                
            var options = {
                  timeout: 3,
                  onSuccess: function () {
                    console.log("mqtt connected");
                    
                    client.subscribe('control-led-req');
                    // , {qos: 1}

                    },
                  
                  onFailure: function (message) {
                    console.log("Connection failed: " + message.errorMessage);
                  }
                };       


            // called when a message arrives
            client.onMessageArrived = function(message) {
              console.log("onMessageArrived:"+message.payloadString);
            }

        
        client.connect(options);        

        console.log(client);

      

        
    },  

    pub_publish:function(data){

         var myData=data;
        myData = JSON.stringify(myData);
        message = new Paho.MQTT.Message(myData);
        message.destinationName = "control-led-req";
        console.log(myData);
        client.send(message);
    },

    subscribe: function(){  
        console.log('subscribing');
        

     },


};
