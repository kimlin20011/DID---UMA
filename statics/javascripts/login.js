"use strict";

let did_select = $("#did_select");
let did_select_Button = $("#did_select_Button");

let userId = new Map();  //map  did_name to did

//document.getElementsByClassName("close")[0];
//let selectedUserName = "";
let userIds = new Map();


// 載入存在的resource至 select tag
$.get("/umaRqP/getExistUser", function (results) {
    for (let info of results.info) {
        did_select.append(
            `<option value="${info.DID_name}">${info.DID_name}</option>`
        );
        //map the did_name to did
        userIds[info.DID_name] = info.DID;
    }
});

did_select_Button.on("click", function () {
    //先檢查resource id有沒有紀錄值
    let user_name = did_select.val();
    if (resourceIds[resource_name] == null) {
        log(`resource ID empty`);
        alert(`resource ID empty`);
        return;
    }
    waitTransactionStatus();

    $.post(
        "uma/accessAuthorize",
        {
            account: nowAccount,
            password: password,
            didMethod: `ethr`,
            resourceIdentity: resourceIds[resource_name]
        },
        function (result) {
            if (result.status === true) {
                log(result);
                doneTransactionStatus();
            } else {
                log(`update failed`);
                log(result);
                doneTransactionStatus();
                alert(`request access failed`);
            }
        }
    );
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

//deploy tr
function waitTransactionStatus() {
    $("#nowStatus").html(
        'Account status:<b style="color: blue">(Transaction Padding...)</b>'
    );
}

function doneTransactionStatus() {
    $("#nowStatus").text("Status:");
}

//button style setting
$(":button").each(function () {
    $(this).on({
        mouseover: function () {
            $(this).attr("style", "background-color: #608de2");
        },
        mouseout: function () {
            $(this).attr("style", "background-color: #4364a1");
        }
    });
});
