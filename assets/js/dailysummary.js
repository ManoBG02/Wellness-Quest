document.addEventListener('DOMContentLoaded', function () {
    const todayDate = new Date().toDateString();

    // Water intake
    const waterIntakeElement = document.getElementById('water-intake');
    const lastUpdateDate = localStorage.getItem('lastUpdateDate');
    const waterIntakes = JSON.parse(localStorage.getItem('waterIntakes')) || [];
    const totalIntake = waterIntakes.reduce((acc, intake) => acc + intake, 0);


    waterIntakeElement.innerHTML = '';

    if (lastUpdateDate === todayDate) {
        if (totalIntake > 0) {
            waterIntakeElement.textContent = `${totalIntake.toFixed(1)} liters`;
        } else {

            const noIntakeMessage = document.createElement('ul');
            const noIntakeItem = document.createElement('li');
            noIntakeItem.textContent = "No water intake recorded today.";
            noIntakeMessage.appendChild(noIntakeItem);
            waterIntakeElement.appendChild(noIntakeMessage);
        }
    } else {
        waterIntakeElement.textContent = "No water intake recorded for today.";
    }

    // Nutrition
    function displayLoggedMeals() {
        const mealList = document.getElementById('nutrition-summary');
        const meals = JSON.parse(localStorage.getItem('meals')) || [];

        if (meals.length > 0) {
            mealList.innerHTML = '';
            meals.forEach(meal => {
                const item = document.createElement('li');
                item.textContent = `${meal.date}: ${meal.type} - ${meal.calories} kcal`;
                mealList.appendChild(item);
            });
        } else {
            mealList.innerHTML = '<li>No meals recorded for today.</li>';
        }
    }

    displayLoggedMeals();

    // Activity log
    function displayLoggedActivities() {
        const activityListElement = document.getElementById('activity-summary');
        const activities = JSON.parse(localStorage.getItem('activities')) || [];

        activityListElement.innerHTML = '';


        if (activities.length > 0) {
            const list = document.createElement('ul');
            activities.forEach(activity => {
                const item = document.createElement('li');
                item.textContent = `${activity.datetime}: ${activity.activity} - ${activity.duration} minutes`;
                list.appendChild(item);
            });
            activityListElement.appendChild(list);
        } else {
            activityListElement.innerHTML = '<ul><li>No activities recorded for today.</li></ul>';
        }
    }

    displayLoggedActivities();


    // Mental Wellness
    const mentalWellnessElement = document.getElementById('mental-wellness');
    const moods = JSON.parse(localStorage.getItem('moods')) || [];
    const todayMoods = moods.filter(mood => mood.date === todayDate);

    mentalWellnessElement.innerHTML = '';

    if (todayMoods.length > 0) {
        const moodList = document.createElement('ul');
        todayMoods.forEach(mood => {
            const moodEntry = document.createElement('li');
            moodEntry.textContent = `${mood.time}: ${mood.mood}`;
            moodList.appendChild(moodEntry);
        });
        mentalWellnessElement.appendChild(moodList);
    } else {

        const noActivitiesMessage = document.createElement('ul');
        const noActivitiesItem = document.createElement('li');
        noActivitiesItem.textContent = "No mental wellness activities recorded for today.";
        noActivitiesMessage.appendChild(noActivitiesItem);
        mentalWellnessElement.appendChild(noActivitiesMessage);
    }
});