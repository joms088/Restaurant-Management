document.addEventListener('DOMContentLoaded', function () {
    // Login and Signup Form Elements
    const formOpen = document.getElementById('form_open'); 
    const formContainer = document.querySelector('.form_container'); 
    const formClose = document.querySelector('.form_close'); 
    const signupLink = document.getElementById('signup_link'); 
    const loginLink = document.getElementById('login_link'); 

    // Login/Signup Form Toggle Logic
    if (formOpen) {
        formOpen.addEventListener('click', function (event) {
            event.preventDefault();
            formContainer.style.display = 'block'; 
            showLoginForm(); 
        });
    }

    if (formClose) {
        formClose.addEventListener('click', function () {
            formContainer.style.display = 'none';
        });
    }

    if (signupLink) {
        signupLink.addEventListener('click', function (event) {
            event.preventDefault(); 
            showSignupForm(); 
        });
    }

    if (loginLink) {
        loginLink.addEventListener('click', function (event) {
            event.preventDefault(); 
            showLoginForm();
        });
    }

    function showLoginForm() {
        const loginForm = document.querySelector('.login_form');
        const signupForm = document.querySelector('.signup_form');
        if (loginForm && signupForm) {
            loginForm.style.display = 'block'; 
            signupForm.style.display = 'none';
        }
    }

    function showSignupForm() {
        const loginForm = document.querySelector('.login_form');
        const signupForm = document.querySelector('.signup_form');
        if (signupForm && loginForm) {
            signupForm.style.display = 'block'; 
            loginForm.style.display = 'none'; 
        }
    }
    
    // Toggle Password Visibility for Login
    const togglePassword = document.getElementById("togglePassword");
    const password = document.getElementById("login_password");
    if (togglePassword && password) {
        togglePassword.addEventListener("click", function() {
            const type = password.getAttribute("type") === "password" ? "text" : "password";
            password.setAttribute("type", type);
            this.classList.toggle("uil-eye");
            this.classList.toggle("uil-eye-slash");
        });
    }

    // Toggle Password Visibility for Signup
    const toggleSignupPassword = document.getElementById("toggleSignupPassword");
    const signupPassword = document.getElementById("signup_password");
    if (toggleSignupPassword && signupPassword) {
        toggleSignupPassword.addEventListener("click", function() {
            const type = signupPassword.getAttribute("type") === "password" ? "text" : "password";
            signupPassword.setAttribute("type", type);
            this.classList.toggle("uil-eye");
            this.classList.toggle("uil-eye-slash");
        });
    }

    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
    const confirmPassword = document.getElementById("signup_Cpassword");
    if (toggleConfirmPassword && confirmPassword) {
        toggleConfirmPassword.addEventListener("click", function() {
            const type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
            confirmPassword.setAttribute("type", type);
            this.classList.toggle("uil-eye");
            this.classList.toggle("uil-eye-slash");
        });
    }

    // Login Functionality
    const accAdmin = {
        userType: 'admin',
        email: 'admin@gmail.com',
        password: '@admin12345'
    };

    let staffAccounts = JSON.parse(localStorage.getItem("staff")) || [];
    if (!staffAccounts.find(account => account.userType === 'admin')) {
        staffAccounts.push(accAdmin);
        localStorage.setItem("staff", JSON.stringify(staffAccounts));
    }

    const login = document.getElementById("login");
    if (login) {
        login.addEventListener("click", function(event) {
            event.preventDefault();
            let login_email = document.getElementById("login_email").value;
            let login_password = document.getElementById("login_password").value;
        
            let staffAccounts = JSON.parse(localStorage.getItem("staff")) || [];
        
            // Find the staff account that matches the login credentials
            let staffAccount = staffAccounts.find(staff => staff.email === login_email && staff.password === login_password);
        
            if (staffAccount) {
                // Check if the logged-in account is admin or staff
                if (staffAccount.userType === 'admin') {
                    alert(`Welcome, Admin!`);
                    window.location = 'admin.html'; // Redirect to admin dashboard
                } else {
                    // Store the logged-in staff's email in localStorage
                    localStorage.setItem('loggedInStaffEmail', staffAccount.email);
    
                    // Show the welcome alert with the staff member's fullname
                    alert(`Welcome, ${staffAccount.Fullname}!`);
    
                    // Redirect to the staff page
                    window.location = 'staff.html'; 
                }
                return;
            } else {
                // If no staff account, check user accounts
                let SignupAccounts = JSON.parse(localStorage.getItem("user")) || [];
                let account = SignupAccounts.find(user => user.signup_email === login_email && user.signup_password === login_password);
        
                if (account) {
                    // Check if the user has a booking
                    localStorage.setItem("currentUserEmail", account.signup_email); 
                    let bookings = JSON.parse(localStorage.getItem("userBooking")) || [];
                    let userBooking = bookings.find(booking => booking.gmail === login_email);
        
                    // Set dynamic header based on booking status
                    let header = document.querySelector('h1');
                    if (userBooking) {
                        header.innerHTML = "Your Booking Details";
                    } else {
                        header.innerHTML = "Welcome!";
                    }
        
                    alert("Welcome!");
                    window.location = 'ordering.html';
                    resetLoginup();
                } else {
                    alert("User does not exist or incorrect password.");
                }
            }
        });
    }
    
    // Signup Functionality
    const signup = document.getElementById("signup");
    if (signup) {
        signup.addEventListener("click", function(event) {
            event.preventDefault();
            let signup_email = document.getElementById("signup_email").value;
            let signup_password = document.getElementById("signup_password").value;
            let signup_Cpassword = document.getElementById("signup_Cpassword").value;

    if (signup_email && signup_password && signup_Cpassword) {
        if (signup_password === signup_Cpassword) {
            let user = {
                signup_email: signup_email,
                signup_password: signup_password,
                signup_ConfirmPassword: signup_Cpassword
            };

            let SignupAccounts = JSON.parse(localStorage.getItem("user")) || [];

            SignupAccounts.push(user);
    
            localStorage.setItem("user", JSON.stringify(SignupAccounts));
            // let json = JSON.stringify(user);
            // localStorage.setItem(signup_email, json);
            alert("Registration Successful! Welcome to DineFlow!");
            showLoginForm();
            resetSignup();

        } else {
            alert("Passwords do not match");
        }
    } else {
        alert("All fields are required");
    }

        });
    }

    // Contact Us Functionality
    const submit = document.getElementById("Submit");
    if (submit) {
        submit.addEventListener("click", function() {
            let CU_Fname = document.getElementById("CU_Fname").value;
            let CU_gmail = document.getElementById("CU_gmail").value;
            let CU_message = document.getElementById("CU_message").value;
        
            let ContactMessage = {
                FullName: CU_Fname,
                Gmail: CU_gmail,
                Message: CU_message
            }
        
            let messages = JSON.parse(localStorage.getItem("ContactMessage")) || [];
        
            messages.push(ContactMessage);
            
            localStorage.setItem("ContactMessage", JSON.stringify(messages));
            alert("Thank you for your Message!");
            resetContactMessage();
        
        });
    }

    // Booking Functionality
    const bookNow = document.getElementById("BOOK_Now");
if (bookNow) {
    bookNow.addEventListener("click", function(event) {
        event.preventDefault();

        let Name = document.getElementById("Name").value;
        let gmail = document.getElementById("gmail").value;
        let contactNo = document.getElementById("contactNo").value;
        let Date = document.getElementById("Date").value;
        let Time = document.getElementById("Time").value;
        let peoples = document.getElementById("peoples").value;
        let select_table = document.getElementById("select_table").value;

        if (!Name || !gmail || !contactNo || !Date || !Time || !peoples || !select_table) {
            alert("All fields are required!");
            return;
        }

        let bookings = JSON.parse(localStorage.getItem("userBooking")) || [];
        
        let isTableBooked = bookings.some(booking => 
            booking.Date === Date && 
            booking.Time === Time && 
            booking.select_table === select_table
        );

        let isDuplicateBooking = bookings.some(booking => 
            booking.Date === Date && 
            booking.Time === Time && 
            booking.select_table === select_table &&
            booking.gmail === gmail
        );

        if (isTableBooked) {
            alert("This table is already booked for the selected date and time. Please choose another table or time.");
            return;
        }

        if (isDuplicateBooking) {
            alert("You have already booked this specific table, date, and time.");
            return;
        }

        let userBooking = {
            Name: Name,
            gmail: gmail,
            contactNo: contactNo,
            Date: Date,
            Time: Time,
            peoples: peoples,
            select_table: select_table
        };

        bookings.push(userBooking);
        localStorage.setItem("userBooking", JSON.stringify(bookings));
        localStorage.setItem("bookedTables", select_table);
        alert("Booking successful!");

        document.getElementById("Name").value = "";
        document.getElementById("gmail").value = "";
        document.getElementById("contactNo").value = "";
        document.getElementById("Date").value = "";
        document.getElementById("Time").value = "";
        document.getElementById("peoples").value = "";
        document.getElementById("select_table").value = "";
    });
}

    
});

