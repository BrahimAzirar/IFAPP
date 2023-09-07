import React from 'react';

export default function RegisterRequests({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>الاسم الأول</th>
          <th>اسم العائلة</th>
          <th>بريد إلكتروني</th>
          <th>رقم الهاتف</th>
          <th>العنوان</th>
          <th>المستوى الأكاديمي</th>
          <th>تاريخ التسجيل</th>
        </tr>
      </thead>
      <tbody>
        { data.map((ele, idx) => {
          return (
            <tr key={idx}>
              <td>{ ele.StudentId }</td>
              <td>{ ele.FirstName }</td>
              <td>{ ele.LastName }</td>
              <td>{ ele.Email }</td>
              <td>{ ele.Tele }</td>
              <td>{ ele.Adress }</td>
              <td>{ ele.AcademicLevel }</td>
              <td>{ ele.RegisteringDate }</td>
            </tr>
          );
        }) }
      </tbody>
    </table>
  );
};