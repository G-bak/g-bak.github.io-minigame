// HTML 요소 가져오기 및 변수 선언
const character = document.querySelector('.character'); // 캐릭터 요소
const buttonBack = document.getElementById('back-button'); // '뒤로 이동' 버튼 요소
const buttonFront = document.getElementById('front-button'); // '앞으로 이동' 버튼 요소
const buttonUp = document.getElementById('up-button'); // '점프' 버튼 요소
const buttonDoubleUp = document.getElementById('double-up-button'); // '슈퍼 점프' 버튼 요소
const gameContainer = document.querySelector('.game-container'); // 게임 컨테이너 요소
const item = document.querySelectorAll('.item'); // 아이템 요소
const buttonStart = document.querySelector('.start-menu-start-button-text'); // '게임시작' 버튼 요소
const menuContainer = document.querySelector('.start-menu-container'); // 메튜 버튼 요소
const buttonReturn = document.querySelector('.start-menu-back-button-text'); // '돌아가기' 버튼 요소
const gameResult = document.querySelector('.end-menu-container'); // '게임 결과창' 요소
const buttonGameRestart = document.querySelector('.end-menu-restart-text'); // '한판더' 버튼 요소
const buttonEnd = document.querySelector('.end-menu-game-over-text'); // '게임종료' 버튼 요소
const pointResult = document.querySelector('.end-menu-result-point-text'); // 점수 결과 요소

// 이벤트 리스너 등록
buttonBack.addEventListener('click', moveBack);
buttonFront.addEventListener('click', moveFront);
buttonUp.addEventListener('click', moveUp);
buttonDoubleUp.addEventListener('click', moveDoubleUp);
buttonStart.addEventListener('click', moveItem);
buttonStart.addEventListener('click', menuVanish);
buttonReturn.addEventListener('click', moveHome);
buttonGameRestart.addEventListener('click', gameRestart);
buttonEnd.addEventListener('click', moveHome);

// 기타 초기화 코드
let intervalEnd; // 반복 종료 변수(캐릭터 이동)
let itemData = []; // 아이템 점수 저장 
let intervalStop; // 반복 종료 변수(캐릭터와 아이템이 만나면 사라지는 함수를 반복하는 함수를 종료하는 변수)
let point = 0; // 캐릭터가 획득한 아이템의 점수를 합산한 결과를 저장

// 함수 등록
repeatItemMatching (); // 아이템이 캐릭터와 부딪히면 사라지는 함수

// 캐릭터 '뒤로 이동' 버튼의 '클릭' 이벤트를 적용
function moveBack (event) {
    let characterPosition = character.offsetLeft // 캐릭터의 x좌표값을 변수로 선언하여 캐릭터의 현재 위치를 데이터화
    let characterMoveArea = gameContainer.offsetLeft // 배경 이미지의 x좌표값을 변수로 선언하여 배경 이미지의 현재 위치를 데이터화

    // 캐릭터의 x좌표(왼쪽벽)는 배경 이미지의 x좌표(왼쪽벽)를 넘어야 한다는 조건을 걸어 배경 이미지를 이탈하는 현상을 방지
    if (characterPosition -59 > characterMoveArea) { // characterPosition - 59를 먼저 계산하는 것은 캐릭터가 59px를 이동한 상태에서 다음 동작을 반복 수행하기 때문.
        character.style.left = (character.offsetLeft - 59) + 'px'; // 왼쪽으로 59px 이동
        console.log("뒤로 이동"); // 콘솔창의 확인하여 조건을 충족했는지 확인
        console.log("[캐릭터] " + "x좌표: " + (character.offsetLeft + character.offsetWidth/2) // 캐릭터의 몸통에서 반을 나눈 곳을 기준으로 좌표가 찍힘.(너비)
        + ", " +"y좌표: " + (character.offsetTop + character.offsetHeight/2)); // 캐릭터의 몸통에서 반을 나눈 곳을 기준으로 좌표가 찍힘. (높이)// 캐릭터의 몸통에서 반을 나눈 곳을 기준으로 좌표가 찍힘. (높이)
    }
}

