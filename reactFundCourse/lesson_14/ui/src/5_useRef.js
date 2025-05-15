import React, { useRef } from "react";

export default function App() {
    const fileRef = useRef(null);

    return(
        <>
        {/*
        5. การเข้าถึงอีลีเมนต์ด้วย useRef
        พยายามหลีกเลี่ยงการใช้ useRef เพราะว่าการใช้งานจะต้องมีการเข้าถึง ref นั้นก่อน
        จะทำอะไรซักอย่าง ซึ่งมันจะผิดหลักการทำ Declairative style
         */}
        <input type="file"
        ref={fileRef}
        style={ {display:'none'} } />
        <button
        onClick={() => fileRef.current.click()}
        >
            Upload
        </button>
        </>
    )
}