import React, { useRef } from 'react';
import RegisterRequests from './RegisterRequests';
import './AdminPage.css';

export default function AdminPage() {

    const LogouBtn = useRef();

    const ShowLogoutBtn = () => {
        LogouBtn.current.classList.toggle('HideLogoutBtn');
    };

  return (
    <div id='AdminPage'>
        <header id='AdminPageHeader'>
            <div>
                <h1>Logo</h1>
            </div>
            <div onClick={ShowLogoutBtn}>
                <div>اسم المستخدم</div>
                <div className='HideLogoutBtn' ref={LogouBtn}><a href='#'>تسجيل الخروج</a></div>
            </div>
        </header>
        <section id='AdminPageSection'>
            <div id='RegisterRequestsHeader'>
              <form>
                <input type='search' name='search' placeholder='Search' />
                <select>
                  <option value='StudentId'>id</option>
                  <option value='FirstName'>الاسم الأول</option>
                  <option value='LastName'>اسم العائلة</option>
                  <option value='Adress'>العنوان</option>
                  <option value='Email'>بريد إلكتروني</option>
                  <option value='Tele'>رقم الهاتف</option>
                  <option value='AcademicLevel'>المستوى الأكاديمي</option>
                  <option value='RegisteringDate'>تاريخ</option>
                </select>
              </form>
            </div>
            <div id='RegisterRequestsContent'></div>
            <div>
              <button>حذف الكل</button>
              <button>حذف</button>
              <button>احفظ الكل</button>
              <button>احفظ</button>
            </div>
        </section>
    </div>
  );
};