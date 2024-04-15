const recommendedCalories = 2000;

function addMealToDOM(meal, prepend = false) {
    const mealList = document.getElementById('meal-list');
    const item = document.createElement('li');
    item.textContent = `${meal.date}: ${meal.type} - ${meal.calories} kcal`;
    if (prepend) {
        mealList.prepend(item);
    } else {
        mealList.appendChild(item);
    }
}

function updateProgress(meals) {
    const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);
    const progressBar = document.getElementById('calories-progress-bar');
    const currentCaloriesElement = document.getElementById('current-calories');
    progressBar.max = recommendedCalories;
    progressBar.value = totalCalories;
    currentCaloriesElement.textContent = `${totalCalories} kcal out of ${recommendedCalories} kcal`;
}

window.resetCaloricIntake = function () {
    localStorage.removeItem('meals');
    const mealList = document.getElementById('meal-list');
    mealList.innerHTML = '';
    updateProgress([]);
};

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('meal-logging-form');
    let meals = JSON.parse(localStorage.getItem('meals')) || [];

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const mealTypeSelect = document.getElementById('meal-type');
        const caloriesInput = document.getElementById('calories');
        const mealType = mealTypeSelect.value;
        const calories = parseInt(caloriesInput.value, 10);

        if (!isNaN(calories) && calories > 0) {
            const meal = {
                type: mealType,
                calories: calories,
                date: new Date().toLocaleString()
            };
            meals.push(meal);
            localStorage.setItem('meals', JSON.stringify(meals));
            addMealToDOM(meal, true);
            updateProgress(meals);
            caloriesInput.value = '';
        } else {
            alert('Please enter a valid number of calories.');
        }
    });

    meals.slice().reverse().forEach(meal => addMealToDOM(meal));
    updateProgress(meals);
});