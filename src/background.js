checkboxValue = true;

chrome.storage.local.get('checkboxValue', function(data) {
  if (data.checkboxValue !== undefined) {
    updateCheckboxValue(data.checkboxValue);
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'updateInputValue') {
    updateInputValue(request.value);
  }
  if (request.action === 'updateCheckboxValue') {
    updateCheckboxValue(request.value);
  }
});

function updateInputValue(newInputValue) {
  chrome.storage.local.set({ 'inputValue': newInputValue }, function() {
    console.log('Valeur de inputValue mise à jour dans le stockage local :', newInputValue);
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'updateInputValue', value: newInputValue });
    });
  });
}

function updateCheckboxValue(newCheckboxValue) {
  chrome.storage.local.set({ 'checkboxValue': newCheckboxValue }, function() {
    console.log('Valeur de checkboxValue mise à jour dans le stockage local :', newInputValue);
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'updateCheckboxValue', value: newCheckboxValue });
    });
  });
}