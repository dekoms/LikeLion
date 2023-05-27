//handleCreate 선언 후 setState로 value값 조절하는 법
//e.target.value

import { useState } from "react";

const Create = (props) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const contentTitle = (e) => {
        setTitle(e.target.value)
    }

    const contentBody = (e) => {
        setBody(e.target.value)
    }

    const contentCreate = () =>{
        props.onCreate(title, body)
    }

    return (
      <>
        <input value={title} onChange={contentTitle}></input>
        <input value={body} onChange={contentBody}></input>
        <button onClick={contentCreate}>Create</button>
      </>
    );
}

export default Create;