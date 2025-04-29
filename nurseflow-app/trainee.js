// Grab references
const form = document.getElementById('log-progress-form');
const tableBody = document.querySelector('#progress-table tbody');

// Load existing logs or start fresh
let logs = JSON.parse(localStorage.getItem('traineeLogs')) || [];

// Render all saved logs into the table
function renderTable() {
  tableBody.innerHTML = '';
  logs.forEach(log => addRow(log));
}

// Add a single row to the table
function addRow({ name, date, progress }) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${name}</td>
    <td>${date}</td>
    <td>${progress}%</td>
  `;
  tableBody.appendChild(tr);
}

// Handle form submission
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('trainee-name').value.trim();
  const date = document.getElementById('day-completed').value;
  const progress = parseInt(document.getElementById('progress-percent').value, 10);

  // Create new log entry
  const entry = { name, date, progress };
  logs.push(entry);

  // Save and re-render
  localStorage.setItem('traineeLogs', JSON.stringify(logs));
  addRow(entry);

  // Reset form
  form.reset();
});

// Initial render on page load
document.addEventListener('DOMContentLoaded', renderTable);
