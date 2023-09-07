import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import RegisterRequests from './RegisterRequests';
import { CSVLink } from 'react-csv';
import './AdminPage.css';

export default function AdminPage() {

  const [Requests, setRequests] = useState([]);
  const [Req, setReq] = useState([]);
  const [TargetRows, setTargetRows] = useState([]);
  const [TargetRowsData, setTargetRowsData] = useState([]);

  const LogouBtn = useRef();
  const apidomain = process.env.REACT_APP_API_DOMIAN;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const result = (await axios.get(`${apidomain}/admin/getAllRequests`)).data;
        if (result.err) new Error(result.err);
        if (result.response.length) {
          setRequests(result.response); setReq(result.response);
        };
      } catch (error) {
        alert(error.message);
      };
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    if (TargetRows.length) {
      Requests.forEach(ele => {
        if (TargetRows.indexOf(ele.StudentId)) setTargetRowsData(ele);
      });
    };
  }, [TargetRows]);

  useEffect(() => console.log(TargetRowsData), [TargetRowsData]);

  const DeleteAllRequests = () => {
    axios.delete(`${apidomain}/admin/DeleteAllRequests`);
  }

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
            <div id='RegisterRequestsContent'>
              { 
                Req.length ?
                  <RegisterRequests data={Req} callback={setTargetRows}/> :
                  <p className='notdata'>No Data ...</p>
              }
            </div>
            <div id='RegisterRequestsFooter'>
              <button className='RemoveBtn'>حذف الكل</button>
              <button className='RemoveBtn'>حذف</button>
              <button className='SaveBtn'>
                <CSVLink data={Req} style={{ color: 'white' }}>
                  احفظ الكل
                </CSVLink>
              </button>
              <button className='SaveBtn'>
                <CSVLink data={Req} style={{ color: 'white' }}>
                  احفظ
                </CSVLink>
              </button>
            </div>
        </section>
    </div>
  );
};