import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import RegisterRequests from './RegisterRequests';
import DeletingAlert from './DeletingAlert';
import { CSVLink } from 'react-csv';
import './AdminPage.css';
import './Responsive.css';

export default function AdminPage() {

  const [Requests, setRequests] = useState([]);
  const [Req, setReq] = useState([]);
  const [TargetRows, setTargetRows] = useState([]);
  const [TargetRowsData, setTargetRowsData] = useState([]);
  const [ShowDeletingAlert, setShowDeletingAlert] = useState(false);

  const Callbacks = { setRequests, setShowDeletingAlert };

  const LogouBtn = useRef();
  const selectTag = useRef();
  const AdminPage = useRef();
  const apidomain = process.env.REACT_APP_API_DOMIAN;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const result = (await axios.get(`${apidomain}/admin/getAllRequests`)).data;
        if (result.err) new Error(result.err);
        if (result.response.length) {
          setRequests(result.response);
          // setReq(result.response);
        };
      } catch (error) {
        alert(error.message);
      };
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    setReq(Requests);
  }, [Requests]);

  useEffect(() => {
    for (let ele of Req) {
      if (TargetRows.includes(parseInt(ele.StudentId))) setTargetRowsData(prev => [...new Set([...prev, ele])]);
      else setTargetRowsData(prev => prev.filter(el => el.StudentId !== ele.StudentId));
    };
  }, [TargetRows]);

  useEffect(() => {
    if (ShowDeletingAlert === false) AdminPage.current.classList.remove('disabelePage');
  }, [ShowDeletingAlert]);

  const ShowAlert = async () => {
    setShowDeletingAlert(true);
    AdminPage.current.classList.add('disabelePage');
  }

  const ShowLogoutBtn = () => {
      LogouBtn.current.classList.toggle('HideLogoutBtn');
  };

  const handelSearching = (e) => {
    const word = e.target.value;
    const target = selectTag.current.value;
    
    if (word) {
      setReq(Requests.filter(ele => {
        if (target === 'StudentId') {
          if (ele.StudentId === parseInt(word)) return ele;
        } else {
          if (ele[target].includes(word)) return ele;
        };
      }));
    } else {
      setReq(Requests);
    };
  };


  return (
    <>
      { ShowDeletingAlert && <DeletingAlert callback={Callbacks} targets={TargetRows}/> }
      <div id='AdminPage' ref={AdminPage}>
        <header id='AdminPageHeader'>
            <div> <img src='/Images/logo.svg' /> </div>
            <div onClick={ShowLogoutBtn}>
                <div>اسم المستخدم</div>
                <div className='HideLogoutBtn' ref={LogouBtn}><a href='#'>تسجيل الخروج</a></div>
            </div>
        </header>
        <section id='AdminPageSection'>
            <div id='RegisterRequestsHeader'>
              <form>
                <input type='search' name='search' placeholder='Search' onChange={handelSearching} />
                <select ref={selectTag}>
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
                  <p className='notdata'>ليست هناك بيانات</p>
              }
            </div>
            <div id='RegisterRequestsFooter'>
              <button className='RemoveBtn' onClick={ShowAlert}>حذف الكل</button>
              <button className='RemoveBtn' onClick={ShowAlert}>حذف</button>
              <button className='SaveBtn'>
                <CSVLink data={Req} style={{ color: 'white' }}>
                  احفظ الكل
                </CSVLink>
              </button>
              <button className='SaveBtn'>
                <CSVLink data={TargetRowsData} style={{ color: 'white' }}>
                  احفظ
                </CSVLink>
              </button>
            </div>
        </section>
      </div>
    </>
  );
};