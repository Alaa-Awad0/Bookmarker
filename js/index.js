var bookmarkName = document.getElementById("bookmarkName");
var bookmarkUrl = document.getElementById("bookmarkUrl");
var tableContent = document.getElementById("tableContent");
var searchInput = document.getElementById("searchInput");

var submitBtn = document.getElementById("submitBtn");
var updateBtn = document.getElementById("updateBtn");
var bookmarkExist = document.getElementById("bookmarkExist");

var currentIndex = 0;

var bookmarkList = [];

if (localStorage.getItem("bookmarkContainer") !== null) {
    bookmarkList = JSON.parse(localStorage.getItem("bookmarkContainer")); 
    displayData(); 
  }
  

function addBookmark(){
    if(validationName() && validationUrl()){
        var bookmark = {
            name: bookmarkName.value.trim(),
            url: bookmarkUrl.value.trim()
        }
        var isDuplicate = bookmarkList.some(function(item) {
            return item.name === bookmark.name;
        });
        if(isDuplicate){
            bookmarkExist.innerHTML = `The bookmark "${bookmark.name}" already exists!`; 
            const myModal2 = new bootstrap.Modal(document.getElementById('myModal2'));
            myModal2.show();
        }else{
            bookmarkList.push(bookmark);
            displayData()
            clearForm();
            localStorage.setItem("bookmarkContainer", JSON.stringify(bookmarkList));
        }
    }else{
        const myModal = new bootstrap.Modal(document.getElementById('myModal'));
        myModal.show();
    }
}


function clearForm(){
    bookmarkName.value = null;
    bookmarkUrl.value = null;
    bookmarkName.classList.remove("is-valid"); 
    bookmarkUrl.classList.remove("is-valid"); 
}

function createCols(i){
    var regex = new RegExp(searchInput.value, "gi"); 

    return `
    <tr>
    <td>${i}</td>
    <td>${bookmarkList[i].name.replace(
        regex,
        (match) => `<span class="bg-warning">${match}</span>`
      )}</td>
    <td>
        <a href = "${bookmarkList[i].url}" target = "_blank">
        <button class="btn btn-visit">
            <i class="fa-solid fa-eye pe-1"></i>
            Visit
        </button>
        </a>
    </td>
    <td>
        <button onclick="setUpdateInfo(${i})" class="btn btn-update">
        <i class="fa-regular fa-pen-to-square"></i>
        Update
    </button>
    </td>
    <td>
        <button onclick="deleteData(${i})" class="btn btn-delete">
        <i class="fa-solid fa-trash pe-1"></i>
        Delete
    </button>
    </td>
    
</tr>`;
}

function displayData(){
    var cartona = "";

    for(var i = 0 ; i < bookmarkList.length ; i++ ){
        cartona += createCols(i);
    }
    tableContent.innerHTML = cartona;
}

function searchData(){
var term = searchInput.value;
var cartona = "";
for (var i = 0; i < bookmarkList.length; i++) {
    if (bookmarkList[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += createCols(i); 
    }
  }
  tableContent.innerHTML = cartona;
}

function deleteData(index){
    bookmarkList.splice(index, 1);
    displayData();
    localStorage.setItem("bookmarkContainer", JSON.stringify(bookmarkList));
}

function setUpdateInfo(index){

    currentIndex = index;

    bookmarkName.value = bookmarkList[index].name;
    bookmarkUrl.value = bookmarkList[index].url;

    submitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");

}

function updateData(){
    if(validationName() && validationUrl()){
        var bookmark = {
            name: bookmarkName.value.trim(),
            url: bookmarkUrl.value.trim()
        }
        var isDuplicate = bookmarkList.some(function(item, index) {
            return index !== currentIndex && item.name === bookmark.name;
        });
        if(isDuplicate){
            bookmarkExist.innerHTML = `The bookmark "${bookmark.name}" already exists!`; 
            const myModal2 = new bootstrap.Modal(document.getElementById('myModal2'));
            myModal2.show();
        }else{
            bookmarkList.splice(currentIndex , 1 , bookmark);
            displayData()
            clearForm();
            localStorage.setItem("bookmarkContainer", JSON.stringify(bookmarkList));
            submitBtn.classList.remove("d-none");
            updateBtn.classList.add("d-none");
        }
    }else{
        const myModal = new bootstrap.Modal(document.getElementById('myModal'));
        myModal.show();
    }
}

 
function validationName(){
   var regex = /^[\w\s]{3,}$/;
   var text = bookmarkName.value;

    if(regex.test(text)){
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");
        return true;
    }else{
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");
        return false;
    }
}

function validationUrl(){
   var regex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:[0-9]{1,5})?(\/.*)?$/;
   var text = bookmarkUrl.value;

    if(regex.test(text)){
        bookmarkUrl.classList.add("is-valid");
        bookmarkUrl.classList.remove("is-invalid");
        return true;
    }else{
        bookmarkUrl.classList.add("is-invalid");
        bookmarkUrl.classList.remove("is-valid");
        return false;
    }
}
