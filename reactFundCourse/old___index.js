/* 
Deconstructuring Logic 

การเข้าถึงค่าภายในของ Object และ Array เพื่อดึงค่าที่สนใจออกมาใส่
ตัวแปรถือเป็นคุณสมบัติของการทำ Destructuring Assignment
*/
const watthachai = {
    name: "Watthachai",
}

const { name, sex: gender = "Male" } = watthachai;

console.log(name, gender)

/* OR */
const arr = [1, 2, 3]
const [{}, second] = arr

console.log(second);


/* 
Optional Chaining 

เราไม่สามารถเรียกเมธอดหรือพรอพเพอร์ตี้จาก null ได้ 
แต่เรามีวิธีตรวจสอบได้ว่าหากออบเจ็กต์เป็น null/undefeined 
จะคืน null และเรียกเมธอดหรือพรอพเพอร์ตี้ตามที่เราสนใจเมื่อไม่ใช่ 
null/undefined ผ่าน Optional Chaining
*/
const person = {
    age: 24,
    social: {
        facebook: 'Watthachai'
    }
}

console.log(person?.social?.facebook)


/*
Spread Operator

เป็นหลักการสำคัญที่นิยมใช้ในโลกของ React เพื่อกระจายค่าจาก Array 
หรือ Object เพื่อทำการสร้าง Array หรือ Object ใหม่จากข้อมูลเดิมที่มีอยู่
*/

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const arr3 = [ ...arr1, 9, ...arr2]

console.log(arr3);

console.log(Math.min(...arr3));


/*
Arrow Functions

อีกหนึ่งวิธีในการสร้างฟังก์ชันคือการใช้ Arrow Functions
 การใช้งานและการแปลงฟังก์ชันปกติเป็น Arrow Functions
 
 me: เคยใช้ใน TypeScript ยังไม่เคยใช้ใน JavaScript 55
 
 เท่าที่รู้ตอนนี้คือ TypeScript >>>
    SomeFunction() => {
        ...Code
    }
*/

/*
จาก
funtion foo(a) {
    return a 1;
}

สามารถ เขียนเป็น แบบนี้ได้เลย
const foo = a => a + 1;
*/

function getName(person) {
    return person.name
}

getName({
    name: 'EiEi',
    age: 24
})

//แปลงเป็น Arrow fn

const getNameConverted = ({ name }) => name

getNameConverted({
    name: 'EiEi',
    age: 24
})


/* Map and Filter 
map และ filter เพื่อที่จะทำการสร้างอาร์เรย์ชุดใหม่จากชุดอาร์เรย์ที่มีอยู่เดิม
*/

const mArr =[1, 2, 3, 4]

mArr.map(i => i * 2)

console.log(mArr) // [ 1, 2, 3, 4 ]

const res = mArr.map(i => i * 2)

console.log(res) // [ 2, 4, 6, 8 ]

//how to use filter is ....
const resFilter = mArr.filter(i => i % 2 === 0)
//Boolean but using map function
const resFilterBool = mArr.map(i => i % 2 === 0)

console.log(resFilter) // [2, 4]
console.log(resFilterBool) // [F, T, F, T]

/*
Short-Circuit Evaluation

ช่วยให้เข้าใจการทำงานกับ Boolean ให้มากขึ้นกับหลักการของ 
Short-Circuit Evaluation ผ่านตัวดำเนินการ and (&&)

เหมือนกับใน JS มันจะโยนตัวข้างหลังให้อัตโนมัติ ถ้าตัวข้างหน้าเป็นจริง
เช่น... console.log(true && true). จะได้ true
อีกตัวอย่างคือ console.log(true && 2) จะได้ 2

Tips. สามารถนำไปทำคำสั่ง Short เช่น กรณีอยากแสดงคำสั่ง Error
สามารถทำได้โดย somefunction ส่งกลับ hasError มา สามารถเขียน
hasError && <div>{errorMessage}</div> ได้เลย
*/



/*ES Module 
จากคลิปที่ 11 การจัดการโมดูลด้วย ES Module เนื่องจาก คลิปให้ติดตั้ง
ํyarn add esm และใน ไฟล์ package.json ตรง script
ให้เพิ่ม -r esm แต่ตอนนี้ node เวอร์ชันใหม่ มี import export ภายในตัว
จึงไม่จำเป็นให้เพิ่มแล้ว ผู้เรียนจึง เพิ่ม 
"type": "module"
ใน package.json แทน และไม่ใส่ -r esm แล้ว
เปลี่ยนการ import/exportจาก:
const [ชื่อฟังกชัน] = require('ชื่อโมดูล');

เป็น:
import [ชื่อฟังกชัน]หรือ * as ชื่อบ่างอย่างที่อยากตั้ง from 'ชื่อโมดูล';
*/

/*ก่อนหน้านี้
import { DEFAULT_COLOR } from "./dog.js"
import { DEFAULT_COLOR } from "./cat.js" //มันจะ err ตัวแปรชน
*/
import * as dog from './dog.js';
import * as cat from './cat.js';

console.log(dog.DEFAULT_COLOR);
console.log(cat.DEFAULT_COLOR);

//import Circle, { Pi } from './circle.js';
import Circle, * as circle from './circle.js';

console.log(Circle, circle.Pi)

/*
จัดการ Asynchronous ด้วย async/await

Tips. code synchronous จะทำงานก่อนเสมอ 
เช่น setTimeout(() => console.log(1), 0);
console.log(2);

result =>
    2
    0

    มันจะทำงานก่อนเสมอ จนกว่าจะเสร็จแล้วไปทำ await
*/

import axios from 'axios';

async function getPosts() {
    const url_temp = "https://jsonplaceholder.typicode.com/posts";
    
    const result = await axios.get(url_temp+"?id=2");
    console.log(result.data);

    //API WITH AXIOS
    try {
        const resultAPI = await axios.get(
            url_temp+"sss"
        );

        console.log(result.statusText)
    } catch (error) {
        console.log(error.response.statusText)
    }
}

getPosts();