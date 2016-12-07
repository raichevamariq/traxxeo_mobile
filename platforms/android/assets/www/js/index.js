/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
$.support.cors = true;
var storage = window.localStorage;




function loadVehicleInfo(){
var event_id  = storage.getItem("event_id");
console.log("event_id is"+event_id);
    $.ajax({
	                        method:"get",
                            url:"http://192.168.20.116:8080/traxxeo/ShowDetails?event_id="+event_id+"&userId="+storage.getItem("userId"),
                                    error:function(  jqXHR, textStatus,  errorThrown ){

                                    console.log(errorThrown);
                                    },
                        		}).done(function(response){

                        				 console.log("proba"+response);
                        				 var jsonData = JSON.parse(response);
                        				 $("#vehicle_info").append('<table class="table"><tr><td>Color:</td><td>'+jsonData.color+'</td></tr><tr><td>Chassis number:</td><td></td></tr>'+

                        				 '<tr><td>Last badger:</td><td>'+jsonData.last_badger+'</td></tr><tr><td>Comment:</td><td>'+jsonData.comment+'</td></tr></table>');
                        				 $("#vehicle_block").append('<h3>'+jsonData.category_name+' '+jsonData.numberplate+' '+jsonData.brand+' '+jsonData.model+'</h3><div class="well">'+jsonData.date+'</div><h4>'+jsonData.address+'</h4>');
                        				// for(var i=0;i<jsonData.length;i++){


                        			}) .fail(function( jqXHR, textStatus ) {
                                           alert( "134hj"+textStatus );
                                         });

}
function loadVehicles(searchValue){
    console.log("FUNCTION LOADED");

    var vehicles;
    var url = "http://192.168.20.116:8080/traxxeo/SearchVehicle?userId="+storage.getItem("userId")+"&searchValue="+searchValue;
    console.log("URL:"+url);
    $("#vehicle_list").html("");

        $.ajax({
	                        method:"get",
                            url:url,
                                    error:function(  jqXHR, textStatus,  errorThrown ){

                                    console.log(errorThrown);
                                    },
                        		}).done(function(response){
                                        vehicles = response;
                                        console.log("VEHICLES"+vehicles);
                        				 var jsonData = JSON.parse(response);
                        				 $("#vehicles").append('<div class="list-group" id="vehicle_list" >');
                        				 for(var i=0;i<jsonData.length;i++){
                        				$("#vehicle_list").append(' <div id="'+jsonData[i].id+'" class="list-group-item" style="witdh:70%" ><div style="background-color:#b6caea"> <icon class="icon-cab"></icon><span class="list-title">'+jsonData[i].name+'</span></div><div>'+jsonData[i].address+'</div><div style="display:none" class="'+jsonData[i].id+' buttons" style="margin-top:20px"><button  class="btn-success" data-event-id="'+jsonData[i].event_id+'">View details</button><button class="btn-danger" '+
                        				  'data-date="'+jsonData[i].date+' " data-latitude="'+jsonData[i].latitude+'" data-longitude = "'+jsonData[i].longitude+'" data-address="'+jsonData[i].address+'">View on map</button></div></div>');
                                       }
                                        $(".list-group-item").on("click",function(){
                                            //each(function(){
                                               // $(this).click(function(){
                                               $(".buttons").hide();

                                                var id =   $(this).attr('id');
                                                $("."+id).show();
                                            // });
                                        });
                                        $(".btn-success").on("click",function(){
                                            storage.setItem("event_id",$(this).attr("data-event-id"));
                                            alert("The chosen event_id is"+storage.getItem("event_id"));
                                            window.location = "detail_view.html";
                        				});
                        				$(".btn-danger").on("click",function(){
                                                                                    storage.setItem("event_date",$(this).attr("data-date"));
                                                                                    storage.setItem("latitude",$(this).attr("data-latitude"));
                                                                                    storage.setItem("longitude",$(this).attr("data-longitude"));
                                                                                    storage.setItem("address",$(this).attr("data-address"));
                                                                                   // alert("The chosen event_id is"+storage.getItem("event_id"));
                                                                                    window.location = "map_view.html";
                                                      });


                        				$("#vehicles").append("</div>");

                        			}) .fail(function( jqXHR, textStatus ) {
                                           alert( "134hj"+textStatus );
                                         });
                          //|



}
var app = {
    // Application Constructor


    initialize: function() {

        this.bindEvents();


        $(document).on("click","#submit",function () {
                        alert(navigator.onLine );
                        if(navigator.online == false){

                            alert("No internet connection.Please connect to the Internet");
                        }
                        else{



                		$.ajax({

                				method:"get",
                            	url:"http://192.168.20.116:8080/traxxeo/LoginServlet?username="+$("#username").val()+"&password="+$("#password").val()
                    		}).done(function(response){
                				if(response.length >0){
                				    storage.setItem("userId", response);
                				     window.location.href="vehicle_list.html";
                				}
                				else alert ("Invalid credentials");

                			}) .fail(function( jqXHR, textStatus ) {
                                   alert( "lala"+jqXHR );
                                 });

                    console.log("BITCH");
                    }
          });

    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log("FUCK");

       //
    // Update DOM on a Received Event
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();