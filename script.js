const busId = document.getElementById('select1');

function selectId(item) {
  busId.innerHTML = item;
  busId.classList.add('btn-light');
  busStopData();
}

function busStopData() {
  fetch(`https://arrivelah2.busrouter.sg/?id=83139`)
  .then(response => response.json())
  .then(data => {
    const busStopId = data.services;
    
    const newButton = document.createElement('button');
    newButton.className = 'btn btn-success dropdown-toggle';
    newButton.type = 'button';
    newButton.setAttribute('data-bs-toggle', 'dropdown');
    newButton.setAttribute('data-bs-auto-close', 'true');
    newButton.setAttribute('aria-expanded', 'false');
    document.getElementById('button2').innerHTML = '';
    newButton.textContent = 'Select bus stop';
    
    const newDropdownMenu = document.createElement('ul');
    newDropdownMenu.className = 'dropdown-menu';
    
    for (let i=0; i<busStopId.length; i++) {
      const anchor = document.createElement('a');
      anchor.className = 'dropdown-item';
      let list = document.createElement('li');
      list.textContent = busStopId[i].no;
      anchor.appendChild(list);
      newDropdownMenu.appendChild(anchor);
    }
    
    const newButtonGroup = document.createElement('div');
    newButtonGroup.className = 'btn-group';
    newButtonGroup.appendChild(newButton);
    newButtonGroup.appendChild(newDropdownMenu);

    const label = document.createElement('span'); // Create a label span element.
    label.textContent = 'Bus stop: ';
    document.getElementById('button2').innerHTML = ''; // Clear the content of button2
    document.getElementById('button2').appendChild(label); // Append the label
    document.getElementById('button2').appendChild(newButtonGroup); // Append the newButtonGroup
  
  })
  .catch(err => console.error(err));
}