//ADMIN FUNCTIONALITY
    const staffAccountsDiv = document.getElementById('staffAccounts');
    const staffInfoDiv = document.getElementById('staffInfo');
    const schedulingDiv = document.getElementById('Scheduling');
    const customerAccountsDiv = document.getElementById('customerAccounts');
    const customerFeedbackDiv = document.getElementById('customerFeedback');
    const OrderListDiv = document.getElementById('orderList');
    const bookedListDiv = document.getElementById("bookedList");
    
    const addStaffBtn = document.getElementById("ADD");

    if (staffAccountsDiv && staffInfoDiv && schedulingDiv && customerAccountsDiv && addStaffBtn ) {

        function hideAllSections() {
            staffAccountsDiv.style.display = 'none';
            staffInfoDiv.style.display = 'none';
            schedulingDiv.style.display = 'none';
            customerAccountsDiv.style.display = 'none';
            customerFeedbackDiv.style.display = 'none';
            OrderListDiv.style.display = 'none';
            bookedListDiv.style.display = 'none';
        }

        function showCustomerAccounts() {
            if (customerAccountsDiv.style.display === 'flex') {
                customerAccountsDiv.style.display = 'none'; 
            } else {
                hideAllSections();
                customerAccountsDiv.style.display = 'flex'; 
            }
        }

        function showAccounts() {
            if (staffAccountsDiv.style.display === 'flex') {
                staffAccountsDiv.style.display = 'none'; 
            } else {
                hideAllSections();
                staffAccountsDiv.style.display = 'flex'; 
            }
        }

        function showStaffInfo() {
            if (staffInfoDiv.style.display === 'flex') {
                staffInfoDiv.style.display = 'none'; 
            } else {
                hideAllSections();
                staffInfoDiv.style.display = 'flex'; 
            }
        }

        function showScheduling() {
            if (schedulingDiv.style.display === 'flex') {
                schedulingDiv.style.display = 'none';
            } else {
                hideAllSections();
                schedulingDiv.style.display = 'flex'; 
            }
        }
        function showCustomerFeedback(){
            if(customerFeedbackDiv.style.display === 'flex'){
                customerFeedbackDiv.style.display = 'none';
            }else{
                hideAllSections();
                customerFeedbackDiv.style.display = 'flex';
            }
        }
        function showOrderList(){
            if(OrderListDiv.style.display === 'flex'){
                OrderListDiv.style.display = 'none';
            }else{
                hideAllSections();
                OrderListDiv.style.display = 'flex';
            }
        }
        function showBookedList(){
            if(bookedListDiv.style.display === 'flex'){
                bookedListDiv.style.display = 'none';
            }else{
                hideAllSections();
                bookedListDiv.style.display = 'flex';
            }
        }

        window.onload = function() {
            hideAllSections();
        };

        // Staff Account Addition
        addStaffBtn.addEventListener("click", function() {
            let Fullname = document.getElementById("Fname").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            
            if(Fullname && email && password){
                let staff = {
                    Fullname: Fullname,
                    email: email,
                    password: password,
                    userType: 'staff'
                };
    
                let addAccount = JSON.parse(localStorage.getItem("staff")) || [];
                addAccount.push(staff);
                localStorage.setItem("staff", JSON.stringify(addAccount));
                alert("Added successfully!");
                resetAdminForm();

                displayStaffUser();
            }else{
                alert("Please fill in all fields");
            }
            
        });
        displayOrders();
        
    }
    
    // ADMIN FUNCTIONALITY
