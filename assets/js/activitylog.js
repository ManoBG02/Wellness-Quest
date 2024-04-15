function addActivityToDOM(activity, duration, datetime, prepend = false) {
    const activityList = document.getElementById('activity-list');
    const item = document.createElement('li');
    item.textContent = `${datetime}: ${activity} - ${duration} minutes`;
    if (prepend) {
        activityList.prepend(item);
    } else {
        activityList.appendChild(item);
    }
}

window.resetActivityLog = function () {
    localStorage.removeItem('activities');
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';
};

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('activity-logging-form');
    let activities = JSON.parse(localStorage.getItem('activities')) || [];

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const activityInput = document.getElementById('activity');
        const durationInput = document.getElementById('duration');
        const activity = activityInput.value.trim();
        const duration = parseInt(durationInput.value, 10);
        const datetime = new Date().toLocaleString();

        if (activity !== '' && !isNaN(duration) && duration > 0) {
            const loggedActivity = {
                activity: activity,
                duration: duration,
                datetime: datetime
            };
            activities.push(loggedActivity);
            localStorage.setItem('activities', JSON.stringify(activities));
            addActivityToDOM(loggedActivity.activity, loggedActivity.duration, loggedActivity.datetime, true);
            activityInput.value = '';
            durationInput.value = '';
        } else {
            alert('Please enter a valid activity and duration.');
        }
    });

    activities.slice().reverse().forEach(activity => addActivityToDOM(activity.activity, activity.duration, activity.datetime));
});