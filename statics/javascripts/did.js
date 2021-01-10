"use strict";

let whoami = $("#whoami");
let whoamiButton = $("#whoamiButton");

let DID_registry_deploy = $("#DID_registry_deploy");
let deploy_button = $("#deploy_button");
let submit_registry_input = $("#submit_registry_input");
let submit_registry_button = $("#submit_registry_button");
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

let document_input = $("#document_input");
let register_did_document_button = $("#register_did_document_button");
let document_did_input = $("#document_did_input");

let creatDID_input = $("#creatDID_input");
let creatDID_claim_input = $("#creatDID_claim_input");
let creatDID_button = $("#creatDID_button");

let logger = $("#logger");
let nowAccount = "";

let password = `nccutest`;
// used mapping
//let IoTLoginedMap = new Map();
let registry_address = "";

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
deploy_button.on("click", function() {
  waitTransactionStatus();

  $.post(
    "didRegistry/deploy",
    {
      account: nowAccount,
      password: password
    },
    function(result) {
      /*        log({
            result : result,
        });*/
      if (result.status === true) {
        log(`Registry deploy success，contract address：${result.address}`);
        registry_address = result.address;
        $("#registry_address").html(
          `Registry address:<b style="color: mediumblue">${registry_address}</b>`
        );
        doneTransactionStatus();
      } else {
        log(`Registry deploy failed`);
        $("#registry_address").html(
          `Registry address:<br /><b style="color: mediumblue">${registry_address}</b>`
        );
        doneTransactionStatus();
      }
    }
  );
});

//按下submit_registry_button時
submit_registry_button.on("click", function() {
  registry_address = submit_registry_input.val();
  log(`registry address submit success, contract address：${registry_address}`);
  $("#registry_address").html(
    `Registry address:<br /><b style="color: mediumblue">${registry_address}</b>`
  );
});

register_button.on("click", function() {
  waitTransactionStatus();

  $.post(
    "didRegistry/registerIdentity",
    {
      account: nowAccount,
      password: password,
      url: register_url.val(),
      identity: register_id.val(),
      registryAddress: registry_address
    },
    function(result) {
      if (result.status === true) {
        log(result);
        doneTransactionStatus();
      } else {
        log(`register failed`);
        log(result);
        doneTransactionStatus();
      }
    }
  );
});

resolve_button.on("click", function() {
  waitTransactionStatus();

  $.get(`didResolver/resolve?did=${resolve_did.val()}`, function(result) {
    if (result.status === true) {
      log(result);
      doneTransactionStatus();
    } else {
      log(`resolve did failed`);
      log(result);
      doneTransactionStatus();
    }
  });
});

update_button.on("click", function() {
  waitTransactionStatus();

  $.post(
    "didRegistry/urlUpdate",
    {
      account: nowAccount,
      password: password,
      url: update_new_url.val(),
      previous_url: update_old_url.val(),
      identity: update_did.val(),
      registryAddress: registry_address
    },
    function(result) {
      if (result.status === true) {
        log(result);
        doneTransactionStatus();
      } else {
        log(`update failed`);
        log(result);
        doneTransactionStatus();
      }
    }
  );
});

revoke_button.on("click", function() {
  waitTransactionStatus();

  $.post(
    "didRegistry/revokeDID",
    {
      account: nowAccount,
      password: password,
      registryAddress: registry_address,
      identity: revoke_did.val()
    },
    function(result) {
      if (result.status === true) {
        log(result);
        doneTransactionStatus();
      } else {
        log(`revoke failed`);
        log(result);
        doneTransactionStatus();
      }
    }
  );
});

creatDID_button.on("click", function() {
  waitTransactionStatus();

  $.post(
    "didResolver/createDID",
    {
      account: nowAccount,
      password: password,
      registryAddress: registry_address,
      identity: creatDID_input.val(),
      claim: creatDID_claim_input.val()
    },
    function(result) {
      if (result.status === true) {
        log(result);
        doneTransactionStatus();
      } else {
        log(`creatDID failed`);
        log(result);
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
    'Account status:<b style="color: blue">(Transaction Padding...)</b>'
  );
}

function doneTransactionStatus() {
  $("#accountStatus").text("Account status:");
}

$(":button").each(function() {
  $(this).on({
    mouseover: function() {
      $(this).attr("style", "background-color: #608de2");
    },
    mouseout: function() {
      $(this).attr("style", "background-color: #4364a1");
    }
  });
});
