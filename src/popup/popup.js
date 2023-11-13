document.addEventListener('DOMContentLoaded', function() {
  const updateButton = document.getElementById('updateButton');
  const inputValueInput = document.getElementById('inputValue');
  const autoCompleteInput = document.getElementById('autoComplete');

  chrome.storage.local.get('inputValue', function(data) {
    if (data.inputValue) {
      inputValueInput.value = data.inputValue;
    }
  });
  chrome.storage.local.get('checkboxValue', function(data) {
    if (data.checkboxValue) {
      autoCompleteInput.checked = data.checkboxValue;
    }
  })

  updateButton.addEventListener('click', function() {
    const inputValue = inputValueInput.value;
    chrome.storage.local.set({ 'inputValue': inputValue }, function() {
      chrome.runtime.sendMessage({ action: 'updateInputValue', value: inputValue });
    });
    chrome.storage.local.set({ 'checkboxValue': autoCompleteInput.checked }, function() {
      chrome.runtime.sendMessage({ action: 'updateCheckboxValue', value: autoCompleteInput.checked });
      console.log('Valeur de checkboxValue mise à jour dans le stockage local :', autoCompleteInput.checked);
    });
    window.close();
  });
});