var firebaseConfig = {
      apiKey: "AIzaSyCxrqu6A82BNu870Dxj_EK7lTDFoXNFvf0",
      authDomain: "c94-practicewebapp.firebaseapp.com",
      databaseURL: "https://c94-practicewebapp-default-rtdb.firebaseio.com",
      projectId: "c94-practicewebapp",
      storageBucket: "c94-practicewebapp.appspot.com",
      messagingSenderId: "384032205411",
      appId: "1:384032205411:web:a93f4cb2a6062331672656",
      measurementId: "G-DT1PJBP7DB"
    };
firebase.initializeApp(firebaseConfig);

Room_Name = localStorage.getItem("Room-Name");
User_Name = localStorage.getItem("user_name");

function send(){
      MSG = document.getElementById("Message").value;
      firebase.database().ref(Room_Name).push({
            name: User_Name,
            nessage: MSG,
            likes: 0
      });

      document.getElementById("Message").value = "";
}

function get_Data() {
      firebase.database().ref("/"+Room_Name).on('value', function(snapshot){
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function(childSnapshot){
                  childKey  = childSnapshot.key; childData = childSnapshot.val();
                  if(childKey != "purpose"){
                  firebase_message_id = childKey;
                  message_data = childData;  
      
         Name = message_data['name'];
         Message = message_data['nessage'];
         Likes = message_data['likes'];
         console.log(Name, Message, Likes);

         name_tag = "<h4> "+ Name +"<img class='user_tick' src='tick.png'></h4>";
         message_tag = "<h4 class='message_h4'>" + Message + "</h4>";
         like_button = "<button class='btn btn-primary' id="+firebase_message_id+" value="+Likes+" onclick='updateLikes(this.id)'>";
         span_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like: "+ Likes +"</span></button><hr>";

         row = name_tag + message_tag + like_button + span_tag;
         document.getElementById("output").innerHTML = row;
      } });  }); }
get_Data(); 

function log_out(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("Room-Name");
      window.location = "index.html";
}

function updateLikes(message_id){
      button_id = message_id;
      Likes = document.getElementById(button_id).value;
      updated_Likes = Number(Likes) + 1;

      firebase.database().ref(Room_Name).child(message_id).update({
            likes: updated_Likes
      });
}
