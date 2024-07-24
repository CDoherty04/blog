const loadCommentsButton = document.getElementById("comments-button")
const commentsSectionElement = document.getElementById("comments")
const commentsFormElement = document.querySelector("#comments-form form")
const commentTitleElement = document.getElementById("title")
const commentTextElement = document.getElementById("text")

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
    try {
        const response = await fetch(`/posts/${postId}/comments`)
        if (!response.ok) {
            alert("Fetching comments failed!")
            return
        }
        const responseData = await response.json()

        if (responseData && responseData.length > 0) {
            commentsList = createComments(responseData)

            commentsSectionElement.innerHTML = ""
            commentsSectionElement.appendChild(commentsList)
        } else {
            commentsSectionElement.firstElementChild.textContent =
                "There are currently no comments - write the first!"
        }
    } catch (error) {
        alert("Fetching comments failed")
    }
}

async function postComment(event) {
    event.preventDefault()

    const postId = loadCommentsButton.dataset.postid
    const enteredTitle = commentTitleElement.value
    const enteredText = commentTextElement.value

    const comment = { title: enteredTitle, text: enteredText }

    try {
        const response = await fetch(`/posts/${postId}/comments`, {
            method: "POST",
            body: JSON.stringify(comment),
            headers:
            {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            fetchComments()
        } else {
            alert("Could not send comment")
        }
    } catch (error) {
        alert("Not working - try again later")
    }
}

loadCommentsButton.addEventListener("click", fetchComments)
commentsFormElement.addEventListener("submit", postComment)
