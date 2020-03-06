

let treesUrl = "http://localhost:3000/trees"
let votingUrl = "http://localhost:3000/votes"

let likeImg = 'images/red-heart.png'
let notLikeImg = 'images/gray-heart.png'

let treeList = document.querySelector("#tree-list")

fetch(treesUrl)
    .then( resp => resp.json())
    .then( trees => {
        treeJson = trees 
        buildTrees(treeJson)
        registerVoteIconListeners()
        registerVoteButton()
    })

function buildTrees(treeJson) {    
    treeJson.forEach(tree => {
        // Build elements for each tree
        let treeContainer = document.createElement('div')
        treeContainer.classList.add('tree-container')

        let headerEl = document.createElement('h2')
        headerEl.innerHTML = tree.name 

        let imageEl = document.createElement('img')
        imageEl.src = tree.image.url
        imageEl.classList.add('tree-image')
    
        let creditEl = document.createElement('p')
        creditEl.classList.add('credit')
        creditEl.innerHTML = `Image Credit: ${tree.image.credit}`

        let descriptionEl = document.createElement('p')
        descriptionEl.classList.add('description')
        descriptionEl.innerHTML = tree.description 

        let voteIcon = document.createElement('img')
        voteIcon.src = notLikeImg
        voteIcon.classList.add('vote-icon')
        voteIcon.setAttribute('data-tree-id', tree.id) // example 'tree-1' or 'tree-2'
 
        // Add the elements to the container 
        treeContainer.appendChild(headerEl)
        treeContainer.appendChild(imageEl)
        treeContainer.appendChild(creditEl)
        treeContainer.appendChild(descriptionEl)
        treeContainer.appendChild(voteIcon)

        let treeList = document.querySelector("#tree-list")

        console.log(treeList)
        treeList.appendChild(treeContainer)
    })
}


function registerVoteIconListeners() {
    let icons = document.querySelectorAll('.vote-icon')
    icons.forEach( function(icon) {
        icon.addEventListener('click', function() {
            // Set not like image for all of the icons
            icons.forEach( function(icon) {
                icon.src = notLikeImg
                icon.setAttribute('data-vote', 'no')
            })  
            // Set this icon to like 
            this.src = likeImg;  
            icon.setAttribute('data-vote', 'yes')
        })
    })
}

function registerVoteButton() {
    let voteButton = document.querySelector('#vote-button')
    voteButton.addEventListener('click', function(){
        let treeId = getVote()   // if a vote placed, will be the id of the tree
        if (treeId) {
            submitVote(treeId)
        }
        else {
            alert('Vote for a tree by clicking the heart icon')
        } 
    })
}


function getVote() {
    let icons = Array.from(document.querySelectorAll('.vote-icon'))
    let iconVoted = icons.find( function(icon) {
        return icon.getAttribute('data-vote') === 'yes'
    })

    if (iconVoted) {
        return iconVoted.getAttribute('data-tree-id') 
    }

    // will return undefined if there is no return statement. 
}

function clearVotes() {
    document.querySelectorAll('.vote-icon').forEach(function(icon) {
        icon.src = notLikeImg
    })
    
}
function submitVote(treeId) {
    let voteTime = new Date()
    let voteData = { treeId, voteTime }   // cool shortcut if your variable name are the same as your object attribute names 
    
    fetch(votingUrl, { 
        method: 'POST',  
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(voteData) 
        })
        .then(resp => {
            alert('Thank you for your vote! It has been saved')
            clearVotes()
        })  // only for troubleshooting, no data the app needs is returned
        .catch(err => console.log(err))
}
