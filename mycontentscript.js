//my content script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var responseArgs = { text: 'OTP not found', class: 'fail' };
    if (request.otpText){
      if(document.getElementsByName('sms.otp').length > 0){
        document.getElementsByName('sms.otp')[0].value = request.otpText.trim();
        responseArgs.text = request.otpText.trim();
        responseArgs.class = 'success';
      }
    }
      sendResponse(responseArgs);
});

$(function(){
    var ctrlDown = false;
    var ctrlKey = 17, cKey = 67;

    $(document).keydown(function(e)
    {
        if (e.keyCode == ctrlKey) ctrlDown = true;
    }).keyup(function(e)
    {
        if (e.keyCode == ctrlKey) ctrlDown = false;
    });

  $(document).on('keyup',function(e){
      if(window.location.href.toLowerCase().indexOf('https://mightytext.net/web') > -1 ){
          if (ctrlDown && e.keyCode == cKey){
              var port = chrome.runtime.connect({name: "otpExtPort"});
              port.postMessage({msgHead: "otpText", otpText: window.getSelection().toString()});       
          }
      }
  });

});