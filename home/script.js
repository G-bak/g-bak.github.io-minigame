const sectionDescButton = document.querySelector('.section-desc-button');
const aside = document.querySelector('aside');
const asideOutButton = document.querySelector('.aside-out-button');
const sectionStartButton = document.querySelector('.section-start-button');
const sectionWarmingUpButton = document.querySelector('.section-warming-up-button');

sectionWarmingUpButton.addEventListener('click', function(){
    location.href = '../extraGame/game.html';
});

sectionDescButton.addEventListener('click', function() {
    aside.classList.add('show');
});

asideOutButton.addEventListener('click', function() {
    aside.classList.remove('show');
});

sectionStartButton.addEventListener('click', moveMiniGame);

function moveMiniGame (event) {
    location.href = '../password/password.html';
}
