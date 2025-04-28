//FOR BOOKING
let BOOK_Now = document.getElementById("BOOK_Now");

BOOK_Now.addEventListener("click", function(event){
    event.preventDefault();

    let Name = document.getElementById("Name").value;
    let gmail = document.getElementById("gmail").value;
    let contactNo = document.getElementById("contactNo").value;
    let Date = document.getElementById("Date").value;
    let Time = document.getElementById("Time").value;
    let peoples = document.getElementById("peoples").value;
    let select_table = document.getElementById("select_table").value;

    let userBooking = {
        Name: Name,
        gmail: gmail,
        contactNo: contactNo,
        Date: Date,
        Time: Time,
        peoples: peoples,
        select_table: select_table
    };

    let booking = JSON.parse(localStorage.getItem("userBooking")) || [];

    booking.push(userBooking);
    
    localStorage.setItem("userBooking", JSON.stringify(booking));
    alert("Booking successfully!");

    document.getElementById("Name").value = "";
    document.getElementById("gmail").value = "";
    document.getElementById("contactNo").value = "";
    document.getElementById("Date").value = "";
    document.getElementById("Time").value = "";
    document.getElementById("peoples").value = "";
    document.getElementById("select_table").value = "";
});