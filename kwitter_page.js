//YOUR FIREBASE LINKS
const firebaseConfig = {
      apiKey: "AIzaSyCOfvBkArvdacB87GA89069fHxySi9ZwaE",
      authDomain: "kwitter-1202b.firebaseapp.com",
      databaseURL: "https://kwitter-1202b-default-rtdb.firebaseio.com",
      projectId: "kwitter-1202b",
      storageBucket: "kwitter-1202b.appspot.com",
      messagingSenderId: "460381817893",
      appId: "1:460381817893:web:54579c83a7abb4c983c3cc"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");
function send(){
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
           name:user_name,
           message:msg,
           like:0 
      });
      document.getElementById("msg").value=""
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name=message_data["name"];
message=message_data["message"];
like=message_data["like"];
tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
mtag="<h4 class='message_h4'>"+message+"</h4>";
btn="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+"onclick='update(this.id)'>";
stag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";
row=tag+mtag+btn+stag;
document.getElementById("output").innerHTML+=row;
//End code
      } });  }); }
getData();

function update(message_id)
{
      btn_id=message_id;
      like=document.getElementById(btn_id).value;
      updated_likes=Number(like)+1;
      firebase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      });
}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");

}