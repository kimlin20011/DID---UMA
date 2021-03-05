"use strict";

let did_select = $("#did_select");
let did_select_Button = $("#did_select_Button");
let submit_button = $("#submit_button");
let userIds = new Map();
let password = `nccutest`;
let nowAccount = "";

let url_string = window.location.href; //get url string
let url = new URL(url_string);
let ticket = url.searchParams.get("ticket");
let asURL = url.searchParams.get("asURL");
let ticketSigned = "";



// 載入存在的resource至 select tag
$.get("/umaRqP/getExistUser", function (results) {
    for (let info of results.info) {
        did_select.append(
            `<option value="${info.DID_name}">${info.DID_name}</option>`
        );
        //map the did_name to did
        userIds[info.DID_name] = info.DID;
    }
    nowAccount = userIds[did_select.val()];
});

//select the did and sign the ticket by did
did_select_Button.on("click", function () {
    waitTransactionStatus();
    // sign the ticket by RqP ID
    nowAccount = userIds[did_select.val()];

    $.post("/umaRqP/sign", {
        account: nowAccount,
        password: password,
        text: ticket,
    }, function (result) {
        ticketSigned = result;
        console.log(ticketSigned);
        doneTransactionStatus();
    });
});


submit_button.on("click", function () {
    //先檢查resource id有沒有紀錄值
    let user_name = did_select.val();
    if (userIds[user_name] == null) {
        console.log(`user DID empty`);
        alert(`user DID empty`);
        return;
    }
    waitTransactionStatus();
    //send rqpDid, ticket, ticketSigned
    $.post("/umaRqP/accessAuthorization", {
        asURL: asURL,
        rqpId: nowAccount,
        ticketCrypto: ticketSigned,
        ticket: ticket,
        didMethod: `ethr`,
    }, function (result) {
        console.log(result);
        doneTransactionStatus();
    });

    // $.post(
    //     asURL,
    //     {
    //         rqpId: nowAccount,
    //         ticketCrypto: ticketSigned,
    //         ticket: ticket,
    //         didMethod: `ethr`,
    //     },
    //     function (result) {
    //         if (result.status === true) {
    //             console.log(result);
    //             alert(`Access authorization success`);
    //             doneTransactionStatus();
    //         } else {
    //             console.log(`update failed`);
    //             console.log(result);
    //             doneTransactionStatus();
    //             alert(`Access authorization failed`);
    //         }
    //     }
    // );
});

function waitTransactionStatus() {
    $("#nowStatus").html(
        'Account status:<b style="color: blue">(Padding...)</b>'
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
