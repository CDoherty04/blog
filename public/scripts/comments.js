const loadCommentsButton = document.getElementById("comments-button")

async function fetchComments() {
    const postId = loadCommentsButton.dataset.postid
    const response = await fetch(`/posts/${postId}/comments`)
    const responseData = await response.json()

    createComments()
}

loadCommentsButton.addEventListener("click", fetchComments)