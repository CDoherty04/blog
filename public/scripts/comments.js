const loadCommentsButton = document.getElementById("comments-button")
const commentsSectionElement = document.getElementById("comments")

function createComments(comments) {
    const commentsListElement = document.createElement("ol")

    for (const comment of comments) {
        const commentElement = document.createElement("li")
        commentElement.innerHTML = `
            <article class="comment-item">
                <h2>${comment.title}</h2>
                <p>${comment.text}</p>
            </article>
        `
        commentsListElement.appendChild(commentElement)
    }

    return commentsListElement
}

async function fetchComments() {
    const postId = loadCommentsButton.dataset.postid
    const response = await fetch(`/posts/${postId}/comments`)
    const responseData = await response.json()

    commentsList = createComments(responseData)

    commentsSectionElement.innerHTML = ""
    commentsSectionElement.appendChild(commentsList)
}

loadCommentsButton.addEventListener("click", fetchComments)