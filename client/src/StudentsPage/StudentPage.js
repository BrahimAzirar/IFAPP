import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import './StudentPage.css';
import './Responsive.css';

export default function StudentPage() {

    const TargetForm = useRef();
    const parentOfImages = useRef();

    const Images = [
        '/Images/Specialities/p1.jpg',
        '/Images/Specialities/p2.jpg',
        '/Images/Specialities/p3.jpg',
        '/Images/Specialities/p 4.jpg',
        '/Images/Specialities/p 5.jpg',
    ];

    useEffect(() => {
        document.title = 'IFFAP | تسجيل';

        const FirstImage = parentOfImages.current.firstElementChild;
        FirstImage.classList.add('InTheFrontEnd');

        setInterval(() => {
            const InTheFrontEnd = document.getElementsByClassName('InTheFrontEnd')[0];
            const nextElement = InTheFrontEnd.nextElementSibling ? 
                InTheFrontEnd.nextElementSibling : FirstImage;

            InTheFrontEnd.classList.remove('InTheFrontEnd');
            InTheFrontEnd.classList.add('ToRight');

            nextElement.classList.add('InTheFrontEnd');

            setTimeout(() => {
                InTheFrontEnd.classList.remove('ToRight');
            }, 1000);
        }, 5000);
    }, []);

    const Registring = async (e) => {
        e.preventDefault();

        const InputIsEmpty = (object) => {
            return Object.values(object).some(ele => ele === '');
        };

        const CheckEmailIsNotValid = (email) => {
            const regex = /([0-9a-zA-Z]|.)@(gmail|yahoo|hotmail|outlook|aol|protonmail|zoho|mail|icloud|yandex|gmx|tutanota|fastmail).com/g;
            return email.match(regex) === null ? true : false;
        };

        const CheckPhoneNumberIsNotValid = (tel) => {
            const regex = /^\+?[0-9]{10,}$/;
            return tel.match(regex) === null ? true : false;
        };

        try {
            const data = Object.fromEntries(new FormData(TargetForm.current));
            const apidomain = process.env.REACT_APP_API_DOMIAN;
            if (InputIsEmpty(data)) throw new Error('هناك بعض الحقول فارغة');
            if (CheckEmailIsNotValid(data.Email)) throw new Error('هذا الايمايل غير صلاح اذخل ايمايل اخر');
            if (CheckPhoneNumberIsNotValid(data.Tele)) throw new Error('هذا رقم غير صلاح اذخل رقما اخر');
            const result = (await axios.post(`${apidomain}/students/register`, data)).data;
            if (result.err) throw new Error(result.err);
            if (result.response) {
                alert('تم التسجيل بنجاح');
                // window.location.reload();
            }
        } catch (error) {
            alert(error.message);
        }
    }

  return (
    <div id='StudentPage'>
        <header>
            <div>
                <div> <img src='/Images/logo.svg' /> </div>
            </div>
            <div ref={parentOfImages}>
                { Images.map((ele, idx) => <img key={idx} src={ele} />) }
            </div>
        </header>
        <section>
            <div>
                <div> <h1>من نحن</h1> </div>
                <p>اكتشف معهد التمريض IFAPP، منصة الانطلاق إلى عالم التميز في التمريض. نحن متخصصون في تعليم التمريض الشامل الذي يمكّنك من الحصول على مهنة مجزية في مجال الرعاية الصحية. انضم إلى معهدنا للاستفادة من الموجهين المتمرسين والتدريب العملي وبيئة التعلم الداعمة. رحلتك لتصبح متخصصًا ماهرًا في الرعاية الصحية تبدأ هنا. لا تتردد - سجل اليوم وابدأ الطريق نحو مهنة تمريضية مُرضية مع IFAPP.</p>
            </div>
            <form ref={TargetForm}>
                <div>
                    <h1>التسجيل هنا</h1>
                </div>
                <div>
                    <input type='text' className='InputsStyle InputWith95' name='FirstName' placeholder='الاسم الأول'/>
                </div>
                <div>
                    <input type='text' className='InputsStyle InputWith95' name='LastName' placeholder='اسم العائلة'/>
                </div>
                <div>
                    <input type='text' className='InputsStyle InputWith97' name='Adress' placeholder='العنوان'/>
                </div>
                <div>
                    <input type='email' className='InputsStyle InputWith95' name='Email' placeholder='بريد إلكتروني'/>
                </div>
                <div>
                    <input type='tel' className='InputsStyle InputWith95' name='Tele' placeholder='رقم الهاتف'/>
                </div>
                <div>
                    <input type='text' className='InputsStyle InputWith97' name='AcademicLevel' placeholder='المستوى الدراسي'/>
                </div>
                <div>
                    <button id='register' onClick={Registring}>تسجيل</button>
                </div>
            </form>
        </section>
    </div>
  );
};;