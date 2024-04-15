function likePost(button) {
    var count = button.nextElementSibling;
    var likes = parseInt(count.textContent);
    count.textContent = likes + 1;
}

function createNewPost() {
    var postContent = document.getElementById('new-post-content').value.trim();
    if (postContent) {
        var postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>User Challenge</h3>
            <p>${postContent}</p>
            <button onclick="likePost(this)">Like</button> <span class="like-count">0</span> Likes
            <hr>
            <div class="comment-form">
                <input type="text" placeholder="Add a comment...">
                <button onclick="submitComment(this)">Comment</button>
            </div>
            <div class="comments">
                <h4>Comments:</h4>
                <p class="no-comments">No comments yet.</p>
            </div>
        `;
        document.querySelector('.card__content').appendChild(postElement);
        document.getElementById('new-post-content').value = '';
    }
}

function submitComment(button) {
    var commentBox = button.previousElementSibling;
    var commentText = commentBox.value.trim();
    var commentsSection = button.closest('.post').querySelector('.comments');

    if (commentText) {
        var currentDateTime = new Date().toLocaleString();
        var newCommentDiv = document.createElement('div');
        newCommentDiv.className = 'comment';
        newCommentDiv.innerHTML = `
            <p><span class="comment-date">${currentDateTime}</span>: ${commentText}</p>
            <button onclick="editComment(this.parentNode)">Edit</button>
            <button onclick="deleteComment(this.parentNode)">Delete</button>
        `;

        var noCommentsPlaceholder = commentsSection.querySelector('.no-comments');
        if (noCommentsPlaceholder) {
            noCommentsPlaceholder.remove();
        }

        commentsSection.appendChild(newCommentDiv);
        commentBox.value = '';
    }
}

function editComment(commentDiv) {
    var p = commentDiv.querySelector('p');
    var commentText = p.textContent.split(': ').slice(1).join(': ').trim();
    var input = document.createElement('input');
    input.type = 'text';
    input.value = commentText;
    var saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.onclick = function () {
        p.textContent = `${new Date().toLocaleString()}: ${input.value}`;
        commentDiv.replaceChild(p, input);
        commentDiv.replaceChild(editButton, saveButton);
    };
    var editButton = commentDiv.querySelector('button');
    commentDiv.replaceChild(saveButton, editButton);
    commentDiv.insertBefore(input, p);
}

function deleteComment(commentDiv) {
    var commentsSection = commentDiv.closest('.comments');
    commentsSection.removeChild(commentDiv);
    if (!commentsSection.querySelector('.comment')) {
        commentsSection.innerHTML = '<p class="no-comments">No comments yet.</p>';
    }
}

// Call this function to initialize the comment sections when the page loads
function initializeCommentSections() {
    var allPosts = document.querySelectorAll('.post');
    allPosts.forEach(function (postElement) {
        var commentsSection = postElement.querySelector('.comments');
        if (commentsSection) {
            // Assuming that the .no-comments element is there by default,
            // remove it if there are any comments in local storage for this post.
            // This would be part of the logic you'd need to implement.
            // For now, we'll just show the "No comments yet" message.
            commentsSection.innerHTML = '<p class="no-comments">No comments yet.</p>';
        }
    });
}

// Call initializeCommentSections when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeCommentSections);







