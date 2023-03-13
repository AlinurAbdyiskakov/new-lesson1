var firebaseConfig = {
    apiKey: "AIzaSyADbSNkv93XJUES9BPR3OlunDyibtzX17U",
    authDomain: "chat-ae37b.firebaseapp.com",
    databaseURL: "https://chat-ae37b-default-rtdb.firebaseio.com",
    projectId: "chat-ae37b",
    storageBucket: "chat-ae37b.appspot.com",
    messagingSenderId: "24129834480",
    appId: "1:24129834480:web:62a516afca26d909bc6135",
    measurementId: "G-LNYVSPK6C0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
const username = prompt("лакап ат үчүн сиздин атыңыз");

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
    e.preventDefault();

    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    // clear the input box
    messageInput.value = "";

    //auto scroll to bottom
    document
        .getElementById("messages")
        .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
        username,
        message,
    });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function(snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
});