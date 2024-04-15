document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('mood-tracking-form');
    const moodInput = document.getElementById('mood-input');
    const moodList = document.getElementById('mood-list');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const mood = moodInput.value.trim();
        if (mood) {
            logMood(mood);
            moodInput.value = '';
        }
    });

    function logMood(mood) {
        const now = new Date();
        const entry = {
            mood: mood,
            time: now.toLocaleDateString() + ' ' + now.toLocaleTimeString(),
            date: now.toDateString()
        };
        saveMood(entry);
        displayMood(entry);
    }

    function saveMood(entry) {
        let moods = JSON.parse(localStorage.getItem('moods')) || [];
        moods.push(entry);
        localStorage.setItem('moods', JSON.stringify(moods));
    }

    function displayMood(entry) {
        const item = document.createElement('li');
        item.textContent = `${entry.time}: ${entry.mood}`;
        moodList.prepend(item);
    }

    function loadMoods() {
        let moods = JSON.parse(localStorage.getItem('moods')) || [];
        moods.forEach(mood => displayMood(mood));
    }

    window.resetMoods = function () {
        localStorage.removeItem('moods');
        while (moodList.firstChild) {
            moodList.removeChild(moodList.firstChild);
        }
    };

    loadMoods();
});