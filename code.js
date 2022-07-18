function getandupdate() {
    // getting values from form
    ttl = document.getElementById(`title`).value; //id=title me se value leke ttl me daala
    dscrptn = document.getElementById(`description`).value; //id=title me se value leke dscrptn me daala
    console.log(`Updating List....`);
    if (localStorage.getItem(`itemJson`) == null) {
        //local storage se get item kare magar itemjson khaali ho, to itemjson banao
        itemJsonArray = []; //itemjsonarray naam ka array banaye
        itemJsonArray.push([ttl, dscrptn]); //itemjsonarray me ttl aur dscrptn se array value leke push kiye(insert on end of an array) kiye
        localStorage.setItem(`itemJson`, JSON.stringify(itemJsonArray)); //local storage me set item se itemjson me itemjsonarray ko string bana ke daale
    } else {
        itemJsonArrayString = localStorage.getItem(`itemJson`); //itemJsonArrayString me local storage se getitem kiye
        itemJsonArray = JSON.parse(itemJsonArrayString); //itemJsonArray me itemJsonArrayString ko parse karke daale
        itemJsonArray.push([ttl, dscrptn]); //itemjsonarray me ttl aur dscrptn se array value leke push kiye(insert on end of an array) kiye
        localStorage.setItem(`itemJson`, JSON.stringify(itemJsonArray)); //local storage me set item se itemjson me itemjsonarray ko string bana ke daale
    }
    update();
}
function update() {
    //update naam ka function banaye
    if (localStorage.getItem(`itemJson`) == null) {
        //local storage se get item kare magar itemjson khaali ho, to itemjson banao
        itemJsonArray = []; //itemjsonarray naam ka array banaye
        localStorage.setItem(`itemJson`, JSON.stringify(itemJsonArray)); //local storage me set item se itemjson me itemjsonarray ko string bana ke daale
    } else {
        itemJsonArrayString = localStorage.getItem(`itemJson`); //itemJsonArrayString me local storage se getitem kiye
        itemJsonArray = JSON.parse(itemJsonArrayString); //itemJsonArray me itemJsonArrayString ko parse karke daale
    }

    // filling values from form to table
    let tblbdy = document.getElementById(`tablebody`); //id=tablebody me se value leke tblbdy me daala
    let str = ""; //ek empty string banaye str
    itemJsonArray.forEach((element, index) => {
        str += `<tr>
                <td>${index + 1}</td>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn" onclick="deleted(${index})">Delete</button></td>
                </tr>`;
    });
    tblbdy.innerHTML = str;
}
add = document.getElementById(`add`);
add.addEventListener(`click`, getandupdate);
update();
function deleted(itemindex) {
    console.log(`Delete`, itemindex);
    itemJsonArrayString = localStorage.getItem(`itemJson`);
    itemJsonArray = JSON.parse(itemJsonArrayString);
    // delete item index element from array
    itemJsonArray.splice(itemindex, 1);
    localStorage.setItem(`itemJson`, JSON.stringify(itemJsonArray));
    update();
}

function clearstorage() {
    if (confirm(`Do You Want TO Clear All Data?`)) {
        console.log(`Clearing the storage`);
        // delete all item element from list
        localStorage.clear();
        update();
    }
}