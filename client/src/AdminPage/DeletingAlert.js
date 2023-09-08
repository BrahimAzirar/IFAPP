import React from 'react';
import axios from 'axios';
import { GiCancel } from 'react-icons/gi';

export default function DeletingAlert({ callback, targets }) {

  const apidomain = process.env.REACT_APP_API_DOMIAN;

  const DeleteItems = async () => {
    try {
      const result = await axios.post(`${apidomain}/admin/DelteRequests`, targets);
      if (result.err) throw new Error(result.err);
      if (targets.length) {
        callback.setRequests(prev => prev.filter(ele => targets.includes(ele.StudentId)));
        callback.setShowDeletingAlert(false);
      }
    } catch (error) {
      alert(error.message);
    };
  };

  return (
    <div id='DeletingAlert'>
      <div onClick={() => callback.setShowDeletingAlert(false)}> <GiCancel /> </div>
      <p>هل انت متأكد من حذف هذه العناصر</p>
      <button onClick={DeleteItems}>نعم</button>
    </div>
  );
};