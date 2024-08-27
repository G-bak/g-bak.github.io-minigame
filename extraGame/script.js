// HTML 요소 가져오기 및 변수 선언
const characterContainer = document.querySelector('.character-container'); // 캐릭터 컨테이너 요소
const character = document.querySelector('.character'); // 캐릭터 요소
const missile = document.querySelector('.missile'); // 미사일 요소
const fireButton = document.querySelector('.fire-button'); // 발사 버튼 요소
const item = document.querySelectorAll('.item'); // 아이템 요소
const enemy = document.querySelector('.enemy'); // 적 요소
const buttonStart = document.querySelector('.start-menu-start-button-text'); // '게임시작' 버튼 요소
const menuContainer = document.querySelector('.start-menu-container'); // 메튜 버튼 요소
const buttonReturn = document.querySelector('.start-menu-back-button-text'); // '돌아가기' 버튼 요소
const gameResult = document.querySelector('.end-menu-container'); // '게임 결과창' 요소
const buttonGameRestart = document.querySelector('.end-menu-restart-text'); // '한판더' 버튼 요소
const buttonEnd = document.querySelector('.end-menu-game-over-text'); // '게임종료' 버튼 요소
const pointResult = document.querySelector('.end-menu-result-point-text'); // 점수 결과 요소

// 이벤트 리스너 등록
document.addEventListener('keydown', moveCharacter);
fireButton.addEventListener('click', moveMissile);
buttonReturn.addEventListener('click', moveHome);
buttonGameRestart.addEventListener('click', gameRestart);
buttonEnd.addEventListener('click', moveHome);
buttonStart.addEventListener('click', moveItem);
buttonStart.addEventListener('click', menuVanish);
buttonStart.addEventListener('click', repeatCharacterVanish);
buttonStart.addEventListener('click', repeatItemVanish);

// 기타 초기화 코드
let intervalStop;
let intervalEnd;

// 함수 등록
function moveCharacter (event) { // 캐릭터 이동시키는 함수
    if (event.keyCode === 37) { // 왼쪽 방향키 키코드: 37
        characterContainer.style.left = characterContainer.offsetLeft -10 + 'px'; // 캐릭터를 현재 위치로부터 '-10px' 이동
    } else if (event.keyCode === 39) { // 오른쪽 방향키 키코드: 39
        characterContainer.style.left = characterContainer.offsetLeft + 10 + 'px'; // 캐릭터를 현재 위치로부터 '+10px' 이동
    }
}

function moveMissile (event) { // 미사일 이동시키는 함수
    missile.classList.add('move-missile'); // 미사일 이동 트랜지션 효과가 적용된 클래스 추가
    fireButton.disabled = true; // 발사 버튼 비활성화

    setTimeout (()=> { // 0.5초 뒤에 
        missile.classList.remove('move-missile'); // 미사일 이동 트랜지션 효과가 적용된 클래스 제거
        fireButton.disabled = false; // 발사 버튼 활성화
    }, 500); // 500 = 0.5초
}

function moveItem() { // 보스 미사일 이동시키는 함수
    for (let i = 0; i < item.length; i++) {
        if (enemy.style.top = '0px') { // 보스 캐릭터가 등장하면 
            item[i].classList.add('move-item'); // 보스의 미사일 이동 트랜지션 효과가 적용된 클래스 추가
            item[i].style.opacity = '100%' // 보스의 미사일 불투명도를 초기값(0%) -> 100%
        }
    }
}

function characterVanish () { // 캐릭터 사라지게 하는 함수
    for (let i = 0; i < item.length; i++) {
        if (characterContainer.offsetTop < item[i].offsetTop + item[i].offsetHeight && // 보스 미사일의 밑부분이 캐릭터의 윗부분을 지나야 함
            item[i].offsetTop < characterContainer.offsetTop + characterContainer.offsetHeight && // 보스 미사일의 윗부분이 캐릭터의 밑부분을 지나면 안됨
            characterContainer.offsetLeft < item[i].offsetLeft + item[i].offsetWidth && // 보스 미사일의 오른쪽 벽이 캐릭터의 왼쪽 벽을 지나면 안됨
            item[i].offsetLeft < characterContainer.offsetLeft + characterContainer.offsetWidth) { // 보스 미사일의 왼쪽 벽이 캐릭터의 오른쪽 벽을 지나야 함
            character.textContent = parseInt(character.textContent) + parseInt(item[i].textContent); // 캐릭터의 체력(텍스트값)은 캐릭터의 텍스트값 + 보스 미사일의 텍스트 값
            item[i].style.display = 'none'; // 조건에 부합하면 보스 미사일은 사라짐

            if(character.textContent <= 0) { // 캐릭터의 체력(텍스트값)이 '0'보다 작거나 같으면 
                characterContainer.style.display = 'none'; // 조건에 부합하면 캐릭터는 사라짐
                gameResult.style.top = '42.5%'; // 게임 결과창을 표시
                pointResult.style.color = 'red'; // 게임 결과창 내부 결과값 표기란의 글자색을 빨강색으로 변경
                pointResult.textContent = '패배'; // 게임 결과창 내부 결과값 표기란의 글자는 '패배'로 표기
                clearInterval(intervalStop); // 캐릭터를 사라지게 하는 함수의 반복을 중지
                clearInterval(intervalEnd); // 보스 캐릭터를 사라지게 하는 함수의 반복을 중지
            }
        } 
    }
}

