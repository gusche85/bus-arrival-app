const busId = document.getElementById('select1');
const busStop = document.getElementById('button2');
const output = document.getElementById('output');

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
    busStop.innerHTML = '';
    newButton.textContent = 'Select bus stop';
    
    const newDropdownMenu = document.createElement('ul');
    newDropdownMenu.className = 'dropdown-menu';
    
    for (let i=0; i<busStopId.length; i++) {
      const anchor = document.createElement('a');
      anchor.className = 'dropdown-item';
      let list = document.createElement('li');
      list.textContent = busStopId[i].no;
                            list.onclick = () => {
                              // Get the selected bus stop id
                              const selectedBusStopId = busStopId[i].no;

                              // Call displayData with the selected bus stop id
                              displayData(selectedBusStopId);
                            };
      anchor.appendChild(list);
      newDropdownMenu.appendChild(anchor);
    }

    const newButtonGroup = document.createElement('div');
    newButtonGroup.className = 'btn-group';
    newButtonGroup.appendChild(newButton);
    newButtonGroup.appendChild(newDropdownMenu);

    const label = document.createElement('span'); 
    label.textContent = 'Bus stop: ';
    busStop.innerHTML = ''; 
    busStop.appendChild(label); 
    busStop.appendChild(newButtonGroup); 
    
    //output.innerHTML = '';
    // Create a table element with Bootstrap classes
    const table = document.createElement('table');
    table.className = 'table bg-success-subtle mt-5 pt-5 pb-5';

    // Create a table header row with Bootstrap classes
    const headerRow = document.createElement('tr');
   // headerRow.className = 'table table-warning mt-5';
    const headers = ["Bus Number", "Next", "Subsequent", "Next2", "Next3"];
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    output.appendChild(table);
   
  })
  .catch(err => console.error(err));
}

function displayData(selectedBusStopId) {

  
}

                                   