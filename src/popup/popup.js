document.addEventListener('DOMContentLoaded', function() {
  const updateButton = document.getElementById('updateButton');
  const inputValueInput = document.getElementById('inputValue');

  chrome.storage.local.get('inputValue', function(data) {
    if (data.inputValue) {
      inputValueInput.value = data.inputValue;
    }
  });

  updateButton.addEventListener('click', function() {
    const inputValue = inputValueInput.value;
    chrome.storage.local.set({ 'inputValue': inputValue }, function() {
      chrome.runtime.sendMessage({ action: 'updateInputValue', value: inputValue });
      window.close();
    });
  });
});