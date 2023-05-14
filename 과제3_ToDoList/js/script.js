const currentTime = document.querySelector('.todo-title');
const todoInputElement = document.querySelector('.todo-input');
const todoEnterBtn = document.querySelector('.enter');
const todoList = document.querySelector('.todo-list');
const completeAllBtn = document.querySelector('.complete-all-btn');
const leftItem = document.querySelector('.left-items');
const showAll = document.querySelector('.show-all-btn');
const showActive = document.querySelector('.show-active-btn');
const showCompleted = document.querySelector('.show-completed-btn');
const clearAll = document.querySelector('.clear-all-btn');

let list = [];
let todos = []; // todo를 모아놓은 객체 배열 {id, content, isCompleted}
let id = 1; // todo 객체의 id가 될 숫자

let isAllCompleted = false; // todos 속 모든 todo의 isCompleted가 true인지 저장하는 Boolean

let curType = 'all'; // 현재 필터값을 저장하는 string -> 'all', 'active', 'completed' 
// (선택)

// 현재 todos를 매개변수 newTodos로 바꿔주는 함수
const setTodos = (newTodos) => todos = newTodos; 

// 현재 todos 배열 전체를 반환하는 함수
const getAllTodos = () => {
    return todos;
}


// 현재 input에 입력된 value를 가져와서 처리하는 함수 -> 키보드 enter, 버튼 클릭 2가지로 수행
const getInputValue = () => {
    // todoInputElement에 'enter'키가 "keypress"됐을 때, doTrimValue() 실행
    todoInputElement.addEventListener('keypress', (e) =>{
        if(e.key === 'Enter'){
            doTrimValue(e.target.value);
        }
    });
    // input 옆 enter 버튼을 'click'했을 때, doTrimValue() 실행
    todoEnterBtn.addEventListener('click', () =>{
        doTrimValue(todoInputElement.value);
    });
};
getInputValue()

// 앞뒤 공백 제거 후, 빈 문자열이 아닐 경우 pushTodos() 실행
const doTrimValue = (val) =>{ 
    const trimVal = String(val).trim(); // string으로 형 변환 후, 공백 제거
    if( trimVal !== ''){ // 빈 문자열이 아니면
        pushTodos(trimVal); // pushTodos()로 todos 배열에 추가하기
    }
    else{ // 빈 문자열이면
        alert("내용을 입력 후 클릭하세요"); // alert 창
    }
    todoInputElement.value = ''; // input의 value 없애기

};



// todos 객체 배열에 객체 추가
const pushTodos = (context) =>{
    const newId = id++; // 아이디 할당
    const newTodos = [...todos, { id : newId, content : context, isCompleted : false }]; // 새로운 객체 배열 만들기, spread operator
    
    setTodos(newTodos); // setTodos()로 새로운 배열을 todos로 결정하기
    paintTodos(); // 갱신된 todos로 todo-list 작성하기
	setLeftItems(); // 남은 할일 계산하기
}



// 현재 todos에 있는 객체로 todo-list 작성하기
const paintTodos = ()=>{
    // 지금까지 list에 있던 li 요소를 지운다
    todoList.innerHTML = null;

    ////빈 todo리스트에 추가
    const allTodos = getAllTodos();
    allTodos.forEach(todo => paintFilterTodo(todo));
};


////todo에 리스트값 하나씩 순서대로 들어감
const paintFilterTodo = (todo) =>{
    // 감싸줄 li 태그 생성, 클래스명 추가
    let liElement = document.createElement('li');
    ////<li>태그를 만들고 class명을 지정한 것임
    liElement.classList.add('todo-item');

    // check button
    let checkElement = document.createElement('button');
    checkElement.classList.add('checkbox');
    checkElement.innerHTML = "✔︎";

    // content
    let contentElement = document.createElement('div');
    contentElement.classList.add('content');
    contentElement.innerHTML = todo.content;

    // delete button
    let deleteElement = document.createElement('button');
    deleteElement.classList.add('delBtn');
    deleteElement.innerHTML = "✕";
    
    // li 태그에 요소 합치기
    liElement.appendChild(checkElement);
    liElement.appendChild(contentElement);
    liElement.appendChild(deleteElement);

    // ul 태그에 현재 li 태그 합치기
    todoList.appendChild(liElement);

    // content
    // 이벤트 리스너 추가
    contentElement.addEventListener('dblclick', (e)=> dbclickTodo(e, todo.id));

    // check button
    // 이벤트 리스너 추가
    checkElement.addEventListener('click', ()=> completeTodo(todo.id));

    // 현재 객체가 완료된 객체면 클래스로 checked 추가
    // 처음부터 써놓긴 했지만, 사실 이 때를 위한 코드였습니다.
    if(todo.isCompleted){
        liElement.classList.add('checked');
    }

    deleteElement.addEventListener('click', ()=> removeTodo(todo.id));

    completeAllBtn.addEventListener('click', () => completeAll());

    ////왜 [...todo]는 안되지???
    list = [...todos];
    showAll.addEventListener('click', () => showListAll());
    showActive.addEventListener('click', () => showListActive());
    showCompleted.addEventListener('click', () => showListCompleted());
    clearAll.addEventListener('click', () => removeAll());
};



