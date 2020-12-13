"use strict";

let whoami = $("#whoami");
let whoamiButton = $("#whoamiButton");

let create_button = $("#create_button");
let register_id = $("#register_id");
let register_url = $("#register_url");
let register_button = $("#register_button");
let resolve_did = $("#resolve_did");

let resolve_button = $("#resolve_button");
let update_did = $("#update_did");
let update_old_url = $("#update_old_url");
let update_new_url = $("#update_new_url");
let update_button = $("#update_button");
let revoke_did = $("#revoke_did");

let revoke_button = $("#revoke_button");
let did_login_button = $("#did_login_button");

let logger = $("#logger");
let nowAccount = "";

let password = `nccutest`;
// used mapping
//let IoTLoginedMap = new Map();
let RM_address = "";
let Auth_address = "";

//let addressPasswordMap = new Map();

function log(...inputs) {
  for (let input of inputs) {
    if (typeof input === "object") {
      input = JSON.stringify(input, null, 2);
    }
    logger.html(input + "\n" + logger.html());
  }
}

// 當按下登入按鍵時
whoamiButton.on("click", async function() {
  nowAccount = whoami.val();
  log(nowAccount, "Login Ethereum Account");
});

// 載入使用者至 select tag
$.get("/blockchain/accounts", function(accounts) {
  for (let account of accounts) {
    whoami.append(`<option value="${account}">${account}</option>`);
  }
  nowAccount = whoami.val();
  log(nowAccount, "Login Ethereum Account");
});

//按下deploy_RM_contract_button時
deploy_RM_contract_button.on("click", function() {
  waitTransactionStatus();

  $.post(
    "/blockchain/deploy_RM",
    {
      //address: B_OAuthAddress,
      account: nowAccount,
      password: password
    },
    function(result) {
      /*        log({
            result : result,
        });*/
      if (result.status === true) {
        log(`RM 部署成功，合約位址：${result.address}`);
        RM_address = result.address;
        $("#rm_address").html(
          `RM address:<b style="color: mediumblue">${RM_address}</b>`
        );
        doneTransactionStatus();
      } else {
        log(`RM 部署失敗`);
        $("#rm_address").html(
          `RM address:<b style="color: mediumblue">${RM_address}</b>`
        );
        doneTransactionStatus();
      }
    }
  );
});

//按下RM_contract_address_button時
RM_contract_address_button.on("click", function() {
  RM_address = RM_contract_address.val();
  log(`RM 新增成功，合約位址：${RM_address}`);
  $("#rm_address").html(
    `RM address:<b style="color: mediumblue">${RM_address}</b>`
  );
});

//按下RM_contract_address_button時
Authorization_contract_address_button.on("click", function() {
  Auth_address = Authorization_contract_address.val();
  log(`Auth 新增成功，合約位址：${Auth_address}`);
  $("#auth_address").html(
    `Auth address:<b style="color: mediumblue">${Auth_address}</b>`
  );
});

//按下deploy_Authorization_contract_button時
deploy_Authorization_contract_button.on("click", function() {
  waitTransactionStatus();

  $.post(
    "/blockchain/deploy_Auth",
    {
      account: nowAccount,
      RM_Address: RM_contract_address_of_Authorization.val(),
      password: password
    },
    function(result) {
      if (result.status === true) {
        log(`Auth合約 部署成功，合約位址：${result.address}`);
        Auth_address = result.address;
        $("#auth_address").html(
          `Auth address:<b style="color: mediumblue">${Auth_address}</b>`
        );
        doneTransactionStatus();
      } else {
        log(`Auth合約部署失敗`);
        log(result);
        $("#auth_address").html(
          `Auth address:<b style="color: mediumblue">${Auth_address}</b>`
        );
        doneTransactionStatus();
      }
    }
  );
});
/*
function islogined() {
    if (IoTLoginedMap.get(nowAccount) === `succeeded`){
        $('#isGranted').html(`1. 登入狀態: ${nowAccount}<b style="color: green"><br>您已登入，可開始操作device</b>`);
        $('#loginStatus').html(`登入狀態: ${nowAccount}<b style="color: mediumblue"><br>登入成功 </b>`);
    }else{
        $('#isGranted').html(`1. 登入狀態: ${nowAccount}<b style="color: red"><br>您尚未登入，請先從上方登入</b>`);
        $('#loginStatus').html(`登入狀態: ${nowAccount}<b style="color: red"><br>尚未登入 </b>`);
    }
}
*/

function waitTransactionStatus() {
  $("#accountStatus").html(
    '帳戶狀態：<b style="color: blue">(等待區塊鏈交易驗證中...)</b>'
  );
}

function doneTransactionStatus() {
  $("#accountStatus").text("帳戶狀態：");
}

// mouseover
$(function() {
  whoamiButton.mouseover(function() {
    whoamiButton.attr("style", "background-color: #608de2");
  });
  whoamiButton.mouseout(function() {
    whoamiButton.attr("style", "background-color: #4364a1");
  });
});

$(function() {
  deploy_RM_contract_button.mouseover(function() {
    deploy_RM_contract_button.attr("style", "background-color: #608de2");
  });
  deploy_RM_contract_button.mouseout(function() {
    deploy_RM_contract_button.attr("style", "background-color: #4364a1");
  });
});

$(function() {
  deploy_Authorization_contract_button.mouseover(function() {
    deploy_Authorization_contract_button.attr(
      "style",
      "background-color: #608de2"
    );
  });
  deploy_Authorization_contract_button.mouseout(function() {
    deploy_Authorization_contract_button.attr(
      "style",
      "background-color: #4364a1"
    );
  });
});

$(function() {
  Authorization_contract_address_button.mouseover(function() {
    Authorization_contract_address_button.attr(
      "style",
      "background-color: #608de2"
    );
  });
  Authorization_contract_address_button.mouseout(function() {
    Authorization_contract_address_button.attr(
      "style",
      "background-color: #4364a1"
    );
  });
});

$(function() {
  RM_contract_address_button.mouseover(function() {
    RM_contract_address_button.attr("style", "background-color: #608de2");
  });
  RM_contract_address_button.mouseout(function() {
    RM_contract_address_button.attr("style", "background-color: #4364a1");
  });
});

$(function() {
  changeToRMButton.mouseover(function() {
    changeToRMButton.attr("style", "background-color: #608de2");
  });
  changeToRMButton.mouseout(function() {
    changeToRMButton.attr("style", "background-color: #4364a1");
  });
});
