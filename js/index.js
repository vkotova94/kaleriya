//Scroll down
let scrollButton = document.querySelector('.scroll-down')
let headerHeight = document.querySelector('.header').scrollHeight

scrollButton.addEventListener('click', function() {
    window.scrollTo({
        top: headerHeight - 85,
        left: 0,
        behavior: 'smooth'
    })
})

//Zoom image
let images = document.querySelectorAll('.latest img')
let modal = document.querySelector('.modal-image')
let backdrop = document.querySelector('.backdrop')

images.forEach(function(image) {
    image.addEventListener('click', function() {
        zoomImage(image.src)
    })
})

function zoomImage(target) {
    let image = document.getElementById('targetImage')
    image.src = target
    modal.style.display = 'block'
    backdrop.style.display = 'block'
}

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

//ScrollUp
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0
}
