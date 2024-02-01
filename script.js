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
    busStop.innerHTML = 'Bus ID: ';
    newButton.textContent = 'Select bus';
    busStop.appendChild(newButton);

    const newDropdownMenu = document.createElement('ul');
    newDropdownMenu.className = 'dropdown-menu';

    for (let i=0; i<busStopId.length; i++) {
      const anchor = document.createElement('a');
      anchor.className = 'dropdown-item';
      let list = document.createElement('li');
      list.textContent = busStopId[i].no;               
      list.onclick = () => { 
                    const selectedBusStopId = busStopId[i].no;
                    displayData(selectedBusStopId);              
                   };   
      anchor.appendChild(list);
      newDropdownMenu.appendChild(anchor);
    }
busStop.appendChild(newDropdownMenu);
  })
  .catch(err => console.error(err));
}


function displayTimeInMinutes(timeStamp) {
  if (!timeStamp) {
    return 'N/A';
  }
  const arrivalTime = new Date(timeStamp);
  const currentTime = new Date();
  const diffInMinutes = Math.round((arrivalTime - currentTime) / 60000);
  return diffInMinutes > 0 ? `${diffInMinutes} mins` : 'Arriving';
}

function displayData(selectedBusStopId) {
  fetch(`https://arrivelah2.busrouter.sg/?id=83139`)
    .then(response => response.json())
    .then(data => {
      const services = data.services;
      const busData = document.createElement('table');
      busData.className = 'table table-warning border border-dark';
      const tHead = document.createElement('thead');
      const tRow = document.createElement('tr');
      const rowHead = document.createElement('th');
      const header = ["Bus Number", "Next", "Subsequent", "Next2", "Next3"];
      header.forEach(head => {
        const newHead = document.createElement('th'); // Create a new th element for each header
        newHead.textContent = head;
        tRow.appendChild(newHead); // Append the newHead to the tRow
      });
      tHead.appendChild(tRow);
      busData.appendChild(tHead);

      const selectedBus = services.find(bus => bus.no === selectedBusStopId);
      if (selectedBus) {
        const rowBody = document.createElement('tBody');
        const row = document.createElement('tr');
        const rowBusNo = document.createElement('th');
        rowBusNo.textContent = selectedBus.no; // Corrected assignment
        row.appendChild(rowBusNo); // append td to th

        function addCell(text) {
          const cell = document.createElement('td'); //cell
          cell.textContent = displayTimeInMinutes(text); //displays text in minutes
          row.appendChild(cell); //cell to the row
        }

        addCell(selectedBus.next?.time);
        addCell(selectedBus.subsequent?.time);
        addCell(selectedBus.next2?.time);
        addCell(selectedBus.next3?.time);

        rowBody.appendChild(row); //tr to tbody
        busData.appendChild(rowBody); 
      }
      output.innerHTML = ''; // Clear the output element at every selection
      output.appendChild(busData); // Append table to the output
    })
    .catch(err => console.error(err));
}

                                   