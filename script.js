const busId = document.getElementById('select1');

function selectId(item) {
  busId.innerHTML = item;
  busId.classList.add('btn-light');
}