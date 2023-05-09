const titleContainer = document.querySelector(".title-container");
const titleBtn = document.querySelector("#startBtn");
const questionContainer = document.querySelector('.question-container');
const question = document.querySelector('#question');
const type = document.querySelector('#type');
const aBtn = document.querySelector("#a");
const bBtn = document.querySelector('#b');
const EI = document.querySelector('#EI');
const SN = document.querySelector('#SN');
const TF = document.querySelector("#TF");
const JS = document.querySelector("#JP");
const pro = document.querySelector('.progress-bar');
const MBTI = document.querySelector('#mbti');
const explain = document.querySelector('#explain');
const animal = document.querySelector('#animal');
const image = document.querySelector('#result-img');
const resultContainer = document.querySelector('.result-container');


const q = {
    1: {
        "title": "1. 주말에 하는 일은?", 
        "type": "EI", 
        "A": "친구들이랑 약속을 잡는다.", 
        "B": "집에서 쉰다."
    },
    2: {"title": "2. 처음 가는 모임에서 나는?", "type": "EI", "A": "금방 사람들과 친해진다.", "B": "사람들이 나한테 집중하지 않았으면 좋겠다."},
    3: {"title": "3. 다음주까지 해야 하는 과제가 생겼다. 나는?", "type": "JP", "A": "까먹지 않게 캘린더에 마감일을 표시한다.", "B": "일주일이나 남았네? ㅋㅋ"},
    4: {"title": "4. 초면에 상대가 나에게 선을 넘을 듯한 말을 한다.", "type": "EI", "A": "상대에게 불쾌감을 드러내고 사과를 받아낸다.", "B": "한마디 할지 고민하다가 타이밍을 놓쳐 웃으며 상황을 넘어간다."},
    5: {"title": "5. 긴 시간을 대중교통을 이용할 때 나는?", "type": "SN", "A": "에어팟을 끼고 노래를 듣는다.", "B": "창 밖의 풍경을 구경한다."},
    6: {"title": "6. 나는 공부를 어디서 하지?", "type": "TF", "A": "도서관", "B": "카페"},
    7: {"title": "7. 팀 프로젝트를 받아들일 때 내 생각은?", "type": "TF", "A": "후딱하고 치워버리자.", "B": "하..(더 이상의 말은 생략한다)"},
    8: {"title": "8. 친구가 자고 일어나니 목이 아프다고 한다. 나는?", "type": "TF", "A": "입 벌리고 잤겠지", "B": "감기 걸린거 아니야? 괜찮아?"},
    9: {"title": "9. 여행을 갈 때 나는?", "type": "JP", "A": "여행 계획을 다 정해서 간다.", "B": "가서 느낌대로 다니면 되는거지~"},
    10: {"title": "10. 책을 읽을 때 나는?", "type": "JP", "A": "한 번에 끝까지 읽는다.", "B": "그날 느낌대로 조금씩 나눠서 읽는다."},
    11: {"title": "11. 팀 프로젝트 조장을 정할 때 나는?", "type": "SN", "A": "당당하게 조장을 맡는다.", "B": "최대한 조용히 있는다."},
    12: {"title": "12. 집 근처에 새로운 감성 카페가 생겼다 나는?", "type": "SN", "A": "뭔 감성 카페여, 1000원 아메리카노 동네 카페가 최고지.", "B": "느낌있는데? 다음에 가봐야지."}
}
const result = {
    "ISTJ": {
        "animal": "곰", 
        "explain": "신중하고 신뢰할 수 있는 검사관형입니다. 현실적이고 조직적이며, 안정성과 안전을 중시합니다.", 
        "img": "./img/bear.png"
    },
    "ISFJ": {"animal": "개", "explain": "섬세하고 책임감 있는 수호자형입니다. 신뢰할 만하며, 다른 사람들을 돌보고 지원합니다.", "img": "./img/dog.png"},
    "INFJ": {"animal": "고양이", "explain": "이해심이 많고 통찰력 있는 옹호자형입니다. 신비로우며 독립적이며, 타인을 이해하고 지원합니다.", "img": "./img/cat.png"},
    "INTJ": {"animal": "올빼미", "explain": "전략적이고 분석적인 고문계획가형입니다. 현명하고 논리적이며, 목표 달성을 위해 철저한 계획을 세웁니다.", "img": "./img/owl.png"},
    "ISTP": {"animal": "호랑이", "explain": "독립적이고 탐구적인 조율자형입니다. 현실적이며 문제 해결에 능숙하며, 논리와 감각을 조화시킵니다.", "img": "./img/tiger.png"},
    "ISFP": {"animal": "나무늘보", "explain": "평온하고 예술적인 예술가형입니다. 조용하고 고요한 분위기를 선호하며, 자연과 조화를 이루는 것을 즐깁니다.", "img": "./img/sloth.jpg"},
    "INFP": {"animal": "나비", "explain": "이상적이고 온화한 중재자형입니다. 감성적이고 창의적이며, 내적 가치와 조화를 추구합니다.", "img": "./img/butterfly.jpg"},
    "INTP": {"animal": "펭귄", "explain": "독립적이고 분석적인 사색가형입니다. 창의적이며 심층적인 사고를 가지며, 독특한 방식으로 문제를 해결합니다.", "img": "./img/penguin.jpg"},
    "ESTP": {"animal": "물개", "explain": "활동적이고 탐험심이 강한 도전가형입니다. 즉흥적이고 사회적인 성향을 가지며, 문제 해결에 창의적입니다.", "img": "./img/seal.jpg"},
    "ESFP": {"animal": "사슴", "explain": "사교적이고 재미있는 연예인형입니다. 활기차고 친근하며, 현재의 순간을 즐기고 다른 사람들을 웃게 합니다.", "img": "./img/deer.jpg"},
    "ENFP": {"animal": "돌고래", "explain": "외향적이고 자유로운 탐험가형입니다. 사회적이며 열정적이며, 새로운 아이디어와 사람들과의 연결을 즐깁니다.", "img": "./img/dolphin.jpg"},
    "ENTP": {"animal": "여우", "explain": "독창적이고 재기발랄한 변론가형입니다. 호기심이 많고 유연하며, 새로운 아이디어를 창출합니다.", "img": "./img/fox.jpg"},
    "ESTJ": {"animal": "사자", "explain": "실질적이고 현실적인 지도자형입니다. 대담하고 결정력이 있으며, 사회적인 리더십을 가집니다.", "img": "./img/lion.jpg"},
    "ESFJ": {"animal": "악어", "explain": "친절하고 사회적인 호스트형입니다. 다른 사람들을 배려하며 도움을 주는 동시에 보호자로서의 역할을 합니다.", "img": "./img/crocodile.jpg"},
    "ENFJ": {"animal": "말", "explain": "사회적이고 친절한 교역형입니다. 다른 사람들을 돕고 영감을 주며, 긍정적인 영향을 미칩니다.", "img": "./img/horse.png"},
    "ENTJ": {"animal": "독수리", "explain": "대담하고 목표 지향적인 지도자형입니다. 분석적이고 통찰력이 뛰어나며, 목표 달성을 위해 노력합니다.", "img": "./img/eagle.jpg"}
}


