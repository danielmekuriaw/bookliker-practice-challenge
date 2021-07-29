document.addEventListener("DOMContentLoaded", function() {});
const list = document.querySelector("#list")
let showPanel = document.querySelector("#show-panel")

function renderAllBooks(){
    resetList()
    fetch("http://localhost:3000/books")
    .then(r => r.json())
    .then(books => {
        books.forEach((book) => renderBook(book))
    })
}

renderAllBooks()



function renderBook(book){
    
    const li = document.createElement("li")
    const img = document.createElement("img")
    const p = document.createElement("p")
    const p2 = document.createElement("p")
    const likes = document.createElement("p")
    const usersList = document.createElement("ul")
    const likeBtn = document.createElement("button")
    const temp = document.createElement("ul")

    const likedByLi = document.createElement("li")

    li.textContent = book.title
    img.src = book.img_url
    img.alt = book.title
    p.textContent = book.description
    p2.textContent = "Liked by: "
    likes.textContent = `${book.users.length} Likes`

    book.users.forEach((user)=> {
            const userLi = document.createElement("li")
            userLi.textContent = user.username
            usersList.append(userLi)
        }
    )

    if (book.users.find((user)=>{
        return user.id === 1
    }) === undefined ){
        likeBtn.textContent = "Like"
    } else {
        likeBtn.textContent = "Unlike"
    }

    likeBtn.addEventListener('click', ()=> {
        let update;
        console.log(book.users.find((user)=>{
            return user.id === 1
        }))
        console.log(book.users.find((user)=>{
            return user.id === 1
        }) === undefined)

        if (book.users.find((user)=>{
            return user.id === 1
        }) === undefined ){
            update = [...book.users, {"id":1, "username":"pouros"}]
            likes.textContent = `${parseInt(likes.textContent) + 1} Likes`
            likedByLi.textContent = "pouros"
            likeBtn.textContent = "Unlike"
            usersList.append(likedByLi)

        } else {
            console.log("Happening")
            update = book.users.filter((user)=> {
                return user.id != 1
            })
            likeBtn.textContent = "Like"
            likedByLi.remove()
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
        }).then(_ => {
            afterUpdate(book)
        })
    })

    li.addEventListener('click', () => {
        resetShowPanel()
        temp.append(img)
        temp.append(p)
        temp.append(likeBtn)
        temp.append(likes)
        temp.append(p2)
        temp.append(usersList)
        showPanel.append(temp)
    })

    list.append(li)
    
}

function resetShowPanel(){
    showPanel.innerHTML = ""
}

function resetList(){
    list.innerHTML = ""
}

function afterUpdate(book){
    const li = document.createElement("li")
    const img = document.createElement("img")
    const p = document.createElement("p")
    const p2 = document.createElement("p")
    const likes = document.createElement("p")
    const usersList = document.createElement("ul")
    const likeBtn = document.createElement("button")
    const temp = document.createElement("ul")

    const likedByLi = document.createElement("li")

    li.textContent = book.title
    img.src = book.img_url
    img.alt = book.title
    p.textContent = book.description
    p2.textContent = "Liked by: "
    likes.textContent = `${book.users.length} Likes`

    li.addEventListener('click', () => {
        resetShowPanel()
        temp.append(img)
        temp.append(p)
        temp.append(likeBtn)
        temp.append(likes)
        temp.append(p2)
        temp.append(usersList)
        showPanel.append(temp)
    })
}