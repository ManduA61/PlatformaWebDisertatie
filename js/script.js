// var t=setInterval(updateDateTime,1000);
// 		function updateDateTime() {
// 			var dt = new Date();
// 			document.getElementById("datetimejs").innerHTML = "Date and Time: " + dt.toLocaleString();
// }

//Get the button:
const mybutton = document.getElementById("bulina");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}