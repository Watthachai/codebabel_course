# Golang API Course

## รายละเอียดคอร์ส

ภาษา Go (Golang) ถือเป็นหนึ่งในภาษาที่ได้รับความนิยมอย่างสูงในปัจจุบัน ด้วย Syntax ที่เรียบง่ายผนวกกับประสิทธิภาพที่สูง ทั้งยังเหมาะกับการสร้างแอพพลิเคชันที่หลากหลาย เช่น การสร้างบริการหรือเซอร์วิสแบบ RESTful API หรือความสามารถที่โดดเด่นในการทำ Microservices จึงไม่แปลกที่บริษัทขนาดใหญ่เลือกใช้ภาษา Go เช่น Google, Uber, Twitch และ SendGrid เป็นต้น

คอร์สนี้จัดทำขึ้นเพื่อสอนการใช้งานภาษา Go พร้อมทั้งใช้ภาษา Go เพื่อสร้างการทำงานกับ RESTful API โดยเนื้อหาของคอร์สแบ่งออกเป็นสองส่วน ส่วนแรกจะปูพื้นฐานการใช้งานภาษา Go ตั้งแต่ต้น ทั้งโครงสร้างข้อมูลที่มีอยู่แล้วในภาษา Go การนิยามชนิดข้อมูลใหม่ หลักการทำงานแบบขนานผ่าน Goroutines การจัดการข้อผิดพลาดของโปรแกรม การ Debug Code ในโปรแกรมผ่าน Visual Studio Code เป็นต้น

ครึ่งหลังของคอร์สจะนำเข้าสู่การใช้ภาษา Go เพื่อสร้างการทำงานกับ RESTful API โดยอาศัย Gin Framework อิงสถาปัตยกรรม MVC (Model-View-Controller) พร้อมทั้งทำการเชื่อมต่อฐานข้อมูลและผูกความสัมพันธ์ข้อมูลผ่าน GORM เรียนรู้การทำงานกับฟอร์มและการตรวจสอบข้อมูลในฟอร์ม (Form Validation) ก่อนการทำงาน รวมถึงการอัพโหลดไฟล์ผ่านฟอร์มด้วยเช่นกัน

นอกจากนี้คอร์สดังกล่าวยังได้สอนถึงการใช้ภาษา Go เพื่อทำ Authentication และ Authorization ผู้เรียนจะได้เรียนรู้หลักการของ JWT และการตรวจสอบสิทธิ์การเข้าถึงข้อมูล นั่นรวมถึงหลักการของ RBAC (Role-Based Access Control) ผ่าน Casbin เป็นต้น

## หมวดหมู่เนื้อหา

### [📁 Go Fundamentals](./documents/_introduction.md)

- [Unit 1: พื้นฐานการใช้งานภาษา Go](./documents/unit_1.md)
- [Unit 2: Array, Slice และ Map](./documents)
- [Unit 3: String, []byte และ Rune](./documents/unit-3/)
- [Unit 4: Structs, Interfaces และ Go Modules](./documents/unit-4/)
- [Unit 5: Defer, Errors, Panic และ Recover](./documents/unit-5/)
- [Unit 6: Goroutines](./documents/unit-6/)

### [📁 RESTful API Development](./documents/)

- [Unit 7: สร้าง RESTful API ด้วย Gin Framework](./documents/unit-7/)
- [Unit 8: การเชื่อมต่อฐานข้อมูลและใช้งาน GORM](./documents/unit-8/)
- [Unit 9: Authentication และ Authorization](./documents/unit-9/)
- [Unit 10: Production](./documents/unit-10/)

### [📁 Workshop Examples](./documents/)

- [บทความจัดการระบบ (Article Management System)](./documents/article-management/)
- [ตัวอย่าง API Endpoints](./documents/examples/)

### [📁 Updates & Resources](./resources/)

- [คอร์สอัพเดท](./resources/updates/)
- [เครื่องมือและทรัพยากร](./resources/tools/)

---

## 🚀 เริ่มต้นใช้งาน

1. Clone repository นี้
2. ติดตั้ง Go (version 1.19+)
3. ติดตั้ง dependencies ที่จำเป็น
4. ดู[คู่มือการเริ่มต้น](./getting-started.md)สำหรับรายละเอียดเพิ่มเติม

## 📚 เครื่องมือที่ใช้

- **Framework**: Gin
- **ORM**: GORM
- **Database**: PostgreSQL/MySQL
- **Authentication**: JWT
- **Authorization**: Casbin (RBAC)
- **Testing**: Postman/Thunder Client

## 📋 Prerequisites

- ความรู้พื้นฐานเกี่ยวกับการเขียนโปรแกรม
- ความเข้าใจพื้นฐานเกี่ยวกับ HTTP และ REST API
- ความรู้เบื้องต้นเกี่ยวกับฐานข้อมูล
