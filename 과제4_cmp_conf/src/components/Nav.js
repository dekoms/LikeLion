//div태그로 감싸기
//key 매핑(id값)
//li에 title명 하나씩 대입

const Nav = (props) => {
    return (
        <>
            <ol>
                {props.topics.map((topic) => (
                    <li key={topic.id}>
                        <a href="/"
                            onClick={(e) => {
                                e.preventDefault(); // a 태그의 기본 기능을 막는다
                                props.onChangeMode(topic.id);
                            }}>
                            {topic.title}
                        </a>
                    </li>
                ))}
            </ol>
        </>
    );
}

export default Nav;