// STAFF ACCOUNTS TABLE FUNCTIONALITY
let staff = [];
let getUserStaff = [];

function displayStaffUser() {
    getUserStaff = JSON.parse(localStorage.getItem("staff")) || [];
    staff = getUserStaff.filter(staff => staff.userType !== 'admin');
    let templateContent = "";

    staff.forEach((list, i) => { 
        templateContent += `<tr>
            <th>${i + 1}</th>
            <td>${list.Fullname}</td>
            <td>${list.email}</td>
            <td>${list.password}</td>
            <td>
                <button onclick="editStaffAccount(${i})" class="edit-btn">Edit</button>
                <button onclick="deleteStaffAccount(this)" class="delete-staffAcc-btn">Delete</button>
            </td>
        </tr>`;
    });


    document.getElementById("table_content1").innerHTML = templateContent;


}
function editStaffAccount(index){
    let getUserStaff = JSON.parse(localStorage.getItem("staff") || "[]");
    let staff = getUserStaff[index];

    Fname.value = staff.Fullname;
    email.value = staff.email;
    password.value = staff.password;
}
function deleteStaffAccount(td) {
    if (confirm("Are you sure you want to delete this account?")) {
        let row = td.parentElement.parentElement;
        let rowIndex = row.rowIndex - 1;

        let staff = JSON.parse(localStorage.getItem("staff")) || [];
        let filteredStaff = staff.filter(s => s.userType !== 'admin');
        let staffToDelete = filteredStaff[rowIndex];

        // Find the actual index in the main staff array
        let actualIndex = staff.findIndex(s => 
            s.email === staffToDelete.email && 
            s.Fullname === staffToDelete.Fullname
        );

        if (actualIndex !== -1) {
            staff.splice(actualIndex, 1);
            localStorage.setItem("staff", JSON.stringify(staff));
            displayStaffUser();
        }
    }
}

