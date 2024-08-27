// HTML 요소 가져오기 및 변수 선언
const character = document.querySelector('.character'); // 캐릭터 요소
const buttonJump = document.getElementById('button-jump'); // 점프 버튼 요소
const buttonJump02 = document.getElementById('button-jump02'); // 슈퍼 점프 버튼 요소
const buttonLeft = document.getElementById('button-left'); // 왼쪽 이동 버튼 요소
const buttonRight = document.getElementById('button-right'); // 오른쪽 이동 버튼 요소
const item = document.querySelectorAll('.item'); // 모든 아이템 요소
const endMenuContainer = document.querySelector('.end-menu-container'); // 게임 '결과 메뉴' 화면 요소
const pointResult = document.querySelector('.end-menu-result-point-text'); // 점수가 표시될 클래스 요소
const buttonRestart = document.querySelector('.end-menu-restart-text'); // '한번더' 버튼 요소
const buttonEnd = document.querySelector('.end-menu-game-over-text'); // '게임종료' 버튼 요소
const buttonStart = document.querySelector('.start-menu-start-button-text'); // '게임시작' 버튼 요소
const startMenuContainer = document.querySelector('.start-menu-container'); // 게임 '시작 메뉴' 화면 요소
const container = document.querySelector('.container'); // 컨테이너 요소

// 이벤트 리스너 등록
buttonJump.addEventListener('click', moveJump);
buttonJump02.addEventListener('click', moveSuperJump);
buttonLeft.addEventListener('click', moveLeft);
buttonRight.addEventListener('click', moveRight);
buttonRestart.addEventListener('click', moveMinigame);
buttonEnd.addEventListener('click', moveHome);
buttonStart.addEventListener('click', gameStart);

// 기타 초기화 코드
let intervalStop; // 아이템을 사라지게 하는 함수의 반복을 종료하는 변수
let point = 0; // 아이템의 텍스트 값, 즉 점수를 저장할 변수를 선언하고 '0'으로 초기화

// 함수 등록 및 선언
function moveJump(event) {
    character.classList.add('class', 'jump-ani'); // 점프 트랜지션이 적용된 클래스를 추가
    character.style.transitionDuration = '0.5s'; // 트랜지션은 0.5초 동안 지속

    setTimeout(() => { // 0.5초 후에 특정 작업 실행
        character.classList.remove('class', 'jump-ani'); // 'jump-ani' 클래스 삭제
    }, 500); // 500 = 0.5초
}

function moveSuperJump(event) {
    character.classList.add('class', 'jump-ani02'); // 슈퍼 점프 트랜지션이 적용된 클래스를 추가
    character.style.transitionDuration = '0.65s'; // 트랜지션은 0.65초 동안 지속

    setTimeout(() => { // 0.65초 후에 특정 작업 실행
        character.classList.remove('class', 'jump-ani02'); // 'jump-ani02' 클래스 삭제
    }, 650); // 650 = 0.65초
}

function moveLeft(event) {
    let characterPosition = character.offsetLeft // 캐릭터의 현재 위치값을 저장하는 변수 선언
    let characterArea = container.offsetLeft // 컨테이너의 왼쪽 벽의 위치값을 저장하는 변수 선언 

    if (characterPosition - 59 > characterArea) { // 캐릭터는 컨테이너의 왼쪽 벽을 넘어갈 수 없음
    character.style.left = character.offsetLeft + (-59) + 'px'; // 캐릭터를 현재 위치로부터 '-59px'(왼쪽) 이동
    }
}

function moveRight(event) {
    let characterPosition = character.offsetLeft + character.offsetWidth // 캐릭터의 현재 위치값을 저장하는 변수 선언
    let characterArea = container.offsetLeft + container.offsetWidth // 컨테이너의 오른쪽 벽의 위치값을 저장하는 변수 선언 

    if (characterPosition + 59 < characterArea) { // 캐릭터는 컨테이너의 오른쪽 벽을 넘어갈 수 없음
    character.style.left = character.offsetLeft + (59) + 'px'; // 캐릭터를 현재 위치로부터 '59px'(오른쪽) 이동
    }
}

function moveItem() {
    for (let i = 0; i < item.length; i++) { // 아이템의 총 갯수만큼 반복
        item[i].classList.add('move-item'); // 각 아이템마다 움직이게 하는 클래스를 추가

        if (item[i].offsetLeft === 0) { // 각 아이템의 움직임이 끝나면
            item[i].style.display = 'none'; // 각 아이템을 사라지게 함
        }
    }
}

function itemVanish() {
    for (let i = 0; i < item.length; i++) { // 아이템의 총 갯수만큼 반복

    // 캐릭터와 아이템이 맞닿으면 
    if (parseInt(character.offsetLeft) < parseInt(item[i].offsetLeft) + parseInt(item[i].offsetWidth) // 캐릭터는 아이템을 지나치면 안됨
    && parseInt(item[i].offsetLeft) < parseInt(character.offsetLeft) + parseInt(character.offsetWidth) // 아이템의 왼쪽 부분이 캐릭터의 오른쪽 부분과 조금이라도 닿아야 함  
    && parseInt(character.offsetTop) < parseInt(item[i].offsetTop) + parseInt(item[i].offsetHeight) // 캐릭터의 머리 부분이 아이템의 밑부분과 조금이라도 닿아야 함 
    && parseInt(item[i].offsetTop) < parseInt(character.offsetTop) + parseInt(character.offsetHeight)) { // 아이템은 캐릭터보다 밑에 있으면 안됨
        item[i].style.display = 'none'; // 각 아이템을 사라지게 함
        let itemData = parseInt(item[i].textContent); // 각 아이템의 텍스트값을 하나씩 저장할 변수를 선언
        point += itemData; // 각 아이템의 텍스트값을 'point' 변수에 하나씩 합산함
        }
    }
}

function repeatItemVanish() {
    intervalStop = setInterval(itemVanish, 100); // 'itemVanish' 함수를 0.1초마다 반복
}

function showResultsWindow() {
    setTimeout(() => { // 5초 뒤에(게임이 종료되면) 작업 내용 실행
        endMenuContainer.style.top = '+35%'; // 게임 결과 화면 표시
        pointResult.textContent = parseInt(point); // 지정된 곳에 텍스트값은 'point' 변수임, 즉 합산된 점수를 결과창 점수 표기란에 표시
        clearInterval(intervalStop); // 아이템이 사라지는 함수를 반복하는 것을 종료시킴
    }, 5000); // 5000 = 5초
}

function moveMinigame(event) {
    location.href = 'test.html'; // 한번더 버튼을 누르면 미니게임 화면으로 현재탭에서 이동시킴
}

function moveHome(event) {
    location.href = '../home/home.html'; // 게임종료 버튼을 누르면 홈 화면으로 현재탭에서 이동시킴
}

function gameStart(event) {
    startMenuContainer.style.display = 'none'; // 게임 시작 메뉴 화면을 사라지게 함
    showResultsWindow(); // 게임 결과 화면을 표시하는 함수를 호출
    moveItem(); // 아이템을 이동시키는 함수를 호출
    repeatItemVanish(); // 아이템을 사라지게하는 함수를 호출
}