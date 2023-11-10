chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'updateInputValue') {
    updateInputValue(request.value);
  }
});

function updateInputValue(newInputValue) {
  chrome.storage.local.set({ 'inputValue': newInputValue }, function() {
    console.log('Valeur de inputValue mise à jour dans le stockage local :', newInputValue);
  });
}

function updateInputValue(newInputValue) {
  chrome.storage.local.set({ 'inputValue': newInputValue }, function() {
    console.log('Valeur de inputValue mise à jour dans le stockage local :', newInputValue);
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'updateInputValue', value: newInputValue });
    });
  });
}