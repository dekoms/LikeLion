import React, { useState } from "react";
import { SignInForm } from "styles/SignContainer.styled";
import { useEffect } from "react";

const LoginForm = () => {
    const initData = Object.freeze({
        nickname: '',
        password: '',
    });
    const [data, updateData] = useState(initData);
    const [color, updateColor] = useState("#a6a6a6")

    useEffect(() => {
        if (data.nickname.length > 0 && data.password.length > 0) {
            updateColor("#FFA800");
        } else {
            updateColor("#A6A6A6")
        }
    }, [data])

    const handleChange = e => {
        console.log(e.target.value);
        updateData({
            ...data, [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(e.target.value);
    }

    return (
        <SignInForm color={color}>
            <input 
             type="text" 
             name="nickname" 
             placeholder="아이디" 
             required 
             onChange={handleChange}/>
            <input
             type="password" 
             name="password" 
             placeholder="비밀번호" 
             required 
             onChange={handleChange}/>
            <button className="submitBtn" type="submit" onClick={handleSubmit}>로그인하기</button>
        </SignInForm>
    );
}

export default LoginForm;