// 캐릭터 '앞으로 이동' 버튼의 '클릭' 이벤트를 적용
function moveFront (event) {
    let characterPosition = character.offsetLeft + character.offsetWidth; // 캐릭터의 x좌표값을 변수로 선언하여 캐릭터의 현재 위치를 데이터화
    let characterMoveArea = gameContainer.offsetLeft + gameContainer.offsetWidth; // 배경 이미지의 x좌표값을 변수로 선언하여 배경 이미지의 현재 위치를 데이터화// 배경 이미지의 x좌표값을 변수로 선언하여 배경 이미지의 현재 위치를 데이터화

    // 캐릭터의 x좌표(오른쪽벽)는 배경 이미지의 x좌표(오른쪽벽)를 넘지 않아야 한다는 조건을 걸어 배경 이미지를 이탈하는 현상을 방지
    if (characterPosition +59 < characterMoveArea) { // characterPosition - 59를 먼저 계산하는 것은 캐릭터가 59px를 이동한 상태에서 다음 동작을 반복 수행하기 때문.
        character.style.left = (character.offsetLeft + 59) + 'px'; // 오른쪽으로 59px 이동
        console.log("앞으로 이동"); // 콘솔창의 확인하여 조건을 충족했는지 확인
        console.log("[캐릭터] " + "x좌표: " + (character.offsetLeft + character.offsetWidth/2) // 캐릭터의 몸통에서 반을 나눈 곳을 기준으로 좌표가 찍힘.(너비)
        + ", " +"y좌표: " + (character.offsetTop + character.offsetHeight/2)); // 캐릭터의 몸통에서 반을 나눈 곳을 기준으로 좌표가 찍힘. (높이)
    }
}

// 캐릭터 '점프' 버튼의 '클릭' 이벤트를 적용
function moveUp (event) {
    character.classList.add('jump-animation-start'); // 점프 트랜지션 클래스 추가
    character.style.transitionDuration = '0.5s'; // 점프 트랜지션의 지속 시간을 0.5초로 설정(개별적용)

    let intervalEnd = setInterval(() => { // 0.1초마다 캐릭터의 위치값 확인
        // 캐릭터의 위치값 확인
        console.log("[캐릭터] " + "x좌표: " + (character.offsetLeft + character.offsetWidth/2)
        + ", " +"y좌표: " + (character.offsetTop + character.offsetHeight/2));
    }, 100);

    if (character.classList.contains('jump-animation-start') === true) // 캐릭터의 'jump-animation-start' 클래스가 추가 되었다면 'true'(참)
    console.log("점프 성공"); // 콘솔창의 점프 트랜지션이 발생이 되면 성공 여부 표시
    
    // 모든 이동 버튼 비활성화 
    buttonBack.setAttribute('disabled', true); // '뒤로 이동' 버튼 비활성화
    buttonFront.setAttribute('disabled', true); // '앞으로 이동' 버튼 비활성화
    buttonUp.setAttribute('disabled', true); // '점프' 버튼 비활성화
    buttonDoubleUp.setAttribute('disabled', true); // '슈퍼 점프' 버튼 비활성화
    disableEvent(); // 모든 버튼이 비활성화가 되면 배경색을 연한 회색으로 변경하는 함수 호출
    console.log("모든 이동 버튼 0.5초 동안 비활성화 ") // 캐릭터의 다른 이동 버튼이 잠겼다는 것을 표시

    setTimeout(function() { // 처음 점프 함수가 호출된 뒤 0.5초 뒤에 다른 함수 호출 
        character.classList.remove('jump-animation-start'); // 기존 점프만 하는 클래스를 제거

        if (character.classList.contains('jump-animation-start') === false) { // 캐릭터의 'jump-animation-start' 클래스가 제거 되었다면 'true'(참)
            console.log("착지 중"); // 콘솔창의 점프 트랜지션 클래스가 제거되면 자동적으로 동일한 트랜지션 효과가 적용된 채 원래대로 서서히 되돌아옴을 표시
        } else {
            console.log("'점프 클래스' 삭제에 실패했습니다."); // 만약 점프 클래스가 제거되지 않아 오류가 생기면 오류 메세지 표시 
        }
    }, 500); // 500 = 0.5초

    setTimeout(function() { // 처음 점프 함수가 호출된 뒤 0.9초 뒤에 다른 함수 호출 
        clearInterval(intervalEnd); // 모든 이동 버튼이 다시 활성화가 되기 전에 먼저 setInterval 멈추기(버튼을 연타할 시 반복이 중지가 안되는 현상을 방지)
    }, 900); // 900 = 0.9초

    setTimeout(function() { // 처음 점프 함수가 호출된 뒤 1초 뒤에 다른 함수 호출 
        console.log("착지 성공"); // 점프 트랜지션이 끝나고 캐릭터가 제자리로 돌아온 것을 콘솔창에 표시

        // transitionend 이벤트 핸들러 등록
        character.addEventListener('transitionend', function () { // 'transitionend' = '이벤트가 끝나면'을 의미
            clearInterval(intervalEnd); // 애니메이션이 끝나면 setInterval 멈추기
            });
        
        // 모든 이동 버튼 활성화 
        buttonBack.removeAttribute('disabled'); // '뒤로 이동' 버튼 활성화
        buttonFront.removeAttribute('disabled'); // '앞으로 이동' 버튼 활성화
        buttonUp.removeAttribute('disabled'); // '점프' 버튼 활성화
        buttonDoubleUp.removeAttribute('disabled'); // '슈퍼 점프' 버튼 활성화 
        ableEvent(); // 모든 이동 버튼이 활성화가 되면 배경색을 원래 색으로 변경하는 함수 호출
        console.log("모든 이동 버튼 활성화 ") // 캐릭터의 다른 이동 버튼이 다시 활성화가 된 것을 표시
    }, 1000); // 1000 = 1초
}

