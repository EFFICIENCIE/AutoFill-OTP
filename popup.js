// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var tabId, queryInfo = {
    'title':'*Third Party Confirm Screen*'    
};

chrome.tabs.query(queryInfo, function(tabs) {
  var tab = tabs[0],result='';
  tabId = tab.id;
});

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      if (msg.msgHead == "otpText"){
          chrome.tabs.sendMessage(tabId, {otpText: msg.otpText}, function(response) {
            document.getElementById('status').innerHTML = response.text;
            document.getElementById('status').setAttribute("class", response.class);
          });
      }
    });
});