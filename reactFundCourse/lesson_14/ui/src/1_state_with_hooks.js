import './App.css';

import React, { useState } from 'react';

/*
บทที่ 3 การใช้งาน React Hooks
1. จัดการ State component with useState
*/

function App() {
  /*
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  แบบนี้เป็นวิธีที่เข้าใจง่ายที่สุด แต่เราสามารถทำงาน refactor code ให้สั้นมากขึ้นโดย
  ตามวิธีด้านล่างนี้
  */

  const [name, setName] = useState({ firstName: '', lastName: '' })
  
  return (
    <div className="App">
      {/* Refactor #1
      <input type='text' 
      onChange={(event) => setName( { firstName:event.target.value, lastName: name.lastName } )}
      />

      <input type='text'
      onChange={(event) => setName( { lastName:event.target.value, firstName: name.lastName})}
      />
      
      การทำตามด้านบนนี้ ถ้าเรามีข้อมูลผู้ใช้งานเยอะๆ อาจจะทำให้ มีการเขียนตัว params
      ตามขำนวนที่เราสร้างขึ้น และทำให้โคดยาว โดยจะมีการเปลี่ยนใหม่ดังนี้
      โดยการทำ 
      //!Rest Operator ที่ใช้ ...ตามด้วยชื่อ param
      */}

      {/* Refactor #2 */}
      <input 
      type='text'
      onChange={(event) => setName( { ...name, firstName:event.target.value } )}
      />

      <input
      type='text'
      onChange={(event) => setName( { ...name, lastName:event.target.value } )}
      />

      <div>{name.firstName + ' ' + name.lastName}</div> 
    </div>
  );
}

export default App;