// 캐릭터 '슈퍼 점프' 버튼의 '클릭' 이벤트를 적용
function moveDoubleUp (event) {
    character.classList.add('super-jump-animation-start'); // '슈퍼 점프' 트랜지션 클래스 추가
    character.style.transitionDuration = '0.65s'; // '슈퍼 점프' 트랜지션의 지속 시간을 0.65초로 설정
    
    let intervalEnd = setInterval(() => { // 0.1초마다 캐릭터의 위치값 확인
        // 캐릭터의 위치값 확인
        console.log("[캐릭터] " + "x좌표: " + (character.offsetLeft + character.offsetWidth/2) + ", " +"y좌표: " + (character.offsetTop + character.offsetHeight/2));
        }, 100);

    if (character.classList.contains('super-jump-animation-start') === true) // 캐릭터의 'super-jump-animation-start' 클래스가 추가 되었다면 'true'(참)
    console.log("점프 성공"); // 콘솔창의 '슈퍼 점프' 트랜지션이 발생이 되면 성공 여부 표시
    
    // 모든 이동 버튼 비활성화
    buttonBack.setAttribute('disabled', true); // '뒤로 이동' 버튼 비활성화
    buttonFront.setAttribute('disabled', true); // '앞으로 이동' 버튼 비활성화
    buttonUp.setAttribute('disabled', true); // '점프' 버튼 비활성화
    buttonDoubleUp.setAttribute('disabled', true); // '슈퍼 점프' 버튼 비활성화
    disableEvent(); // 모든 버튼이 비활성화가 되면 배경색을 연한 회색으로 변경하는 함수 호출
    console.log("모든 이동 버튼 0.65초 동안 비활성화 ") // 캐릭터의 다른 이동 버튼이 잠겼다는 것을 표시

    setTimeout(function() { // 처음 점프 함수가 호출된 뒤 0.5초 뒤에 다른 함수 호출 
        character.classList.remove('super-jump-animation-start'); // 기존 '슈퍼 점프'만 하는 클래스를 제거
        if (character.classList.contains('super-jump-animation-start') === false) { // 캐릭터의 'super-jump-animation-start' 클래스가 제거 되었다면 'true'(참)
            console.log("착지 중"); // 콘솔창의 '슈퍼 점프' 트랜지션 클래스가 제거되면 자동적으로 동일한 트랜지션 효과가 적용된 채 원래대로 서서히 되돌아옴을 표시
        } else {
            console.log("'점프 클래스' 삭제에 실패했습니다."); // 만약 '슈퍼 점프' 클래스가 제거되지 않아 오류가 생기면 오류 메세지 표시 
        }
    }, 650); // 650 = 6.5초

    setTimeout(function() { // 처음 점프 함수가 호출된 뒤 1.1초 뒤에 다른 함수 호출 
        clearInterval(intervalEnd); // 모든 이동 버튼이 다시 활성화가 되기 전에 먼저 setInterval 멈추기(버튼을 연타할 시 반복이 중지가 안되는 현상을 방지)
    }, 1100); // 1100 = 1.1초

    setTimeout(function() { // 처음 점프 함수가 호출된 뒤 1.3초 뒤에 다른 함수 호출 
        console.log("착지 성공"); // '슈퍼 점프' 트랜지션이 끝나고 캐릭터가 제자리로 돌아온 것을 콘솔창에 표시

        // transitionend 이벤트 핸들러 등록
        character.addEventListener('transitionend', function () { // 'transitionend' = '이벤트가 끝나면'을 의미
            clearInterval(intervalEnd); // 애니메이션이 끝나면 setInterval 멈추기
            });

        // 모든 이동 버튼 활성화 
        buttonBack.removeAttribute('disabled'); // '뒤로 이동' 버튼 활성화
        buttonFront.removeAttribute('disabled'); // '앞으로 이동' 버튼 활성화
        buttonUp.removeAttribute('disabled'); // '점프' 버튼 활성화
        buttonDoubleUp.removeAttribute('disabled'); // '슈퍼 점프' 버튼 활성화
        ableEvent(); // 모든 이동 버튼이 활성화가 되면 배경색을 원래 색으로 변경하는 함수 호출
        console.log("모든 이동 버튼 활성화 ") // 캐릭터의 다른 이동 버튼이 다시 활성화가 된 것을 표시
    }, 1300); // 1300 = 1.3초
}

