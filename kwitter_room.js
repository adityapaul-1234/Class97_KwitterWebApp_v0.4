username = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + username;
    
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

function AddRoom(){
      room_name = document.getElementById("Roomname").value;
      firebase.database().ref("/").child(room_name).update({
            Purpose: "Adding Room Name"
      });
      localStorage.setItem("Room-Name", room_name);
      window.location = "kwitter_page.html";
}

function getData(){
      firebase.database().ref("/").on('value', function(snapshot){
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
            Room_names = childKey;

            console.log("Room Names" + Room_names);
            row = "<div class='room_name' id="+Room_names +" onclick='redirectToRoomName(this.id)'>#"+ Room_names +"</div><hr>";
            document.getElementById("output").innerHTML += row;
      
      });});}
getData();

function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("Room-Name", name);
      window.location = "kwitter_page.html";
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("Room-Name");
      window.location = "index.html";
}