function Clear(){
    Fname.value = "";
    email.value = "";
    password.value = "";
}

// ADMIN ORDERLIST TABLE
function displayOrders() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    let orderList_content = "";

    orders.forEach((order, index) => {
        orderList_content += `
            <tr>
                <td>${index + 1}</td>
                <td>${order.email}</td>
                <td>${order.order.map(item => item.name).join(", ")}</td>
                <td>${new Date(order.timestamp).toLocaleString()}</td>
                <td>₱${order.order.reduce((sum, item) => sum + parseFloat(item.price.replace("₱", "")), 0).toFixed(2)}</td>
                <td>
                    <button  class="delete-order-btn" data-index="${index}">Delete</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("orderList_content").innerHTML = orderList_content;

    document.querySelectorAll(".delete-order-btn").forEach(button => {
        button.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            deleteOrder(index);
        });
    });
}
function deleteOrder(index) {
    if (confirm("Are you sure you want to delete this order?")) {
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.splice(index, 1); 
        localStorage.setItem("orders", JSON.stringify(orders)); 
        alert("Order deleted successfully!");
        displayOrders(); 
    }
}

// CUSTOMER FEEDBACK TABLE FUNCTIONALITY
let feedback = [];
let getFeedback= [];

function displayFeedback(){
    getFeedback = JSON.parse(localStorage.getItem("ContactMessage")) || [];
    feedback = getFeedback;
    let templateContent = "";

    feedback.forEach((list, index) => {
        templateContent += `<tr>
        <td>${index + 1}</td>
        <td>${list.FullName}</td>
        <td>${list.Gmail}</td>
        <td>${list.Message}</td>

    </tr>`;
    });

    document.getElementById("customerFeedback_content").innerHTML = templateContent;
}

// ADMIN CUSTOMER ACCOUNTS FUNCTIONALITY
let getCustomerAccounts = [];
let customerAccounts= [];

function displayCustomerAccounts(){
    getCustomerAccounts = JSON.parse(localStorage.getItem("user")) || [];
    customerAccounts = getCustomerAccounts;
    let table_content2 = "";

    customerAccounts.forEach((userList, index) => {
        table_content2 += `<tr>
            <td>${index + 1}</td>
            <td>${userList.signup_email}</td>
            <td>${userList.signup_password}</td>
            <td>
                <button class="delete-customerAcc-btn" data-index=${index}>Delete</button>
            </td>
        </tr>`;
    });
    document.getElementById("table_content2").innerHTML = table_content2;

    document.querySelectorAll(".delete-customerAcc-btn").forEach(button => {
        button.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            deleteCustomerAcc(index);
        });
    });
}
function deleteCustomerAcc(index) {
    if (confirm("Are you sure you want to delete this Account?")) {
        const users = JSON.parse(localStorage.getItem("user")) || [];
        users.splice(index, 1); 
        localStorage.setItem("user", JSON.stringify(users)); 
        alert("Account deleted successfully!");
        displayCustomerAccounts(); 
    }
}

// ADMIN STAFF PERSONAL INFO FUNCTIONALITY

let currentEditIndex = -1;
const btnAddStaff = document.getElementById("btnAddStaff");

if (btnAddStaff) {
    btnAddStaff.addEventListener("click", function () {
        let staffInfo_firstname = document.getElementById("staffInfo_firstname").value;
        let staffInfo_lastname = document.getElementById("staffInfo_lastname").value;
        let staffInfo_email = document.getElementById("staffInfo_email").value;
        let staffInfo_address = document.getElementById("staffInfo_address").value;
        let staffInfo_contactno = document.getElementById("staffInfo_contactno").value;

        if (!staffInfo_firstname || !staffInfo_lastname || !staffInfo_email || !staffInfo_address || !staffInfo_contactno) {
            alert("Please fill out all fields.");
            return;
        }

        let staffInfo = {
            Firstname: staffInfo_firstname,
            Lastname: staffInfo_lastname,
            Email: staffInfo_email,
            Address: staffInfo_address,
            Contact_No: staffInfo_contactno
        };

        let existingStaffInfo = JSON.parse(localStorage.getItem("staffInfo")) || [];
        if (currentEditIndex === -1) {
            existingStaffInfo.push(staffInfo);
            alert("Staff Information added successfully!");
        } else {
            existingStaffInfo[currentEditIndex] = staffInfo;
            alert("Staff Information updated successfully!");
            currentEditIndex = -1;
            btnAddStaff.textContent = "Add Staff";
        }

        localStorage.setItem("staffInfo", JSON.stringify(existingStaffInfo));
        resetFormStaffInfo();
        displayStaffInfo();
    });
}
// ADMIN FUNCTIONALITY FOR DISPLAY STAFF PERSONAL INFO IN TABLE
let getStaffInfo = [];
let staffInfo = [];

function displayStaffInfo(){
    getStaffInfo = JSON.parse(localStorage.getItem("staffInfo")) || [];
    staffInfo = getStaffInfo;
    let staffInfo_table = "";

    staffInfo.forEach((staffInfoList, index) => {
        staffInfo_table += `<tr>
            <td>${index + 1}</td>
            <td>${staffInfoList.Firstname}</td>
            <td>${staffInfoList.Lastname}</td>
            <td>${staffInfoList.Email}</td>
            <td>${staffInfoList.Address}</td>
            <td>${staffInfoList.Contact_No}</td>
            <td>
                <button onclick="editStaffInfo(${index})" class="edit-btn">Edit</button>
                <button onclick="deleteStaffInfo(${index})" class="delete-staffInfo-btn">Delete</button>
            </td>
        </tr>`;
    });
    document.getElementById("staffInfo_table").innerHTML = staffInfo_table;

    document.querySelectorAll(".delete-staffInfo-btn").forEach(button => {
        button.addEventListener("click", function () {

            deleteStaffInfo(index);
        });
    });
}
function editStaffInfo(index){  
    let getStaffInfo = JSON.parse(localStorage.getItem("staffInfo") || "[]");
    let staffInfo = getStaffInfo[index];

    document.getElementById("staffInfo_firstname").value = staffInfo.Firstname;
    document.getElementById("staffInfo_lastname").value = staffInfo.Lastname;
    document.getElementById("staffInfo_email").value = staffInfo.Email;
    document.getElementById("staffInfo_address").value = staffInfo.Address;
    document.getElementById("staffInfo_contactno").value = staffInfo.Contact_No;

    currentEditIndex = index;
    btnAddStaff.textContent = "Update Staff";
}
function deleteStaffInfo(index) {
    if(confirm("Are you sure you want to Delete this?")){
        let getStaffInfo = JSON.parse(localStorage.getItem("staffInfo") || "[]");
        getStaffInfo.splice(index, 1); 
        localStorage.setItem("staffInfo", JSON.stringify(getStaffInfo)); 
        displayStaffInfo(); 
    }
}

let getBookedList = [];
let BookedList = [];
function displayBookedList(){
    getBookedList = JSON.parse(localStorage.getItem("userBooking")) || [];
    BookedList = getBookedList;
    let bookedList_content = "";

    BookedList.forEach((bookedlist, index) => {
        bookedList_content += `<tr>
            <td>${index + 1}</td>
            <td>${bookedlist.Name}</td>
            <td>${bookedlist.gmail}</td>
            <td>${bookedlist.contactNo}</td>
            <td>${bookedlist.Date}</td>
            <td>${bookedlist.Time}</td>
            <td>${bookedlist.peoples}</td>
            <td>${bookedlist.select_table}</td>
            <td>
                <button class="delete-booked-btn" data-index="${index}">Delete</button>
            </td>
        </tr>`;
    });
    document.getElementById("bookedList_content").innerHTML = bookedList_content;

    document.querySelectorAll(".delete-booked-btn").forEach(button => {
        button.addEventListener("click", function () {
            const index = parseInt(this.getAttribute("data-index"));
            deleteBookedList(index);
        });
    });
}

function deleteBookedList(index) {
    if (confirm("Are you sure you want to delete this booking?")) {
        let bookings = JSON.parse(localStorage.getItem("userBooking")) || [];
 
        bookings.splice(index, 1);
        localStorage.setItem("userBooking", JSON.stringify(bookings));
        alert("Booking deleted successfully!");
        displayBookedList();
    }
}


// RESET FUNCTION FORM IN ADMIN STAFF PERSONAL INFO
function resetFormStaffInfo(){
    staffInfo_firstname.value = "";
    staffInfo_lastname.value = "";
    staffInfo_email.value = "";
    staffInfo_address.value = "";
    staffInfo_contactno.value = "";
}


// RESET FORM FUNCTION FOR SIGNUP,LOGIN,CONTACTUS
function resetSignup(){
    signup_email.value = "";
    signup_password.value = "";
    signup_Cpassword.value = "";
}
function resetLoginup(){
    login_email.value = "";
    login_password.value = "";
}
function resetContactMessage(){
    document.getElementById("CU_Fname").value = "";
    document.getElementById("CU_gmail").value = "";
    document.getElementById("CU_message").value = "";
}
function resetAdminForm(){
    Fname.value = "";
    email.value = "";
    password.value = "";
}

// ORDERING FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function () {
    const addToOrderButtons = document.querySelectorAll(".add-to-order"); 
    const orderContainer = document.querySelector(".total_container");
    const orderList = [];

    addToOrderButtons.forEach(button => {
        button.addEventListener("click", function () {
            const foodCard = this.parentElement;
            const foodName = foodCard.querySelector(".food-name").textContent;
            const foodPrice = foodCard.querySelector(".food-price").textContent;
            const foodImageSrc = foodCard.querySelector("img").src;

            orderList.push({ name: foodName, price: foodPrice, image: foodImageSrc });

            updateOrderContainer();
        });
    });

    function updateOrderContainer() {
        orderContainer.innerHTML = `
            <h1 class="ordersummary">Order Summary</h1>
            <ul class="order-list">
                ${orderList.map((item, index) => `
                    <li class="order-item">
                        <img src="${item.image}" alt="${item.name}" class="order-image" style="width: 50px; height: 50px; margin-right: 10px;">
                        <span>${item.name} - ${item.price}</span>
                        <button class="add-item" data-index="${index}">+</button>
                        <button class="remove-item" data-index="${index}">Remove</button>
                    </li>
                `).join("")}
            </ul>
            <h2 class="total_line">Total Amount: ₱${calculateTotal()}</h2>
            <button class="btn_payorder" id="payOrder">
                    <i class="fas fa-credit-card"></i> Pay Order
            </button>
        `;

        document.querySelectorAll(".add-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.dataset.index;
                orderList.push(orderList[index]); 
                updateOrderContainer();
            });
        });

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.dataset.index;
                orderList.splice(index, 1); 
                updateOrderContainer();
            });
        });
        const payOrderButton = document.getElementById("payOrder");
        if (payOrderButton) {
            payOrderButton.addEventListener("click", function () {
                const currentUserEmail = localStorage.getItem("currentUserEmail");
    
                if (!currentUserEmail) {
                    alert("You must be logged in to place an order.");
                    return;
                }
    
                const orderDetails = {
                    email: currentUserEmail,
                    order: orderList,
                    timestamp: new Date().toISOString(),
                };
    
                const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
                existingOrders.push(orderDetails);
                localStorage.setItem("orders", JSON.stringify(existingOrders));

                alert("Your order has been successfully placed!");
                resetOrderDisplay();
                
            });
        }
    
    }
    function resetOrderDisplay() {
        orderList.length = 0;  
        updateOrderContainer();  
    }
    

    function calculateTotal() {
        return orderList.reduce((total, item) => {
            return total + parseFloat(item.price.replace("₱", ""));
        }, 0).toFixed(2);
    }

    // FUNCTIONALITY FOR SCHEDULING ADMIN
    let currentEditIndex = -1;
    const btnAddSchedule = document.getElementById("addSchedule");
    
    if (btnAddSchedule) {
        btnAddSchedule.addEventListener("click", function () {
            const staffName = document.getElementById("staffName").value;
            const scheduleDate = document.getElementById("scheduleDate").value;
            const scheduleTime = document.getElementById("scheduleTime").value;
            const taskDetails = document.getElementById("taskDetails").value;
    
            if (!staffName || !scheduleDate || !scheduleTime || !taskDetails) {
                alert("Please fill out all fields.");
                return;
            }
    
            const schedule = {
                StaffName: staffName,
                Date: scheduleDate,
                Time: scheduleTime,
                Task: taskDetails
            };
    
            let existingSchedules = JSON.parse(localStorage.getItem("schedules")) || [];
            if (currentEditIndex === -1) {
                existingSchedules.push(schedule);
                alert("Schedule added successfully!");
            } else {
                existingSchedules[currentEditIndex] = schedule;
                alert("Schedule updated successfully!");
                currentEditIndex = -1;
                btnAddSchedule.textContent = "Add Schedule";
            }
    
            localStorage.setItem("schedules", JSON.stringify(existingSchedules));
            resetScheduleForm();
            displaySchedules();
        });
    }
    
    
    function resetScheduleForm() {
        document.getElementById("staffName").value = "";
        document.getElementById("scheduleDate").value = "";
        document.getElementById("scheduleTime").value = "";
        document.getElementById("taskDetails").value = "";
    }
    
    function displaySchedules() {
        const scheduleTableBody = document.getElementById("scheduleTableBody");
        const schedules = JSON.parse(localStorage.getItem("schedules")) || [];
        scheduleTableBody.innerHTML = "";
    
        schedules.forEach((schedule, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${schedule.StaffName}</td>
                <td>${schedule.Date}</td>
                <td>${schedule.Time}</td>
                <td>${schedule.Task}</td>
                <td>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-schedule-btn" data-index="${index}">Delete</button>
                </td>
            `;
            scheduleTableBody.appendChild(row);
        });
    
        // Attach event listeners to edit and delete buttons
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                editSchedule(index);
            });
        });
    
        document.querySelectorAll(".delete-schedule-btn").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                deleteSchedule(index);
            });
        });
    }
    
    function editSchedule(index) {
        const schedules = JSON.parse(localStorage.getItem("schedules")) || [];
        const schedule = schedules[index];
    
        document.getElementById("staffName").value = schedule.StaffName;
        document.getElementById("scheduleDate").value = schedule.Date;
        document.getElementById("scheduleTime").value = schedule.Time;
        document.getElementById("taskDetails").value = schedule.Task;
    
        currentEditIndex = index;
        btnAddSchedule.textContent = "Update Schedule";
    }
    
    function deleteSchedule(index) {
        let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
        schedules.splice(index, 1);
        localStorage.setItem("schedules", JSON.stringify(schedules));
        alert("Schedule deleted successfully!");
        displaySchedules();
    }
    
    // Call displaySchedules on page load to display existing schedules
    
    


    if (document.getElementById("table_content1")) {
        displayStaffUser();
    }

    if (document.getElementById("customerFeedback_content")) {
        displayFeedback();
    }
    if (document.getElementById("table_content2")) {
        displayCustomerAccounts();
    }
    if (document.getElementById("staffInfo_table")) {
        displayStaffInfo();
    }
    if (document.getElementById("bookedList_content")) {
        displayBookedList();
    }
    if (document.getElementById("scheduleTableBody")) {
        displaySchedules();
    }

    
});