let num = 1;
let mbti = "";

titleBtn.addEventListener('click', () => {
    titleContainer.style.display = 'none'
    questionContainer.style.display = 'block'

    updateQuestion()
})

aBtn.addEventListener('click', () => {
    switch(type.innerHTML){
        case "EI":
            let e = parseInt(EI.value)
            EI.setAttribute('value', e+1)
            break;
        case "SN":
            let s = parseInt(SN.value)
            SN.setAttribute('value', s+1)
            break;
        case "TF":
            let t = parseInt(TF.value)
            TF.setAttribute('value', t+1)
            break;
        case "JP":
            let j = parseInt(JP.value)
            JP.setAttribute('value', j+1)
            break;
    }
    updateQuestion()
})

bBtn.addEventListener('click', () => {
    updateQuestion()
})

function updateQuestion(){
    if(num === 13){
        questionContainer.style.display = 'none'
        resultContainer.style.display = 'block'

        EI.value > 1 ? mbti+='E' : mbti+='I'
        SN.value > 1 ? mbti+='S' : mbti+='N'
        TF.value > 1 ? mbti+='T' : mbti+='F'
        JP.value > 1 ? mbti+='J' : mbti+='P'

        MBTI.innerHTML = mbti
        explain.innerHTML = result[mbti].explain
        animal.innerHTML = result[mbti].animal
        image.setAttribute('src', result[mbti].img)
    } else{
        pro.setAttribute('style', `width: calc(100/12*${num}%);`)
        question.innerHTML = q[num].title
        type.innerHTML = q[num].type
        aBtn.innerHTML = q[num].A
        bBtn.innerHTML = q[num].B
        num++
    }
}