// 아이템이 움직이는 함수 등록
function moveItem (event) {
    console.log("게임시작"); // 아이템이 움직인 다는 것은 곧 게임이 시작된다는 것을 콘솔창의 표시
    
    for (let i = 0; i < item.length; i++) { // 아이템의 총 갯수만큼 반복 
        item[i].classList.add('move-item'); // 아이템의 트랜지션 클래스 추가
        if (item[i].classList.contains('move-item') === true) { // 아이템의 클래스가 추가됐는지 다시 확인한 다음 추가됐다면 true(참)
            itemMatching (); // 캐릭터와 아이템이 맞닿으면 아이템이 사라지는 함수를 호출

            let intervalEnd = setInterval(() => { // 0.1초마다 아이템의 위치값 확인
                if ((item[i].offsetLeft + item[i].offsetWidth/2) !== 0 && (item[i].offsetTop + item[i].offsetHeight) !== 0
                && (item[i].offsetLeft + item[i].offsetWidth/2) !== 695) { // 아이템이 멈춰있을 때는 반복을 하면 안된다는 조건
                    // 아이템의 좌표값을 콘솔창의 표시 
                    console.log("[아이템(" + item[i].textContent + ")] " + "x좌표: " + (item[i].offsetLeft + item[i].offsetWidth/2) + ", " + "y좌표: " + (item[i].offsetTop + item[i].offsetHeight));
                } 

                if (item[i].style.display === 'none' || item[i].offsetLeft + item[i].offsetWidth <= 0) { 
                    clearInterval(intervalEnd); // 아이템이 사라지거나 아이템이 배경 이미지 밖으로 나가면 반복 종료
                }
            }, 100);
        }
    }
}

