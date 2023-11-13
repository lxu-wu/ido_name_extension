function updateInputValue(inputValue) {
  const activeElement = document.activeElement;
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const currentDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;

  if (activeElement.value)
    activeElement.value = activeElement.value + "\n" + "(" + inputValue + " " + currentDateTime + ")" + " : ";
  else
    activeElement.value = "(" + inputValue + " " + currentDateTime  + ")" + " : ";
}



function changeInputValue() {
  inputValue = prompt('Ton NOM :');
  chrome.runtime.sendMessage({ action: 'updateInputValue', value: inputValue });
  return inputValue;
}

function injectName() {
  let inputValue = null;
  
  chrome.storage.local.get('inputValue', function(data) {
    if (data.inputValue) {
      inputValue = data.inputValue;
    }
  });
  
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.inputValue) {
      const newValue = changes.inputValue.newValue;
      inputValue = newValue;
    }
  });

  document.addEventListener('click', function(event) {
    const activeElement = document.activeElement;
    
    const name = ["tellcustomer", "report", "aesthetic", "diagnostic", "solution", "comment"];
    
    if (autoComplete && activeElement && !activeElement.value && name.includes(activeElement.getAttribute('name')))
      {
      if (!inputValue)
        inputValue = prompt('Ton NOM :');
        chrome.runtime.sendMessage({ action: 'updateInputValue', value: inputValue });
      if (inputValue) {
        updateInputValue(inputValue);
      }
    }

  });

  document.addEventListener('keydown', function(event) {
    if (event.metaKey && event.key === 'i') {
      const activeElement = document.activeElement;
      if ( (activeElement && activeElement.tagName === 'INPUT' && activeElement.type === 'text' ) ||
          (activeElement && activeElement.tagName === 'TEXTAREA') ) {
        if (!inputValue)
          inputValue = prompt('Ton NOM :');
          chrome.runtime.sendMessage({ action: 'updateInputValue', value: inputValue });
        if (inputValue) {
          updateInputValue(inputValue);
        }
      }
    }
    if (event.metaKey && event.key === 'h') {
      inputValue = changeInputValue();
    }
  });
}

injectName();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'updateInputValue') {
    const inputValue = request.value;
    chrome.storage.local.set({ 'inputValue': inputValue });
  }
});
