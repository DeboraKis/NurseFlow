// JavaScript to handle progress logging and sign off

// Function to render the progress table with days and checkboxes
window.onload = function() {
    const progress = JSON.parse(localStorage.getItem('traineeProgress')) || {};

    const tableBody = document.querySelector('#progress-table tbody');

    // Define the total number of training days
    const totalDays = 20;
    
    for (let i = 1; i <= totalDays; i++) {
        const row = document.createElement('tr');
        
        // Create Day Column
        const dayCell = document.createElement('td');
        dayCell.textContent = `Day ${i}`;
        row.appendChild(dayCell);
        
        // Create Completed Checkbox Column
        const completedCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `day${i}`;
        checkbox.classList.add('day-progress');
        
        // Set checkbox status based on progress from localStorage
        if (progress[`day${i}`]) {
            checkbox.checked = true;
        }

        checkbox.addEventListener('change', function() {
            saveProgress(i);
        });
        
        completedCell.appendChild(checkbox);
        row.appendChild(completedCell);
        
        // Create Sign Off Button Column
        const signOffCell = document.createElement('td');
        const signOffButton = document.createElement('button');
        signOffButton.textContent = 'Sign Off';
        signOffButton.classList.add('sign-off');
        
        signOffButton.addEventListener('click', function() {
            signOff(i);
        });

        signOffCell.appendChild(signOffButton);
        row.appendChild(signOffCell);
        
        tableBody.appendChild(row);
    }
};

// Function to save progress in localStorage
function saveProgress(day) {
    const checkbox = document.getElementById(`day${day}`);
    let progress = JSON.parse(localStorage.getItem('traineeProgress')) || {};

    progress[`day${day}`] = checkbox.checked;
    localStorage.setItem('traineeProgress', JSON.stringify(progress));

    console.log(progress);  // You can remove this after testing
}

// Function to sign off on the progress (for senior staff)
function signOff(day) {
    const progress = JSON.parse(localStorage.getItem('traineeProgress')) || {};

    if (progress[`day${day}`]) {
        alert(`Day ${day} completed and signed off!`);
    } else {
        alert(`Please mark Day ${day} as completed before signing off.`);
    }
}
