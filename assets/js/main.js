var firebaseConfig = {
    apiKey: "AIzaSyDI4SxnKw_VbJovEFaibHKVFQK2CIRcLlw",
    authDomain: "drivepaymain.firebaseapp.com",
    databaseURL: "https://drivepaymain-default-rtdb.firebaseio.com",
    projectId: "drivepaymain",
    storageBucket: "drivepaymain.appspot.com",
    messagingSenderId: "772966296905",
    appId: "1:772966296905:web:cc0abadbb3322596373e98"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Reference messages collection
  var messagesRef = firebase.database().ref('messages');
 //Listen for form submit
document.getElementById('payment').addEventListener('submit',submitForm);

//Submit form
function submitForm(e){
    e.preventDefault();
    
    //Get values
    var to = getInputVal('to');
    var amount = getInputVal('amount');
    //var card = getInputVal('card');
    var card = document.getElementById("card").checked;
    var wallet = document.getElementById("wallet").checked;
    var method = "none";
    var status = "failed";
    
    if ( wallet ) {
        method = "Wallet";
    }else if(card){
        method = "Card";
    }

    //var wallet = getInputVal('wallet')

    //save message
    saveMessage(to, amount, method, status)


}

// Function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}

//Save message to firebase
function saveMessage(to, amount, method, status){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        to: to,
        amount: amount,
        method: method,
        status: status
    });
}

function openFun(temp) {
    if(temp==="Wallet"){
      window.location.href="payment-done-wallet.html";
    }else if(temp==="Card"){
      window.location.href="fetching-otp.html";
    }
}

function methodAuthSelect() {
    var temp = "not defined";
    var userDataRef = firebase.database().ref("messages").orderByKey();
    userDataRef.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        var method_val = childSnapshot.val().method;
        temp=method_val;
          
  
        });
    });
    openFun(temp);
        
}

