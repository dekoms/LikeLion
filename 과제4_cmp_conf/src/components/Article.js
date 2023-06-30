//App.js에서 Artitcle사용하는거 보면 props가 아니라
//title, body로 매개변수가 있어야 하는거 아닌가?

const Article = (props) => {
    return (
        <>
            <h2>
                {props.title}
            </h2>
            <p>
                {props.body}
            </p>
        </>
    );
};

export default Article;