const setLeftItems = () => {
    const leftTodo = getAllTodos().filter(todo => todo.isCompleted == false);
    // console.log(leftTodo.length);
    leftItem.innerHTML = `🥕 오늘 할 일이 ${leftTodo.length}개 남아있습니다 🥕`;
}



// todo-list에 input.edit-input 추가하기 (더블 클릭 이벤트)
const dbclickTodo = (e, todoId) => {
    const inputElement = document.createElement('input');
    inputElement.classList.add('edit-input');
    const content = e.target.innerHTML;
    inputElement.value = content;
    const curElement = e.target;
    const parentElement = curElement.parentNode;

    const clickBody = (e) => {
        if(e.target !== inputElement){
            ////Uncaught DOMException -> 삭제했던 자식 또 삭제하니까 발생
            ////input태그만 자식이 아닌데? button이 있잖슴
            parentElement.removeChild(inputElement);
            ////둘 다 똑같지 않나? append해보니 좀 다르네..
            ////todoList.removeChild(inputElement);
        }
    }

    inputElement.addEventListener('keypress', (e)=>{
        if(e.key === "Enter"){
            if(String(e.target.value).trim() !== ""){
                updateTodo(e.target.value, todoId);
            }
            else{
                alert("현재 입력한 할 일이 없습니다!");
            }
        }
    });

    parentElement.appendChild(inputElement); // li 태그에 input 추가
    //document.body.addEventListener('click', clickBody); // body에 click 이벤트 추가
}

////리스트 순서는 어떻게 정렬되는거지???
// todos 객체 배열에서 할일 수정
const updateTodo = (content, todoId) => {
    const newTodos = getAllTodos().map(todo => todo.id === todoId ? {...todo, content} : todo );
    setTodos(newTodos);
    paintTodos();
}


//// 체크표시할 때마다 리스트 삭제후 생성 및 총개수 나타내기
const completeTodo = (todoId) => {
    const newTodos = getAllTodos().map(todo => (todo.id === todoId) ? {...todo, isCompleted : !todo.isCompleted} : todo);
    setTodos(newTodos);
    paintTodos();
    setLeftItems();
};

const removeTodo = (todoId) => {
    const newTodos = getAllTodos().filter(todo => (todo.id !== todoId));
    setTodos(newTodos);
    paintTodos();
    setLeftItems();
}

const completeAll = () => {
    const newTodos = getAllTodos().map(todo => (!isAllCompleted) ? {...todo, isCompleted : true} : {...todo, isCompleted : false});
    if(!isAllCompleted) isAllCompleted = true
    else isAllCompleted = false
    setTodos(newTodos);
    paintTodos();
    setLeftItems();
}

const showListAll = () => {
    const newTodos = list;
    setTodos(newTodos);
    paintTodos();
    setLeftItems();
}

const showListActive = () => {
    ////리스트의 각 요소에 접근하는 방법은??
    const newTodos = getAllTodos().forEach(todo => todo.isCompleted === false);
    setTodos(newTodos);
    paintTodos();
    setLeftItems();
}

const showListCompleted = () => {
    const newTodos = getAllTodos().filter(todo => todo.isCompleted === true);
    setTodos(newTodos);
    paintTodos();
    setLeftItems();
}

const removeAll = () => {
    const newTodos = list = [];
    setTodos(newTodos);
    paintTodos();
    setLeftItems();
}


function clock(){
    const date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    hh = (hh<10) ? "0"+hh : hh;
    mm = (mm<10) ? "0"+mm : mm;
    ss = (ss<10) ? "0"+ss : ss;

    const time = hh + ":" + mm + ":" + ss;
    currentTime.innerHTML = time;

    setTimeout(() => clock(), 1000);
}

clock();