const baseUrl = 'http://localhost:3000/ramens/'

// Global DOM Elements
const ramenMenu = document.querySelector("#ramen-menu")
ramenMenu.addEventListener('click', menuEventHandler)

const ramenForm = document.getElementById('new-ramen')

const ramenEdit = document.getElementById('edit-ramen')

// When the page loads, request the data from the server to get all the ramen objects
// Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.
function fetchAllRamens() {
    fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            displayDetail(data[0])
            data.forEach(ramen => {
                createRamenImg(ramen)
        })
    })
}

function fetchOneRamen(id) {
    fetch(baseUrl + id)
        .then(res => res.json())
        .then(oneRamen => {
            // console.log(oneRamen)
            displayDetail(oneRamen)
        })
}

function createRamenImg(ramen) {
    const imgDiv = document.createElement('div')
    imgDiv.id = 'img-' + ramen.id

    const imgTag = document.createElement('img')
    imgTag.src = ramen.image
    imgTag.alt = ramen.name
    imgTag.id = ramen.id

    imgTag.addEventListener('click', e => displayDetail(ramen))

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'X'
    deleteBtn.addEventListener('click', e => {
        const nextId = Number(e.target.parentElement.id.split("-")[1]) + 1; //
        e.target.parentElement.remove()
        fetchOneRamen(nextId)
    })

    imgDiv.append(deleteBtn, imgTag)
    ramenMenu.append(imgDiv)
}

function displayDetail(oneRamen) {
    const detailImg = document.querySelector('.detail-image')
    detailImg.src = oneRamen.image
    detailImg.alt = oneRamen.name

    document.querySelector('.name').textContent = oneRamen.name
    document.querySelector('.restaurant').textContent = oneRamen.restaurant
    document.querySelector('#rating-display').textContent = oneRamen.rating
    document.querySelector('#comment-display').textContent = oneRamen.comment  
}
// Click on an image from the #ramen-menu div and see all the info about that ramen displayed inside the #ramen-detail div and where it says insert comment here and insert rating here.
function menuEventHandler(e) {
    // console.log(e)
    if (e.target.id !== 'ramen-menu') {
        fetchOneRamen(e.target.id)
    }
}

function handleNewRamen(e) {
    e.preventDefault()
    const ramenObj = {
        name: ramenForm[0].value,
        restaurant: ramenForm[1].value,
        image: ramenForm[2].value,
        rating: ramenForm[3].value,
        comment: ramenForm[4].value,
    }
    createRamenImg(ramenObj)
    ramenForm.reset()
}

function imgEventHandler(ramen) {
    displayDetail(ramen)
}

function handleEditRamen(e) {
    e.preventDefault()
    document.querySelector("#rating-display").textContent = ramenEdit[0].value
    document.querySelector("#comment-display").textContent = ramenEdit.querySelector("#edit-comment").value
    ramenEdit.reset()
}

function init() {
    // This is where we put the page load functions
    fetchAllRamens();
    ramenEdit.addEventListener('submit', handleEditRamen)
    ramenForm.addEventListener('submit', handleNewRamen)

}

init();