function enemyVanish () { // 보스 캐릭터를 사라지게 하는 함수
    if (parseInt(missile.offsetLeft + characterContainer.offsetLeft) <= parseInt(enemy.offsetLeft) + parseInt(enemy.offsetWidth) && // 미사일의 왼쪽 벽이 보스 캐릭터의 오른쪽 벽을 지나면 안됨
        parseInt(missile.offsetLeft + characterContainer.offsetLeft) + parseInt(missile.offsetWidth) >= parseInt(enemy.offsetLeft) && // 미사일의 오른쪽 벽이 보스 캐릭터의 왼쪽 벽을 지나야 함
        parseInt(characterContainer.offsetTop + missile.offsetTop) <= parseInt(enemy.offsetTop) + parseInt(enemy.offsetHeight) && // 미사일의 윗부분이 보스 캐릭터의 아랫부분을 지나야 함
        parseInt(characterContainer.offsetTop + missile.offsetTop) + parseInt(missile.offsetHeight) >= parseInt(enemy.offsetTop)) { // 미사일의 아랫부분이 보스 캐릭터의 윗부분을 지나면 안됨
        enemy.textContent = parseInt(enemy.textContent) + parseInt(missile.textContent); // 보스 캐릭터의 체력(텍스트값)은 보스 캐릭터의 텍스트값 + 미사일의 텍스트 값
        missile.classList.remove('move-missile'); // 조건에 부합하면 미사일의 이동 트랜지션을 제거한다.

        if(enemy.textContent <= 0) { // 보스 캐릭터의 체력(텍스트값)이 '0'보다 작거나 같으면 
            enemy.style.display = 'none'; // 보스 캐릭터를 사라지게 함
            gameResult.style.top = '42.5%'; // 결과창을 표시함
            pointResult.textContent = '승리'; // 결과창 내부 결과 표기란에 텍스트를 '승리'로 표기
            clearInterval(intervalEnd); // 보스 캐릭터를 사라지게 하는 함수의 반복을 중지
            clearInterval(intervalStop); // 캐릭터를 사라지게 하는 함수의 반복을 중지

            for (let i = 0; i < item.length; i++) {
                item[i].style.display = 'none'; // 보스 미사일을 사라지게 함
            }
        }
    }
}

function enemyAppearance() { // 보스 등장 함수
    enemy.classList.add('move-enemy'); // 보스 이동 트랜지션을 추가
}

function repeatCharacterVanish () { // 캐릭터를 사라지게 하는 함수를 반복하는 함수
    intervalStop = setInterval(characterVanish, 100);
}

function repeatItemVanish () { // 보스 캐릭터를 사라지게 하는 함수를 반복하는 함수
    intervalEnd = setInterval(enemyVanish, 100);
}

// 게임 시작 전 로딩되는 시작 메뉴의 '게임 시작' 버튼의 'click' 이벤트를 적용
function menuVanish (event) { // 게임 시작 화면을 사라지게 하는 함수
    menuContainer.style.display ='none'; // 메뉴창을 숨김 처리
    fireButton.disabled = true; // 발사 버튼 비활성화
    setTimeout(()=> { // 3초 뒤에 
        fireButton.disabled = false; // 발사 버튼 활성화
    }, 3000); // 3000 = 3초

    setTimeout(()=> { // 17초 뒤에
        if (gameResult.offsetTop === -300) { // 결과창이 화면 밖에 있으면
            gameResult.style.top = '42.5%'; // 게임 결과창을 표시
            pointResult.style.color = 'red'; // 게임 결과창 내부 결과값 표기란의 글자색을 빨강색으로 변경
            pointResult.textContent = '패배'; // 게임 결과창 내부 결과값 표기란의 글자는 '패배'로 표기
            clearInterval(intervalEnd); // 보스 캐릭터를 사라지게 하는 함수의 반복을 중지
            clearInterval(intervalStop); // 보스 캐릭터를 사라지게 하는 함수의 반복을 중지
        }
    }, 17000) // 17000 = 17초
}

// 결과창에 있는 '한번더' 버튼의 '클릭' 이벤트를 적용
function gameRestart(event) { // 게임을 재시작하는 함수
    location.href = 'game.html'; // 클릭 시 미니게임 초기 화면을 돌아감
}

// 시작 메뉴와 결과창에 있는 '돌아가기' 버튼과 '게임종료' 버튼의 '클릭' 이벤트를 적용
function moveHome(event) { // 홈화면으로 이동하는 함수
    location.href = '../home/home.html'; // 클릭 시 홈화면 페이지로 이동
}