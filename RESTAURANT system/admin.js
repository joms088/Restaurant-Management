// SHOW CONTAINER FOR EACH BUTTONS
let staffAccountsDiv = document.getElementById('staffAccounts');
let staffInfoDiv = document.getElementById('staffInfo');
let schedulingDiv = document.getElementById('Scheduling');
let customerAccountsDiv = document.getElementById('customerAccounts');
let customerFeedbackDiv = document.getElementById('customerFeedback');

function hideAllSections() {
    staffAccountsDiv.style.display = 'none';
    staffInfoDiv.style.display = 'none';
    schedulingDiv.style.display = 'none';
    customerAccountsDiv.style.display = 'none';
    customerFeedbackDiv.style.display = 'none';
}
function showCustomerAccounts(){
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

window.onload = function() {
    hideAllSections();
};

//STAFF ACCOUNTS
const ADD = document.getElementById("ADD");

ADD.addEventListener("click",function(){
    let Fname = document.getElementById("Fname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let staff = {
        Fullname: Fname,
        email: email,
        password: password,
        userType: 'staff'
    };

    let addAccount = JSON.parse(localStorage.getItem("staff")) || [];
    addAccount.push(staff);
    localStorage.setItem("staff", JSON.stringify(addAccount));
    alert("Added successfully!");
    resetForm();
});

function resetForm(){
    Fname.value = "";
    email.value = "";
    password.value = "";
}

// CUSTOMER FUNCTION
// Function to load users from local storage and display in the table
function loadCustomerAccounts() {
    // Retrieve the accounts stored under the 'user' key
    let SignupAccounts = JSON.parse(localStorage.getItem("user")) || [];

    // Get the table body element to insert rows
    let tableContent = document.getElementById("table_content2");

    // Clear any existing content in the table
    tableContent.innerHTML = "";

    // Iterate over each account and add a row to the table
    SignupAccounts.forEach((account, index) => {
      let row = document.createElement("tr");

      // Create Gmail cell
      let gmailCell = document.createElement("td");
      gmailCell.textContent = account.signup_email;
      row.appendChild(gmailCell);

      // Create Password cell
      let passwordCell = document.createElement("td");
      passwordCell.textContent = account.signup_password;
      row.appendChild(passwordCell);

      // Create Action cell with a delete button
      let actionCell = document.createElement("td");
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = function() {
        deleteAccount(index); // Pass the index to the delete function
      };
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);

      // Append the row to the table body
      tableContent.appendChild(row);
    });
  }

  // Function to delete an account by index
  function deleteAccount(index) {
    // Retrieve the accounts array from local storage
    let SignupAccounts = JSON.parse(localStorage.getItem("user")) || [];
    
    // Remove the account at the specified index
    SignupAccounts.splice(index, 1);

    // Update the local storage with the modified array
    localStorage.setItem("user", JSON.stringify(SignupAccounts));

    // Reload the table to reflect the deletion
    loadCustomerAccounts();
  }

  // Load customer accounts when the page loads
  document.addEventListener("DOMContentLoaded", loadCustomerAccounts);