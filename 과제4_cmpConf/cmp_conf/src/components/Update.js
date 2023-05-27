//handleUpdate 선언 후 setState로 value값 조절하는 법
//e.target.value

import { useState } from "react";

const Update = (props) => {
    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);

    const contentTitle = (e) => {
        setTitle(e.target.value)
    }

    const contentBody = (e) => {
        setBody(e.target.value)
    }

    const contentUpdate = () => {
        props.onUpdate(title, body)
    }

    return (
      <>
        <input value={title} onChange={contentTitle}></input>
        <input value={body} onChange={contentBody}></input>
        <button onClick={contentUpdate}>Update</button>
      </>
    );
}

export default Update;