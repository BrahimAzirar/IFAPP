import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';
import './Responsive.css';

export default function AdminLogin() {

    const formtarget = useRef();
    const redirect = useNavigate();
    const apidomain = process.env.REACT_APP_API_DOMIAN;

    useEffect(() => {
        document.title = 'IFAPP | Admin Login';

        const CheckUserIsAuth = async () => {
            try {
                const result = (await axios.get(`${apidomain}/admin/isAuthenticated`, { withCredentials: true })).data
                if (result.err) {
                    console.log(result.err);
                    throw new Error(result.err)
                };
                if (result.response) redirect(result.nextPage);
            } catch (error) {
                alert(error.message);
            };
        };

        CheckUserIsAuth();
    }, []);

    const login = async (e) => {
        e.preventDefault();
        try {
            const data = Object.fromEntries(new FormData(formtarget.current));
            const result = (
                await axios.post(`${apidomain}/admin/authentication/login`, data, { withCredentials: true })
            ).data;

            if (result.err) throw new Error(result.err);
            if (result.response) redirect(result.nextPage);
            else throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة');
        } catch (error) {
            alert(error.message);
        };
    };

  return (
    <div id='AdminLogin'>
        <form ref={formtarget}>
            <div> <img src='/Images/logo.svg' /> </div>
            <div>
                <div>
                    <input type='text' name='Username' placeholder='اسم المستخدم' />
                </div>
                <div>
                    <input type='password' name='_Password' placeholder='كلمة المرور' />
                </div>
                <div>
                    <button onClick={login}>تسجيل الدخول</button>
                </div>
            </div>
        </form>
    </div>
  )
}