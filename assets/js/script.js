const navTabs = document.querySelectorAll("#nav-tabs > a");
navTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        navTabs.forEach((tab) => {
            tab.classList.remove("active");
        });
        tab.classList.add("active");
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    const navLinks = document.querySelectorAll('#nav-tabs a');

    // Set initial states and event listeners
    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = localStorage.getItem(checkbox.id) === 'true';
        checkbox.addEventListener('change', () => {
            localStorage.setItem(checkbox.id, checkbox.checked);
            checkCompletion();
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            if (link.classList.contains('locked')) {
                event.preventDefault(); // Prevent navigation if locked
            } else {
                showContent(link.getAttribute('href').substring(1)); // Manage content display
            }
        });
    });

    function showContent(contentId) {
        document.querySelectorAll('.level-content').forEach(content => {
            content.style.display = 'none';
        });
        document.getElementById(contentId).style.display = 'block';
    }

    function checkCompletion() {
        const level1Complete = Array.from(document.querySelectorAll('#level1-content .item-checkbox'))
            .every(checkbox => checkbox.checked);
        const level2Complete = Array.from(document.querySelectorAll('#level2-content .item-checkbox'))
            .every(checkbox => checkbox.checked); // Check if all checkboxes in Level 2 are checked

        const level2Link = document.getElementById('level2-link');
        const level3Link = document.getElementById('level3-link'); // Get the Level 3 link element

        if (level1Complete) {
            level2Link.classList.remove('locked', 'level-locked');
        } else {
            level2Link.classList.add('locked', 'level-locked');
        }

        // If all Level 2 items are complete, unlock Level 3
        if (level2Complete) {
            level3Link.classList.remove('locked', 'level-locked');
        } else {
            level3Link.classList.add('locked', 'level-locked');
        }
    }
    checkCompletion(); // Initial check on load
    showContent('level1-content'); // Initially show Level 1 content
});



