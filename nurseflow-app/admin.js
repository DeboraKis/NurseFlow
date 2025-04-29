// admin.js

const tableBody = document.querySelector('#admin-table tbody');

// Load logs (each entry may now have a signedOff property)
let logs = JSON.parse(localStorage.getItem('traineeLogs')) || [];

// Save helper
function saveLogs() {
  localStorage.setItem('traineeLogs', JSON.stringify(logs));
}

// Render all log entries into the table
function renderLogs() {
  tableBody.innerHTML = '';

  if (logs.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="4">No trainee progress logged yet.</td></tr>';
    return;
  }

  logs.forEach((log, idx) => {
    // Ensure signedOff defaults to false
    if (typeof log.signedOff === 'undefined') log.signedOff = false;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${log.name}</td>
      <td>${log.date}</td>
      <td>Day ${log.dayNumber}</td>
      <td>
        ${
          log.signedOff
            ? '<span class="signed">✓ Signed</span>'
            : `<button class="signoff-btn" data-index="${idx}">Sign Off</button>`
        }
      </td>
    `;
    tableBody.appendChild(tr);
  });

  // Attach click handlers for newly created buttons
  document.querySelectorAll('.signoff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.index, 10);
      logs[i].signedOff = true;
      saveLogs();
      renderLogs();
    });
  });
}

// Initial render on load
document.addEventListener('DOMContentLoaded', renderLogs);
