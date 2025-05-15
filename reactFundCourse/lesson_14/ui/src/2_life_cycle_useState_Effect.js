import React, { useEffect, useState } from "react";

export default function App() {

    const [state1, setState1] = useState('');
    const [state2, setState2] = useState('');

    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        console.log(state1)
    }, [state1], {/*<-- [] คือ Dependendy list */})

    function ToggleText() {
        useEffect(() => {
            return () => {
                console.log("Unmounting...")
            }
        })

        return (
            <div>HIIIIII</div>
        )
    }

    return(
        <>
            {/*
                
                2. ควบคุม Life Cycle ของคอมโพแนนท์ด้วย useEffect

                useEffect(() => {
                    ...code
                }) ฟังก์ชันนี้คือ function ที่จะต้องรับ function เข้าไป
                 ฟังก์ชันนี้จะถูกรันโดย 1.ตอนที่มัน mount แล้ว 2.ตอนที่ state, property ของ
                 component เปลี่ยน และถ้าเราจะระบุ dependency list เข้าไป ,[fn1] 
                 ความหมายคือจะถูกรันแน่นอน 1 ครั้ง แล้วถ้ามีดารเรียกใช้อีกก็จะถูกรันอีกรอบ

                 แล้วถ้าใช้ แต่ไม่มีใส่ dependency list ก็แสดงว่าไม่มีตัวไหนต้อง monitor
                 หมายความว่าทุกครั้งถ้ามีการเปลี่ยนแปลง state ก็จะไม่ทำการรัน function นี้
                 //! ห้ามลืมว่ามันจะต้องรันแน่ๆ 1ครั้ง โดยการใส่ depen list เป็นค่าว่าง
                
            */}
            <input
            type="text"
            onChange={(event) => setState1(event.target.value)}
            />

            <div>Hi {state1}</div>

            <button 
            onClick={() => setIsOpened(!isOpened)}
            >
                HOLA!
            </button>
            
            {isOpened && <ToggleText></ToggleText>}
        </>
    );
}