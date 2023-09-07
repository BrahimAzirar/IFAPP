import React from 'react';
import './AdminLogin.css';

export default function AdminLogin() {
  return (
    <div id='AdminLogin'>
        <form>
            <div>
                <h1>Logo</h1>
            </div>
            <div>
                <div>
                    <input type='text' name='username' placeholder='Username' />
                </div>
                <div>
                    <input type='password' name='password' placeholder='Password' />
                </div>
                <div>
                    <button>Log in</button>
                </div>
            </div>
        </form>
    </div>
  )
}