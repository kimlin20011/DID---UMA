"use strict";

let whoami = $("#whoami");
let whoamiButton = $("#whoamiButton");

let Authorization_address_text = $("#Authorization_address");
let deploy_button = $("#deploy_button");
let submit_Authorization_input = $("#submit_Authorization_input");
let submit_Authorization_button = $("#submit_Authorization_button");

let resource_name_input = $("#resource_name_input");
let resource_did_input = $("#resource_did_input");
let resource_register_button = $("#resource_register_button");

let policy_resource_did_input = $("#policy_resource_did_input");
let issuer_input = $("#issuer_input");
let claim_input = $("#claim_input");
let policy_button = $("#policy_button");

let logger = $("#logger");
let nowAccount = "";

let password = `nccutest`;
// used mapping
//let IoTLoginedMap = new Map();
let authorization_address = "";

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
    "uma/deploy",
    {
      account: nowAccount,
      password: password
    },
    function(result) {
      if (result.status === true) {
        log(
          `Authorization deploy success，contract address：${result.address}`
        );
        authorization_address = result.address;
        Authorization_address_text.html(
          `Authorization address:<b style="color: mediumblue">${authorization_address}</b>`
        );
        doneTransactionStatus();
      } else {
        log(`Authorization deploy failed`);
        Authorization_address_text.html(
          `Authorization address:<br /><b style="color: mediumblue">${authorization_address}</b>`
        );
        doneTransactionStatus();
      }
    }
  );
});

//按下submit_registry_button時
submit_Authorization_button.on("click", function() {
  authorization_address = submit_Authorization_input.val();
  log(
    `Authorization address submit success, contract address：${authorization_address}`
  );
  Authorization_address_text.html(
    `Authorization address:<br /><b style="color: mediumblue">${authorization_address}</b>`
  );
});

resource_register_button.on("click", function() {
  waitTransactionStatus();

  $.post(
    "uma/registerResource",
    {
      account: nowAccount,
      password: password,
      identity: resource_did_input.val(),
      resourceName: resource_name_input.val()
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

policy_button.on("click", function() {
  waitTransactionStatus();

  $.post(
    "uma/setPolicy",
    {
      account: nowAccount,
      password: password,
      issuer:issuer_input.val(),
      resourceIdentity: policy_resource_did_input.val(),
      claim: claim_input.val(),
    },
    function(result) {
      if (result.status === true) {
        log(result);
        doneTransactionStatus();
      } else {
        log(`set policy failed`);
        log(result);
        doneTransactionStatus();
      }
    }
  );
});

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
