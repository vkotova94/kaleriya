let scrollButton = document.querySelector('.scroll-down')
let headerHeight = document.querySelector('.header').scrollHeight

scrollButton.addEventListener('click', function() {
    window.scrollTo({
        top: headerHeight - 85,
        left: 0,
        behavior: 'smooth'
    })
})

let images = document.querySelectorAll('.latest img')
let modal = document.querySelector('.modal-image')
let backdrop = document.querySelector('.backdrop')
let modals = document.querySelectorAll('.modal-image, .backdrop')

images.forEach(function(image) {
    image.addEventListener('click', function() {
        zoomImage(image.src)
    })
})

modal.addEventListener('click', function () {
    hideModal()
})

backdrop.addEventListener('click', function () {
    hideModal()
})

function hideModal() {
    modal.style.display = 'none'
    backdrop.style.display = 'none'
}

function zoomImage(target) {
    let image = document.getElementById('targetImage')
    image.src = target
    modal.style.display = 'block'
    backdrop.style.display = 'block'
}
