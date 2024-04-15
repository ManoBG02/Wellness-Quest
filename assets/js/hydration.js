const dailyGoal = 3; // This represents the daily hydration goal in liters

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('water-intake-form');
    const intakeList = document.getElementById('intake-list');
    let waterIntakes = JSON.parse(localStorage.getItem('waterIntakes')) || [];

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const intakeInput = document.getElementById('water-intake');
        const intakeValue = parseFloat(intakeInput.value);

        if (!isNaN(intakeValue) && intakeValue > 0) {
            waterIntakes.push(intakeValue);
            localStorage.setItem('waterIntakes', JSON.stringify(waterIntakes));
            addIntakeToList(intakeValue);
            updateProgress();
            intakeInput.value = ''; // Clear the input after logging
        } else {
            alert('Please enter a valid amount of water intake.');
        }
    });

    function addIntakeToList(intake) {
        const item = document.createElement('li');
        item.textContent = `${intake} liters`;
        intakeList.appendChild(item);
    }

    function updateProgress() {
        const totalIntake = waterIntakes.reduce((acc, intake) => acc + intake, 0);
        const currentIntakeElement = document.getElementById('current-intake');
        const progressBar = document.getElementById('water-progress-bar');

        currentIntakeElement.textContent = totalIntake.toFixed(1);
        progressBar.value = totalIntake;

        if (totalIntake >= dailyGoal) {
            alert("Great! You've reached your daily hydration goal.");
        }
    }

    // Reset functionality
    window.resetIntake = function () {
        waterIntakes = [];
        localStorage.removeItem('waterIntakes');
        while (intakeList.firstChild) {
            intakeList.removeChild(intakeList.firstChild);
        }
        updateProgress(); // Reset progress after clearing data
    };

    // Load previously logged water intakes
    waterIntakes.forEach(addIntakeToList);
    updateProgress();
    function updateProgress() {
        const totalIntake = waterIntakes.reduce((acc, intake) => acc + intake, 0);
        const progressBar = document.getElementById('water-progress-bar');
        const currentDate = new Date().toDateString();

        progressBar.value = totalIntake;
        document.getElementById('current-intake').textContent = totalIntake.toFixed(1);
        document.getElementById('recommended-intake').textContent = '3'; // Adjust if your recommended intake changes

        // Store the last update date
        localStorage.setItem('lastUpdateDate', currentDate);

        if (totalIntake >= dailyGoal) {
           
        }
    }

});