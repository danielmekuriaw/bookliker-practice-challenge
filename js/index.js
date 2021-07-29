document.addEventListener("DOMContentLoaded", function() {});

fetch("http://localhost:3000/books")
.then(r => r.json())
.then(books => {
    books.forEach((book) => renderBook(book))
})
const list = document.querySelector("#list")

function renderBook(book){
    const li = document.createElement("li")
    const img = document.createElement("img")
    const p = document.createElement("p")
    const p2 = document.createElement("p")
    const likes = document.createElement("p")
    const usersList = document.createElement("ul")
    const likeBtn = document.createElement("button")

    li.textContent = book.title
    img.src = book.img_url
    img.alt = book.title
    p.textContent = book.description
    p2.textContent = "Liked by: "
    likeBtn.textContent = "Like"
    likes.textContent = `${book.users.length} Likes`

    book.users.forEach((user)=> {
            const userLi = document.createElement("li")
            userLi.textContent = user.username
            usersList.append(userLi)
        }
    )

    likeBtn.addEventListener('click', ()=> {
        let update;
        if (book.users.includes({"id":1, "username":"pouros"})){
            update = book.users
        } else {
            update = [...book.users, {"id":1, "username":"pouros"}]
            likes.textContent = `${parseInt(likes.textContent) + 1} Likes`
            const likedByLi = document.createElement("li")
            likedByLi.textContent = "pouros"
            usersList.append(likedByLi)
        }
        fetch(`http://localhost:3000/books/${book.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "users": update
            })
        })
    })

    li.addEventListener('click', () => {
        li.append(img)
        li.append(p)
        li.append(likeBtn)
        li.append(likes)
        li.append(p2)
        li.append(usersList)
    })

    list.append(li)
}