// 캐릭터와 아이템이 맞닿으면 아이템이 사라지는 함수 등록
function itemMatching () { 
    console.log('아이템이 사라지는 함수를 호출합니다.');
    for (let i = 0; i < item.length; i++) { // 아이템의 총 갯수만큼 반복 
        if (parseInt(character.offsetLeft) < parseInt(item[i].offsetLeft) + parseInt(item[i].offsetWidth) // 'item'이 캐릭터를 완전히 지나치면 안된다.(캐릭터의 뒷부분과 조금이라도 닿아야 한다.)
            && parseInt(character.offsetLeft) + parseInt(character.offsetWidth) > parseInt(item[i].offsetLeft) // 'item'이 캐릭터의 맨 앞부분과 닿으면 삭제 
            && parseInt(character.offsetTop) < parseInt(item[i].offsetTop) + parseInt(item[i].offsetHeight) // 'item'이 캐릭터를 완전히 지나치면 안된다.(캐릭터의 밑부분과 조금이라도 닿아야 한다.)
            && parseInt(character.offsetTop) + parseInt(character.offsetHeight) > parseInt(item[i].offsetTop)) { // 'item'이 캐릭터의 윗 앞부분과 닿으면 삭제 
                let itemValue = parseInt(item[i].textContent); // 아이템의 텍스트 값을 저장할 변수를 선언한 뒤 'parseInt'를 사용하여 숫자 값으로 저장
                itemData.push(itemValue); // 빈 배열의 아이템들의 각 텍스트값을 차례로 넣는다.
                // console.log(itemData);
                point += itemValue; // 'itemValue' 변수에는 각 아이템들의 텍스트값, 즉 숫자가 차례로 하나씩만 저장이 될수 있고, 'point'라는 변수에 하나씩 합산된 결과가 저장된다.
                item[i].style.display = 'none'; // 조건에 해당되면 아이템이 사라지게 함
                console.log("아이템(" + item[i].textContent + ")" +" 을 먹었습니다."); // 아이템이 사라지는 것을 '먹었다'라고 표현함
        }
    }   
}

// 아이템이 사라지는 함수를 0.1초마다 반복하는 함수를 등록하고 맨 상단에 먼저 호출시킨다.
function repeatItemMatching () {
    intervalStop = setInterval(itemMatching, 100); // 전역 변수에 let으로 선언된 '반복 종료' 변수에 'setInterval'을 하나만 사용할 경우 let을 빼고 반복을 적용한다.
}

// 게임 시작 전 로딩되는 시작 메뉴의 '게임 시작' 버튼의 'click' 이벤트를 적용
function menuVanish (event) {
    menuContainer.style.display ='none'; // 메뉴창을 숨김 처리

    setTimeout(() => { // 함수가 호출이 되고 60초 후에 결과창을 표시, 게임이 종료 되었다는 것을 알림
        clearInterval(intervalStop); // 아이템이 사라지는 함수를 반복한 것을 종료
        gameResult.style.top = '50%'; // 기존 top 값이 -50%로 되어있어 히든 처리되고 있던 결과창을 아래로 내려서 보이게 함.
        pointResult.innerText = parseInt(point); // 합산된 점수는 숫자로 변환되어 지정된 클래스의 텍스트로 표시되게 함.
    }, 60000); // 60000 = 60초
}

// 결과창에 있는 '한번더' 버튼의 '클릭' 이벤트를 적용
function gameRestart(event) { 
    location.href = 'minigame.html'; // 클릭 시 미니게임 초기 화면을 돌아감
}

// 시작 메뉴와 결과창에 있는 '돌아가기' 버튼과 '게임종료' 버튼의 '클릭' 이벤트를 적용
function moveHome(event) { 
    location.href = '../home/home.html'; // 클릭 시 홈화면 페이지로 이동
}

// 캐릭터 이동 버튼이 비활성화가 되면 배경색이 연한 회색으로 변경하는 함수를 등록
function disableEvent() { 
    buttonBack.style.backgroundColor = '#d6d5d5';
    buttonFront.style.backgroundColor = '#d6d5d5';
    buttonUp.style.backgroundColor = '#d6d5d5';
    buttonDoubleUp.style.backgroundColor = '#d6d5d5';
}

// 캐릭터 이동 버튼이 활성화가 되면 배경색이 원래 색으로 변경하는 함수를 등록
function ableEvent() {
    buttonBack.style.backgroundColor = '';
    buttonFront.style.backgroundColor = '';
    buttonUp.style.backgroundColor = '';
    buttonDoubleUp.style.backgroundColor = '';
}