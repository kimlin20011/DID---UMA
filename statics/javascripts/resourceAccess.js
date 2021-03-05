"use strict";


let submit_button = $("#submit_button");
let userIds = new Map();
let password = `nccutest`;
let nowAccount = "";

let url_string = window.location.href; //get url string
let url = new URL(url_string);
let ticket = url.searchParams.get("resourceName");



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
    $.get("/umaRqP/requestRequest", {
        asURL: asURL,
        rqpId: nowAccount,
        ticketCrypto: ticketSigned,
        ticket: ticket,
        didMethod: `ethr`,
    }, function (result) {
        console.log(result);
        doneTransactionStatus();
    });
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
