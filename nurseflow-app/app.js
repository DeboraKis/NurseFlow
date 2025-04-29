// grab form & list container
const form = document.getElementById('trainee-form');
const listEl = document.getElementById('trainee-list');

// load or init trainees array
let trainees = JSON.parse(localStorage.getItem('trainees')) || [];

// render all trainees
function renderTrainees() {
  listEl.innerHTML = '';
  trainees.forEach((t, idx) => {
    const div = document.createElement('div');
    div.className = 'card trainee';
    div.innerHTML = `
      <p><strong>${t.name}</strong> (Started: ${t.startDate})</p>
      <div class="progress-bar">
        <div class="progress" style="width: ${t.progress}%;"></div>
      </div>
      <p>Progress: ${t.progress}%</p>
      <button data-idx="${idx}" class="update-btn">+10% Progress</button>
    `;
    listEl.append(div);
  });

  // attach update handlers
  document.querySelectorAll('.update-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.idx);
      updateProgress(i);
    });
  });
}

// save trainees array
function save() {
  localStorage.setItem('trainees', JSON.stringify(trainees));
}

// add new trainee
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('trainee-name').value.trim();
  const startDate = document.getElementById('start-date').value;
  trainees.push({ name, startDate, progress: 0 });
  save();
  renderTrainees();
  form.reset();
});

// increment progress for one trainee
function updateProgress(index) {
  trainees[index].progress = Math.min(100, trainees[index].progress + 10);
  save();
  renderTrainees();
}

// initial render on page load
document.addEventListener('DOMContentLoaded', renderTrainees);
