const busId = document.getElementById('select1');

function selectId(item) {
  busId.innerHTML = item;
  busId.classList.add('btn-light');
  busStop();
  
  
}

function busStop() {
  const newButton = document.createElement('button');
  newButton.className = 'btn btn-success dropdown-toggle';
  newButton.type = 'button';
  newButton.setAttribute('data-bs-toggle', 'dropdown');
  newButton.setAttribute('data-bs-auto-close', 'true');
  newButton.setAttribute('aria-expanded', 'false');
  document.getElementById('button2').innerHTML = 'Bus stop: ';
  newButton.textContent = 'Select bus stop';

  const newDropdownMenu = document.createElement('ul');
    newDropdownMenu.className = 'dropdown-menu';
    newDropdownMenu.innerHTML = `
      <li><a class="dropdown-item" href="#">Item 1</a></li>
      <li><a class="dropdown-item" href="#">Item 2</a></li>
    `;

    const newButtonGroup = document.createElement('div');
    newButtonGroup.className = 'btn-group';
    newButtonGroup.appendChild(newButton);
    newButtonGroup.appendChild(newDropdownMenu);

    document.getElementById('button2').appendChild(newButtonGroup);
  }


