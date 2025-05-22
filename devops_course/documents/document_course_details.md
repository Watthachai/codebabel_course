# DevOps - คู่มือฉบับเข้าใจง่าย

## DevOps คืออะไร

DevOps เป็นคำที่มาจาก "Development" และ "Operations" เป็นแนวคิดที่รวมทีมพัฒนาซอฟต์แวร์และทีม IT operations เข้าด้วยกัน โดยมีจุดมุ่งหมายเพื่อ:

- พัฒนาและส่งมอบซอฟต์แวร์ได้รวดเร็วขึ้น
- เพิ่มความน่าเชื่อถือของระบบ
- สร้างการทำงานร่วมกันระหว่างทีมที่เคยแยกกันอยู่

หัวใจของ DevOps คือการทำงานร่วมกันแบบบูรณาการและการอัตโนมัติ เพื่อให้สามารถตอบสนองต่อความต้องการของลูกค้าได้อย่างรวดเร็วและมีประสิทธิภาพมากขึ้น

## 1. ลักษณะสำคัญของ DevOps

### การรวมตัว (Unification)
- รวมคน กระบวนการ และเทคโนโลยีเข้าด้วยกัน
- มุ่งเน้นการส่งมอบคุณค่าให้ลูกค้าอย่างต่อเนื่อง

### การทำงานร่วมกัน (Collaboration)
- ทำลายกำแพงระหว่างทีมพัฒนา ทีมปฏิบัติการ ทีมควบคุมคุณภาพ และทีมความปลอดภัย
- ทุกคนทำงานร่วมกันเพื่อเป้าหมายเดียวกัน

### การทำงานอัตโนมัติ (Automation)
- ลดงานที่ต้องทำซ้ำๆ ด้วยการอัตโนมัติ
- ช่วยลดความผิดพลาดจากมนุษย์
- เพิ่มความเร็วในการส่งมอบ

### ผลกระทบต่อวงจรชีวิตของแอปพลิเคชัน (Lifecycle Influence)
- ครอบคลุมตั้งแต่การวางแผน พัฒนา ทดสอบ ส่งมอบ ไปจนถึงการดูแลระบบ
- ทำให้สามารถตอบสนองความต้องการของลูกค้าได้รวดเร็วขึ้น

## 2. DevOps Infinity Loop

DevOps Infinity Loop เป็นแนวคิดที่แสดงถึงกระบวนการทำงานแบบต่อเนื่องไม่มีที่สิ้นสุด ประกอบด้วย:

### 1. การวางแผน (Plan)
- กำหนดความต้องการของโครงการ
- ระบุขอบเขตและวัตถุประสงค์

### 2. การพัฒนา (Develop)
- ทีมพัฒนาเขียนโค้ดตามความต้องการ
- ทำงานร่วมกับผู้มีส่วนได้ส่วนเสียอื่นๆ

### 3. การทดสอบ (Test)
- ตรวจสอบคุณภาพและความถูกต้องของซอฟต์แวร์
- ทดสอบระบบในหลายระดับ

### 4. การปรับใช้ (Deploy)
- นำซอฟต์แวร์ที่ผ่านการทดสอบไปใช้งานจริง
- จัดการการเปลี่ยนแปลงอย่างมีประสิทธิภาพ

### 5. การตรวจสอบ (Monitor)
- เฝ้าดูประสิทธิภาพระบบในสภาพแวดล้อมจริง
- เก็บข้อมูลเพื่อการปรับปรุงต่อไป

วงจรนี้จะดำเนินไปอย่างต่อเนื่อง ทำให้ระบบได้รับการพัฒนาและปรับปรุงอยู่เสมอ

## 3. คำศัพท์ DevOps ที่ควรทราบ

### Continuous Integration (CI)
- การรวมโค้ดจากนักพัฒนาหลายคนเข้าด้วยกันอย่างสม่ำเสมอ
- มีการ build และทดสอบโดยอัตโนมัติหลังการรวมโค้ด
- ช่วยค้นพบปัญหาได้เร็วขึ้น

### Continuous Delivery (CD)
- การส่งมอบซอฟต์แวร์ใหม่ได้อย่างรวดเร็วด้วยขั้นตอนอัตโนมัติ
- ทำให้มั่นใจได้ว่าซอฟต์แวร์พร้อมสำหรับการปล่อยใช้งานเสมอ

### Infrastructure as Code (IaC)
- จัดการโครงสร้างพื้นฐานในรูปแบบของโค้ด
- ทำให้การสร้างและจัดการเซิร์ฟเวอร์เป็นแบบอัตโนมัติ
- ลดความผิดพลาดจากการตั้งค่าด้วยมือ

### Configuration as Code (CaC)
- จัดเก็บการตั้งค่าต่างๆ ในรูปแบบโค้ด
- มีการควบคุมเวอร์ชันของการตั้งค่า

### Monitoring and Logging
- การตรวจสอบสถานะของระบบแบบเรียลไทม์
- การเก็บบันทึกข้อมูลเพื่อวิเคราะห์ประสิทธิภาพและแก้ไขปัญหา

## 4. ประโยชน์ของ DevOps

- **เพิ่มความเร็วในการส่งมอบ**: พัฒนาและปล่อยซอฟต์แวร์ได้เร็วขึ้น
- **เพิ่มคุณภาพของผลิตภัณฑ์**: ลดข้อผิดพลาดด้วยการทดสอบอัตโนมัติ
- **ลดต้นทุน**: ลดเวลาและทรัพยากรที่ใช้ในการแก้ไขปัญหา
- **เพิ่มความพึงพอใจของลูกค้า**: ตอบสนองความต้องการได้รวดเร็วขึ้น
- **ปรับปรุงการทำงานร่วมกัน**: ทีมต่างๆ ทำงานร่วมกันได้ดีขึ้น

## 5. DevSecOps

DevSecOps คือการนำความปลอดภัย (Security) มาผสานเข้ากับ DevOps โดย:

- รวมการรักษาความปลอดภัยเข้าไปในทุกขั้นตอนของการพัฒนา
- ทุกคนในทีมมีความรับผิดชอบร่วมกันในด้านความปลอดภัย
- ลดความเสี่ยงจากช่องโหว่ด้านความปลอดภัย
- ไม่ทำให้กระบวนการพัฒนาช้าลง

DevSecOps ทำให้ซอฟต์แวร์มีความปลอดภัยตั้งแต่เริ่มต้น ไม่ใช่คิดเรื่องความปลอดภัยทีหลัง

## 6. IT แบบดั้งเดิม VS DevOps

| ประเด็น | IT แบบดั้งเดิม | DevOps |
|--------|--------------|--------|
| **การวางแผน** | ทำงานตามลำดับขั้นตอนแบบ Waterfall | ทำงานแบบ Agile, ปรับเปลี่ยนได้ตามความต้องการ |
| **วงรอบการทำงาน** | ยาวนาน มีการวางแผนล่วงหน้า | สั้น รวดเร็ว มีการส่งมอบบ่อยครั้ง |
| **โครงสร้างทีม** | แบ่งเป็นฝ่ายตามความสามารถ | ทีมแบบบูรณาการที่มีหลายทักษะ |
| **การจัดการเวลา** | เน้นแก้ไขปัญหา | เน้นป้องกันปัญหาและการอัตโนมัติ |
| **วัฒนธรรม** | ทีมต่างๆ มีเป้าหมายแยกกัน | ทีมทั้งหมดมีเป้าหมายเดียวกัน |
| **ความคล่องตัว** | จำกัด เปลี่ยนแปลงยาก | ยืดหยุ่น ปรับตัวได้รวดเร็ว |

สรุป: DevOps ทำให้องค์กรมีความคล่องตัว รวดเร็ว และสามารถปรับตัวได้ดีกว่าในโลกเทคโนโลยีที่เปลี่ยนแปลงอย่างรวดเร็ว

## 7. การทำงานแบบ Agile ใน DevOps

DevOps มักใช้การทำงานแบบ Agile ซึ่งมีลักษณะสำคัญดังนี้:

### Sprint Cycles (รอบการทำงาน)
- **ความยาวของ Sprint**: โดยทั่วไปใช้เวลา 1-4 สัปดาห์ (มักนิยมใช้ 2 สัปดาห์)
- **Sprint Planning**: ใช้เวลาประมาณ 2-4 ชั่วโมงสำหรับ Sprint 2 สัปดาห์
- **Daily Standup**: การประชุมสั้นๆ ทุกวัน (ประมาณ 15 นาที) เพื่อรายงานความคืบหน้า
- **Sprint Review**: ใช้เวลาประมาณ 1-2 ชั่วโมงเพื่อนำเสนอผลงานที่ทำเสร็จ
- **Sprint Retrospective**: ประมาณ 1-1.5 ชั่วโมงเพื่อวิเคราะห์สิ่งที่ดีและสิ่งที่ควรปรับปรุง

### ตัวอย่างการทำงานใน Sprint
- **วันที่ 1**: Sprint Planning - ทีมเลือกงานที่จะทำใน Sprint นี้
- **วันที่ 2-9**: พัฒนา ทดสอบ และทำ CI/CD ไปพร้อมกัน มีการ Daily Standup ทุกวัน
- **วันที่ 10**: เตรียม Sprint Review และทำการทดสอบขั้นสุดท้าย
- **วันที่ 11**: Sprint Review และ Retrospective
- **วันที่ 12**: เตรียมการสำหรับ Sprint ถัดไป

### ความแตกต่างจากแบบดั้งเดิม
- **แบบดั้งเดิม**: วางแผนครั้งเดียว พัฒนา 3-6 เดือน ทดสอบ 1-2 เดือน ก่อนส่งมอบ
- **แบบ DevOps**: วางแผน พัฒนา ทดสอบ และส่งมอบตลอด Sprint 1-4 สัปดาห์ ทำซ้ำอย่างต่อเนื่อง

### ตัวชี้วัดประสิทธิภาพ (KPIs) ที่นิยมใช้
- **Deployment Frequency**: ความถี่ในการ Deploy (เช่น หลายครั้งต่อวัน หรือ 2-3 ครั้งต่อ Sprint)
- **Lead Time**: เวลาที่ใช้ตั้งแต่เริ่มพัฒนาจนถึงการ Deploy (เช่น 1-3 วัน)
- **Mean Time to Recovery**: เวลาเฉลี่ยในการกู้คืนระบบเมื่อเกิดปัญหา (เช่น น้อยกว่า 1 ชั่วโมง)
- **Change Failure Rate**: อัตราการ Deploy ที่ล้มเหลว (เช่น น้อยกว่า 15%)

# เทคโนโลยี Cloud Computing

## Cloud Computing คืออะไร

Cloud Computing หรือการประมวลผลแบบกลุ่มเมฆ คือการใช้ทรัพยากรคอมพิวเตอร์ผ่านอินเทอร์เน็ต โดยไม่ต้องติดตั้งหรือจัดการฮาร์ดแวร์เอง เปรียบเสมือนการ "เช่าใช้" แทนที่จะ "ซื้อ" ทรัพยากรเหล่านี้

ทรัพยากรที่สามารถใช้งานได้ผ่าน Cloud:
- เซิร์ฟเวอร์
- พื้นที่เก็บข้อมูล
- ฐานข้อมูล
- เครือข่าย
- ซอฟต์แวร์
- บริการด้าน AI และ ML
- และอื่นๆ อีกมากมาย

### ข้อดีของ Cloud Computing:
- **จ่ายตามการใช้งาน** (Pay-as-you-go) จ่ายเฉพาะทรัพยากรที่ใช้จริง
- **ลดต้นทุน** ไม่ต้องลงทุนซื้อฮาร์ดแวร์ราคาสูง
- **ยืดหยุ่น** ปรับขนาดทรัพยากรได้ตามความต้องการ
- **เข้าถึงได้ทุกที่** ใช้งานได้จากทุกที่ที่มีอินเทอร์เน็ต

## ประเภทของ Cloud Computing

### 1. Infrastructure as a Service (IaaS)
เป็นการให้บริการโครงสร้างพื้นฐานคอมพิวเตอร์ขั้นพื้นฐาน

**ตัวอย่าง:** Amazon EC2, Google Compute Engine, Microsoft Azure VMs

**คุณจะได้รับ:**
- เซิร์ฟเวอร์เสมือน
- พื้นที่จัดเก็บข้อมูล
- เครือข่าย

**คุณต้องจัดการเอง:**
- ระบบปฏิบัติการ
- ซอฟต์แวร์กลาง (Middleware)
- แอปพลิเคชันและข้อมูล

### 2. Platform as a Service (PaaS)
ให้บริการแพลตฟอร์มสำหรับพัฒนาแอปพลิเคชัน

**ตัวอย่าง:** Google App Engine, AWS Elastic Beanstalk, Heroku

**คุณจะได้รับ:**
- ทุกอย่างจาก IaaS
- ระบบปฏิบัติการ
- ซอฟต์แวร์กลาง
- เครื่องมือพัฒนา
- บริการฐานข้อมูล

**คุณต้องจัดการเอง:**
- แอปพลิเคชันและข้อมูล

### 3. Software as a Service (SaaS)
ให้บริการซอฟต์แวร์สำเร็จรูปพร้อมใช้งาน

**ตัวอย่าง:** Google Workspace, Microsoft Office 365, Salesforce

**คุณจะได้รับ:**
- ซอฟต์แวร์ที่พร้อมใช้งานทันที
- ไม่ต้องติดตั้งหรือดูแลรักษา
- เข้าถึงผ่านเว็บเบราว์เซอร์หรือแอพ

## ประโยชน์ที่ได้รับจากการใช้งาน Cloud Computing

### 💰 ลดค่าใช้จ่ายด้าน IT
- ลดการลงทุนในอุปกรณ์ฮาร์ดแวร์ราคาแพง
- ลดค่าใช้จ่ายในการจ้างทีม IT จำนวนมาก
- จ่ายเฉพาะสิ่งที่ใช้จริง

### 🌿 ส่งเสริมความยั่งยืน
- ใช้ทรัพยากรร่วมกัน (Shared Resources)
- ลด Carbon Footprint
- ประหยัดพลังงาน

### ⚡ เพิ่มประสิทธิภาพการทำงาน
- เข้าถึงเทคโนโลยีล่าสุดได้ตลอดเวลา
- ทำงานได้จากทุกที่
- เพิ่มความร่วมมือในทีม

### 🔒 เพิ่มความปลอดภัย
- มีระบบรักษาความปลอดภัยระดับมืออาชีพ
- การสำรองข้อมูลอัตโนมัติ
- การอัปเดตความปลอดภัยสม่ำเสมอ

### 📈 มีความยืดหยุ่นในการขยายตัว
- ปรับขนาดได้ทันทีเมื่อต้องการ (Scale up/down)
- รองรับการเติบโตของธุรกิจโดยไม่ต้องวางแผนล่วงหน้านาน
- ทดลองไอเดียใหม่ได้อย่างรวดเร็ว

### 🚀 เข้าถึงเทคโนโลยีใหม่ๆ อยู่เสมอ
- อัปเดตอัตโนมัติ
- ใช้งานเทคโนโลยีล่าสุดได้โดยไม่ต้องอัปเกรดฮาร์ดแวร์

### 💯 ความน่าเชื่อถือ
- ข้อตกลงระดับการให้บริการ (SLAs) ที่รับประกันเวลาให้บริการ
- ระบบสำรองที่มีประสิทธิภาพ
- การกระจายข้อมูลไปยังหลายศูนย์ข้อมูล

## ผู้ให้บริการ Cloud Computing ชั้นนำ

### Amazon Web Services (AWS)
บริการคลาวด์ที่ใหญ่ที่สุดในโลก มีบริการมากกว่า 200 บริการ

**บริการยอดนิยม:**
- **EC2**: เซิร์ฟเวอร์เสมือน
- **S3**: พื้นที่เก็บข้อมูลแบบ Object Storage
- **Lambda**: Serverless Computing
- **EKS**: บริการ Kubernetes แบบมีการจัดการ
- **Redshift**: คลังข้อมูลขนาดใหญ่ (Data Warehouse)
- **SageMaker**: แพลตฟอร์ม Machine Learning

### Google Cloud Platform (GCP)
จุดแข็งด้าน Big Data, AI และ Machine Learning

**บริการยอดนิยม:**
- **Compute Engine**: เซิร์ฟเวอร์เสมือน
- **BigQuery**: วิเคราะห์ข้อมูลขนาดใหญ่
- **Cloud Storage**: พื้นที่เก็บข้อมูล
- **Kubernetes Engine**: บริการ Kubernetes

### Microsoft Azure
บูรณาการกับระบบนิเวศของ Microsoft ได้อย่างดี

**บริการยอดนิยม:**
- **Azure Virtual Machines**: เซิร์ฟเวอร์เสมือน
- **Azure SQL Database**: ฐานข้อมูล SQL
- **Azure Functions**: Serverless Computing
- **Azure DevOps**: เครื่องมือพัฒนาซอฟต์แวร์

### Oracle Cloud
เน้นแอปพลิเคชันและฐานข้อมูลระดับองค์กร

## Cloud Native คืออะไร

Cloud Native คือแนวทางการออกแบบและพัฒนาแอปพลิเคชันที่ใช้ประโยชน์จาก Cloud Computing อย่างเต็มที่

### คุณลักษณะสำคัญของ Cloud Native:

#### 🔄 ไมโครเซอร์วิส (Microservices)
แทนที่จะสร้างแอปพลิเคชันขนาดใหญ่เพียงตัวเดียว เราแบ่งเป็นบริการย่อยๆ หลายตัวที่ทำงานร่วมกัน
- ทำให้พัฒนาและปรับปรุงแต่ละส่วนได้อย่างอิสระ
- ง่ายต่อการปรับขนาดเฉพาะส่วนที่ต้องการ
- ทีมสามารถทำงานได้อย่างอิสระในแต่ละส่วน

#### 📦 คอนเทนเนอร์ (Containers)
แพ็กเกจซอฟต์แวร์ที่รวมโค้ดและการตั้งค่าทั้งหมดไว้ด้วยกัน
- ทำงานได้เหมือนกันในทุกสภาพแวดล้อม
- เบาและเร็วกว่าเครื่องเสมือน (Virtual Machines)
- เทคโนโลยียอดนิยม: Docker, containerd

#### 🎮 การจัดการคอนเทนเนอร์อัตโนมัติ (Container Orchestration)
เครื่องมือที่ช่วยจัดการคอนเทนเนอร์จำนวนมาก
- บริหารจัดการการปรับขนาดอัตโนมัติ
- จัดการการกระจายโหลด
- ตรวจสอบสถานะและฟื้นฟูอัตโนมัติ
- เทคโนโลยียอดนิยม: Kubernetes, Docker Swarm

#### 🔄 CI/CD (Continuous Integration/Continuous Delivery)
กระบวนการอัตโนมัติสำหรับการทดสอบและปรับใช้ซอฟต์แวร์
- ส่งมอบซอฟต์แวร์อย่างต่อเนื่องและรวดเร็ว
- ตรวจจับข้อผิดพลาดได้เร็วขึ้น
- เครื่องมือยอดนิยม: Jenkins, GitHub Actions, GitLab CI/CD

#### 📊 การตรวจสอบและการเฝ้าติดตาม (Monitoring & Observability)
ระบบเฝ้าติดตามที่ครอบคลุม
- ติดตามประสิทธิภาพแบบเรียลไทม์
- วิเคราะห์ปัญหาได้รวดเร็ว
- เครื่องมือยอดนิยม: Prometheus, Grafana, ELK Stack

## ความสัมพันธ์ระหว่าง Cloud Computing กับ DevOps

Cloud Computing และ DevOps เป็นสองแนวคิดที่เสริมซึ่งกันและกันอย่างสมบูรณ์

### Cloud Computing เสริม DevOps โดย:
- **การจัดหาทรัพยากรอัตโนมัติ**: สร้างสภาพแวดล้อมได้ในไม่กี่นาที
- **มาตรฐานที่สอดคล้องกัน**: ทุกสภาพแวดล้อมเหมือนกัน (dev, test, production)
- **เครื่องมือบูรณาการ**: บริการ CI/CD และการตรวจสอบมีให้แบบในตัว
- **ความยืดหยุ่นสูง**: ปรับเปลี่ยนทรัพยากรได้ตามความต้องการ

### DevOps เสริม Cloud Computing โดย:
- **การทำงานร่วมกัน**: ทีมพัฒนาและปฏิบัติการทำงานร่วมกันอย่างใกล้ชิด
- **การปรับใช้อัตโนมัติ**: กระบวนการปรับใช้ที่รวดเร็วและเชื่อถือได้
- **Infrastructure as Code**: กำหนดโครงสร้างพื้นฐานด้วยโค้ด
- **การตอบสนองที่รวดเร็ว**: แก้ไขปัญหาและปรับใช้การเปลี่ยนแปลงได้อย่างรวดเร็ว

### ผลลัพธ์ของการใช้ Cloud Computing กับ DevOps ร่วมกัน:
- **เวลาสู่ตลาดที่เร็วขึ้น**: พัฒนาและส่งมอบผลิตภัณฑ์ได้เร็วขึ้น
- **ความน่าเชื่อถือที่สูงขึ้น**: ลดข้อผิดพลาดและเวลาหยุดทำงาน
- **การปรับขนาดที่มีประสิทธิภาพ**: รองรับการเติบโตได้โดยไม่สะดุด
- **การตอบสนองต่อตลาดที่ดีขึ้น**: ปรับตัวตามความต้องการของลูกค้าได้รวดเร็ว

# Microservices คืออะไร

## เปรียบเทียบแบบ Monolithic กับ Microservices

### แบบ Monolithic
การออกแบบแอปพลิเคชันแบบ Monolithic นั้นจะรวมศูนย์ทุกฟีเจอร์เข้าเป็นโปรแกรมเดียว โดยทั้งแอปพลิเคชันจะมีการใช้งานฐานข้อมูลร่วมกัน

![Monolithic vs Microservices Architecture](https://miro.medium.com/v2/resize:fit:1400/1*Un9W-mw18NLtuQdsBNytJQ.png)

#### ข้อดีของ Monolithic
- ✅ **ง่ายต่อการพัฒนา** - ทีมสามารถทำงานในโค้ดเบสเดียวกัน
- ✅ **ง่ายต่อการแก้ไขหรือเปลี่ยนแหปลง** - การเปลี่ยนแปลงสามารถทำได้ทั่วทั้งแอพพลิเคชัน
- ✅ **ทดสอบง่าย** - การทดสอบทำได้ตรงไปตรงมา เพราะทุกอย่างอยู่ในแอพเดียวกัน
- ✅ **Deploy ง่าย** - การ deploy ทำเพียงครั้งเดียว
- ✅ **Scale ง่าย (แต่ไม่มีประสิทธิภาพ)** - เพียงเพิ่มจำนวนเซิร์ฟเวอร์

#### ข้อเสียของ Monolithic
- ❌ **ผูกติดกับภาษาโปรแกรม** - ต้องใช้ภาษาเดียวกันทั้งระบบ
- ❌ **ยุ่งยากในการพัฒนาเป็นทีม** - ทีมต่างๆ ต้องทำงานบน codebase เดียวกัน เกิดการก้าวก่ายกันได้ง่าย
- ❌ **Deploy ช้า** - ต้อง deploy ทั้งแอพแม้แก้ไขเพียงเล็กน้อย
- ❌ **Scale ไม่มีประสิทธิภาพ** - ต้องสำเนาทั้งแอพแม้ต้องการ scale เพียงส่วนเดียว

![Horizontal Scaling ของ Monolithic](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/images/n-tier-logical.svg)

## 1. Microservices คืออะไร?

Microservices เป็นสถาปัตยกรรมที่แบ่งระบบออกเป็นบริการย่อยๆ หลายส่วน แต่ละส่วนทำงานอิสระต่อกันและสื่อสารกันผ่าน API ซึ่งสอดคล้องกับหลักการของ Cloud Native

![Microservices Architecture](https://d1.awsstatic.com/Developer%20Marketing/containers/monolith_1-monolith-microservices.70b547e30e30b013051d58a93a6e35e77408a2a8.png)

## 2. ลักษณะพื้นฐานของ Microservices

### 🔄 Autonomy (ความเป็นอิสระ)
- แต่ละเซอร์วิสพัฒนาได้อย่างอิสระ
- ทีมแยกการพัฒนาตามโดเมนของธุรกิจ (เช่น User, Order, Payment)
- สามารถ deploy หรือ scale แต่ละเซอร์วิสได้โดยไม่กระทบกัน

![Microservices Scaling](https://miro.medium.com/v2/resize:fit:814/1*kJwD0kMDHx9ZjZEHeKr8yg.png)

### 🎯 Specialization (ความเชี่ยวชาญเฉพาะด้าน)
- แต่ละเซอร์วิสถูกออกแบบตาม Business Capability
- มุ่งเน้นแก้ปัญหาทางธุรกิจแบบเฉพาะเจาะจง

### ⚡ Agility (ความคล่องตัว)
- ทีมขนาดเล็กดูแลแต่ละเซอร์วิส
- พัฒนาและปรับเปลี่ยนได้รวดเร็ว

### 📊 Flexible Scaling (การปรับขนาดที่ยืดหยุ่น)
- Scale เฉพาะเซอร์วิสที่ต้องการได้
- ประหยัดทรัพยากรเพราะไม่ต้อง scale ทั้งระบบ

## 3. API Gateway คืออะไร?

API Gateway ทำหน้าที่เป็นประตูหน้าบ้านของระบบ Microservices ช่วยจัดการการเข้าถึงจากภายนอก

### ปัญหาที่เกิดขึ้นหากไม่มี API Gateway:
การเข้าถึงเซอร์วิสต่างๆ โดยตรงจากภายนอกจะเปิดเผยโครงสร้างภายในมากเกินไป และทำให้ผู้ใช้ต้องจดจำ endpoint ของแต่ละเซอร์วิส

### ประโยชน์ของ API Gateway:
- ซ่อนรายละเอียดโครงสร้างภายในจากผู้ใช้ภายนอก
- จัดการการเรียกใช้งานผ่านจุดเดียว
- สามารถเพิ่มฟังก์ชันเช่น การตรวจสอบสิทธิ์, rate limiting, caching

![API Gateway](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/architect-microservice-container-applications/media/direct-client-to-microservice-communication-versus-the-api-gateway-pattern/custom-service-api-gateway.png)

## 4. การสื่อสารระหว่างเซอร์วิส

### 4.1 การสื่อสารแบบ Synchronous Messages
การสื่อสารที่ต้องรอผลลัพธ์กลับมาทันที เช่น HTTP/REST, GraphQL, gRPC

![Synchronous Messages](https://www.babelcoder.com/tmp/courses/images/devops-quickstart-classroom/synchronous-communication.png)

**ข้อดี:** ง่ายต่อการเข้าใจ, ข้อมูลตอบกลับทันที
**ข้อเสีย:** ทำให้ระบบผูกติดกัน, หากเซอร์วิสหนึ่งล่าช้าส่งผลให้ทั้งระบบล่าช้า

### 4.2 การสื่อสารแบบ Asynchronous Messages
การสื่อสารโดยไม่ต้องรอผลลัพธ์ทันที โดยใช้ Message Broker เช่น RabbitMQ, Kafka

![Asynchronous Messages](https://www.babelcoder.com/tmp/courses/images/devops-quickstart-classroom/asynchronous-messages.png)

**ข้อดี:** เซอร์วิสทำงานอิสระต่อกัน, ทนต่อความล้มเหลว, รองรับปริมาณงานสูง
**ข้อเสีย:** ซับซ้อนกว่า, ต้องจัดการกับความสอดคล้องของข้อมูล

### 4.3 เมื่อไหร่ควรใช้การสื่อสารแบบใด?

#### 🔄 ใช้ Synchronous เมื่อ:
- ต้องการผลลัพธ์ทันทีเพื่อดำเนินการต่อ
- ต้องการข้อมูลแบบ Real-time
- เซอร์วิสมีเวลาตอบสนองรวดเร็ว

#### 📨 ใช้ Asynchronous เมื่อ:
- งานสามารถทำเสร็จในภายหลังได้ (เช่น ส่งอีเมลยืนยัน)
- เซอร์วิสใช้เวลาประมวลผลนาน
- ต้องการความยืดหยุ่นในการจัดการความล้มเหลว

## 5. Saga Pattern - การรักษาความสอดคล้องของข้อมูล

### ปัญหาความสอดคล้องของข้อมูลใน Microservices
ใน Monolithic ข้อมูลถูกจัดการในฐานข้อมูลเดียว ทำให้รักษาความสอดคล้องได้ง่าย แต่ใน Microservices แต่ละเซอร์วิสมีฐานข้อมูลแยกกัน ทำให้เกิดความท้าทาย

### Saga Pattern คืออะไร?
Saga Pattern เป็นรูปแบบการจัดการ distributed transaction โดยแบ่งเป็นหลายขั้นตอนย่อยๆ พร้อมกลไกการย้อนกลับเมื่อเกิดข้อผิดพลาด

### 5.1 Choreography-based Saga
แต่ละเซอร์วิสจัดการกับเหตุการณ์และส่งต่อเหตุการณ์ใหม่ไปยังเซอร์วิสอื่นๆ โดยไม่มีตัวกลาง

![Choreography-based Saga](https://miro.medium.com/v2/resize:fit:1400/1*ZDszFKdY4MFLJN9z7uA7LA.png)

**ข้อดี:** กระจายความรับผิดชอบ, ไม่มีจุดล้มเหลวจุดเดียว
**ข้อเสีย:** ติดตามกระบวนการยาก, เพิ่มความซับซ้อนในแต่ละเซอร์วิส

### 5.2 Orchestration-based Saga
มีเซอร์วิสหลัก (Orchestrator) ทำหน้าที่ควบคุมขั้นตอนทั้งหมด

![Orchestration-based Saga](https://microservices.io/i/data/saga.jpg)

**ข้อดี:** ติดตามกระบวนการง่าย, ตรรกะการทำงานอยู่ที่เดียว
**ข้อเสีย:** Orchestrator อาจเป็นจุดคอขวด

## 6. Compensating Transactions - กลไกย้อนกลับเมื่อเกิดข้อผิดพลาด

เมื่อขั้นตอนใดเกิดข้อผิดพลาด ระบบต้องสามารถย้อนกลับการเปลี่ยนแปลงที่เกิดขึ้นก่อนหน้านี้ได้

![Compensating Transactions](https://learn.microsoft.com/en-us/azure/architecture/patterns/_images/compensating-transaction-diagram.png)

### ตัวอย่างการจัดการ Rollback ในกรณีสั่งซื้อสินค้า:
1. สร้างคำสั่งซื้อ (Order created)
2. ตรวจสอบสินค้าคงคลัง (Stock checked) - **เกิดข้อผิดพลาด!**
3. ระบบต้องทำการย้อนกลับ:
    - ยกเลิกคำสั่งซื้อที่สร้างไว้ (Compensating transaction)

### ข้อควรระวัง:
- ต้องออกแบบ Compensating Transaction สำหรับทุกขั้นตอน
- บางครั้งไม่สามารถย้อนกลับได้สมบูรณ์ (เช่น การส่งอีเมล) ต้องมีกลไกบันทึกและแจ้งเตือน
- ควรมีระบบติดตามสถานะธุรกรรม (Transaction monitoring)

## สรุป
Microservices เป็นสถาปัตยกรรมที่ช่วยให้ระบบมีความยืดหยุ่น พัฒนาได้รวดเร็ว และ scale ได้อย่างมีประสิทธิภาพ แต่ต้องแลกกับความซับซ้อนในการจัดการการสื่อสารและความสอดคล้องของข้อมูล ซึ่ง Pattern และเทคนิคต่างๆ ที่กล่าวมาช่วยแก้ปัญหาเหล่านี้ได้

# Docker - คู่มืออ้างอิงฉบับพื้นฐาน

## สารบัญ
- [1. เข้าใจเทคโนโลยีคอนเทนเนอร์](#1-เข้าใจเทคโนโลยีคอนเทนเนอร์)
- [2. ประวัติย่อของเทคโนโลยีคอนเทนเนอร์](#2-ประวัติย่อของเทคโนโลยีคอนเทนเนอร์)
- [3. การทำงานพื้นฐานของ Docker](#3-การทำงานพื้นฐานของ-docker)
- [4. การใช้งาน Docker Compose](#4-การใช้งาน-docker-compose)
- [5. การสร้าง Docker Images](#5-การสร้าง-docker-images)
- [6. การเผยแพร่ Docker Images](#6-การเผยแพร่-docker-images)
- [7. คำสั่งพื้นฐานที่ควรรู้](#7-คำสั่งพื้นฐานที่ควรรู้)

## 1. เข้าใจเทคโนโลยีคอนเทนเนอร์

### คอนเทนเนอร์คืออะไร?
คอนเทนเนอร์เป็นวิธีห่อหุ้มแอปพลิเคชันพร้อมไลบรารีและทรัพยากรที่จำเป็นทั้งหมด เพื่อให้แอปทำงานได้อย่างแยกอิสระจากระบบอื่นๆ คอนเทนเนอร์ใช้ทรัพยากรน้อยกว่า VM และมีความพร้อมใช้งานที่หลากหลายสภาพแวดล้อม

### ปัญหาที่คอนเทนเนอร์แก้ไข
เมื่อเราต้องรันแอปพลิเคชันที่ต้องการไลบรารีเวอร์ชันต่างกัน เช่น:

```
แอป A ต้องการ glibc เวอร์ชัน 2.28
แอป B ต้องการ glibc เวอร์ชัน 2.31
```

เราไม่สามารถรันทั้งสองแอปพร้อมกันได้บนระบบปฏิบัติการเดียว เนื่องจากระบบสามารถมี glibc เพียงเวอร์ชันเดียว

### วิธีแก้ไขแบบดั้งเดิม: Virtual Machines (VMs)
เราสามารถสร้าง VM หลายตัว โดยแต่ละตัวมีชุดของระบบปฏิบัติการแยกกัน

**ข้อเสีย**: VMs ใช้ทรัพยากรเยอะมาก เพราะแต่ละ VM ต้องรันระบบปฏิบัติการเต็มรูปแบบ

### วิธีแก้ไขแบบใหม่: Containers
คอนเทนเนอร์สร้างสภาพแวดล้อมที่แยกกันโดยไม่ต้องมี Guest OS

**ข้อดี**:
- ใช้ทรัพยากรน้อยกว่า VM มาก
- สามารถ scale ได้มากกว่า
- เริ่มทำงานได้เร็วกว่า

เมื่อแอปมีผู้ใช้งานมาก เราสามารถ scale คอนเทนเนอร์ได้ง่ายและรวดเร็ว

## 2. ประวัติย่อของเทคโนโลยีคอนเทนเนอร์

### จุดเริ่มต้น
- **1979**: ระบบ chroot ใน Unix V7 (จุดเริ่มต้นของการแยกการเข้าถึงไฟล์)
- **2000**: FreeBSD Jails
- **2001**: Linux VServer
- **2004**: Solaris Containers
- **2006**: Google's Process Containers
- **2008**: LXC (LinuX Containers)

### การเข้ามาของ Docker
- **2008**: ก่อตั้ง DotCloud โดย Solomon Hykes ที่ปารีส
- **20 มีนาคม 2013**: เปิดตัว Docker เวอร์ชันแรก
- Docker เริ่มต้นใช้ LXC ก่อนพัฒนาไลบรารีของตัวเองชื่อ libcontainer
- Docker ทำให้การใช้งานคอนเทนเนอร์ง่ายและแพร่หลายอย่างรวดเร็ว

## 3. การทำงานพื้นฐานของ Docker

### ลองใช้งาน Docker ครั้งแรก
ลองคำสั่งพื้นฐานเพื่อเริ่มต้นใช้งาน Docker:

```bash
# คำสั่งสร้างและรันคอนเทนเนอร์
docker run -p 5152:80 itswatthachai/intro-to-devops-ui:1.0
```

คำสั่งนี้บอก Docker Engine ให้:
1. ดาวน์โหลด Image `itswatthachai/intro-to-devops-ui:1.0` (ถ้ายังไม่มีในเครื่อง)
2. สร้างคอนเทนเนอร์จาก Image นั้น
3. ทำ port mapping จากพอร์ต 80 ในคอนเทนเนอร์ไปยังพอร์ต 5152 ในเครื่องโฮสต์

### กระบวนการทำงานของ Docker Run
เมื่อเรียกใช้ `docker run`:

1. Docker Engine ตรวจสอบว่ามี Image ที่ต้องการในเครื่องหรือไม่
2. ถ้าไม่มี จะดาวน์โหลดจาก Docker Hub (หรือ registry อื่น)
3. สร้างคอนเทนเนอร์จาก Image นั้น

Image เหล่านี้สร้างมาจาก Dockerfile

### คำสั่งพื้นฐานของ Docker

```bash
# สร้างและรันคอนเทนเนอร์
docker run -p 5152:80 itswatthachai/intro-to-devops-ui:1.0

# ดูคอนเทนเนอร์ที่กำลังทำงาน
docker ps
# ผลลัพธ์:
# CONTAINER ID   IMAGE                               COMMAND                  CREATED         STATUS         PORTS                  NAMES
# 625f8285698b   itswatthachai/intro-to-devops-ui:1.0   "/docker-entrypoint.…"   5 seconds ago   Up 5 seconds   0.0.0.0:5152->80/tcp   amazing_lamarr

# หยุดการทำงานของคอนเทนเนอร์
docker stop amazing_lamarr

# เริ่มคอนเทนเนอร์ที่หยุดไปใหม่อีกครั้ง
docker start amazing_lamarr

# ลบคอนเทนเนอร์
docker stop amazing_lamarr && docker rm amazing_lamarr
```

## 4. การใช้งาน Docker Compose

### ปัญหาของการใช้ docker run หลายๆ ครั้ง
เมื่อโปรเจคมีหลายเซอร์วิส การใช้ `docker run` หลายครั้งจะยุ่งยาก

### การใช้ Docker Compose แก้ปัญหา
Docker Compose ช่วยจัดการคอนเทนเนอร์หลายตัวในไฟล์เดียว

### ตัวอย่าง docker-compose.yml

```yaml
version: '3'
services:
    site:
        image: itswatthachai/intro-to-devops-ui:1.0
        ports:
            - 5152:80
    
    api:
        image: itswatthachai/intro-to-devops-api:1.0
        ports:
            - 5153:8080
        environment:
            - DATABASE_URL=postgres://postgres:postgres@db:5432/postgres
    
    db:
        image: postgres:15.2
        environment:
            - POSTGRES_PASSWORD=postgres
        ports:
            - 5432:5432
```

การรันทุกเซอร์วิสพร้อมกัน:
```bash
docker compose up
```

## 5. การสร้าง Docker Images

### เข้าใจ Layers ใน Docker Image
Docker Image ประกอบด้วย layers หลายชั้น ซึ่งแต่ละชั้นคือผลลัพธ์จากคำสั่งใน Dockerfile

### ขั้นตอนการ Build แอปพลิเคชัน
สมมติว่าเรามีแอปพลิเคชัน Go ที่ต้องคอมไพล์

### สร้าง Dockerfile ขั้นพื้นฐาน

```dockerfile
FROM golang:1.22.1
WORKDIR /app
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 go build -o api
CMD ["/app/api"]
```

### การปรับปรุง Dockerfile ให้มีประสิทธิภาพ
ปัญหาของ Dockerfile ข้างต้นคือการแคชที่ไม่มีประสิทธิภาพ

วิธีปรับปรุง - แยกการคัดลอกไฟล์ที่เปลี่ยนแปลงน้อย (go.mod, go.sum) ก่อน:

```dockerfile
FROM golang:1.22.1
WORKDIR /app

# คัดลอกเฉพาะไฟล์ dependency ก่อน
COPY go.mod go.sum ./
RUN go mod download

# แล้วค่อยคัดลอกโค้ดส่วนที่เหลือ
COPY . .
RUN CGO_ENABLED=0 go build -o api
CMD ["/app/api"]
```

### Multi-stage Build
เพื่อลดขนาด Image ให้เล็กลง ใช้เทคนิค Multi-stage Build:

```dockerfile
# Stage 1: Build stage
FROM golang:1.22.1 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o api

# Stage 2: Production stage
FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/api ./
CMD ["./api"]
```

### การสร้าง Docker Image

```bash
docker build -t itswatthachai/intro-to-devops-api:1.0 .
```
- `itswatthachai/intro-to-devops-api`: ชื่อ Image
- `1.0`: เวอร์ชันหรือ tag
- `.`: Build Context (โฟลเดอร์ปัจจุบัน)

### การใช้ .dockerignore
เพื่อไม่ให้ไฟล์ที่ไม่จำเป็นเข้าไปใน Image

ตัวอย่างไฟล์ `.dockerignore`:
```
.git
node_modules
.env
*.log
```

## 6. การเผยแพร่ Docker Images

### การอัปโหลด Image ไปยัง Docker Hub

1. สร้าง Image โดยใช้ชื่อ username ของคุณนำหน้า:
```bash
docker build -t itswatthachai/your-app:1.0 .
```

2. ล็อกอินเข้า Docker Hub:
```bash
docker login
```

3. อัปโหลด Image:
```bash
docker push itswatthachai/your-app:1.0
```

## 7. คำสั่งพื้นฐานที่ควรรู้

### การจัดการคอนเทนเนอร์

| คำสั่ง | คำอธิบาย |
|-------|---------|
| `docker run -it ubuntu bash` | รันคอนเทนเนอร์ในโหมด interactive (-i) แบบมี terminal (-t) |
| `docker run -d nginx` | รันคอนเทนเนอร์ในโหมด detached (ทำงานเบื้องหลัง) |
| `docker run --name my-nginx -d nginx` | ตั้งชื่อคอนเทนเนอร์ |
| `docker ps -a` | ดูคอนเทนเนอร์ทั้งหมด (ทั้งที่ทำงานและหยุดทำงาน) |
| `docker logs my-nginx` | ดู logs ของคอนเทนเนอร์ |
| `docker logs -f my-nginx` | ดู logs แบบ follow (คล้าย tail -f) |
| `docker exec -it my-nginx bash` | เข้าไปใช้งาน terminal ในคอนเทนเนอร์ที่รันอยู่ |
| `docker inspect my-nginx` | ดูรายละเอียดของคอนเทนเนอร์ |
| `docker container prune` | ลบทุกคอนเทนเนอร์ที่หยุดทำงานแล้ว |
| `docker rm -f my-nginx` | หยุดและลบคอนเทนเนอร์ทันที |

### การจัดการ Images

| คำสั่ง | คำอธิบาย |
|-------|---------|
| `docker images` | ดูรายการ images ทั้งหมดในเครื่อง |
| `docker pull ubuntu:22.04` | ดาวน์โหลด image |
| `docker rmi nginx:latest` | ลบ image |
| `docker history nginx:latest` | ดู history การสร้าง layers ของ image |
| `docker commit my-container my-new-image:1.0` | สร้าง image ใหม่จากคอนเทนเนอร์ที่มีการเปลี่ยนแปลง |
| `docker tag my-image:latest my-image:v1.0` | แท็ก image ให้มีชื่อใหม่ |
| `docker image prune` | ลบ images ที่ไม่ได้ใช้งาน (dangling images) |

### การจัดการ Volumes และ Networks

| คำสั่ง | คำอธิบาย |
|-------|---------|
| `docker volume create my-data` | สร้าง volume |
| `docker run -v my-data:/app/data nginx` | รันคอนเทนเนอร์พร้อมเชื่อมต่อ volume |
| `docker run -v $(pwd)/data:/app/data nginx` | ใช้ bind mount กับโฟลเดอร์ในเครื่อง |
| `docker volume ls` | ดูรายการ volumes |
| `docker volume rm my-data` | ลบ volume |
| `docker network create my-network` | สร้างเครือข่าย |
| `docker run --network my-network nginx` | รันคอนเทนเนอร์บนเครือข่ายที่กำหนด |
| `docker network ls` | ดูรายการเครือข่าย |
| `docker network inspect my-network` | ดูรายละเอียดของเครือข่าย |

### คำสั่งแก้ปัญหาและการเพิ่มประสิทธิภาพ

| คำสั่ง | คำอธิบาย |
|-------|---------|
| `docker stats` | ดูการใช้ทรัพยากรของคอนเทนเนอร์ทั้งหมด |
| `docker run --cpus=0.5 --memory=500m nginx` | จำกัด CPU และ Memory สำหรับคอนเทนเนอร์ |
| `docker info` | เช็คสถานะ Docker Engine |
| `docker system prune -a` | ล้างทุกอย่าง (คอนเทนเนอร์, images, volumes ที่ไม่ได้ใช้งาน) |
| `docker system df` | ดูพื้นที่ที่ Docker ใช้ |
| `docker run --network host nginx` | รัน Docker แบบเข้าถึง host network |

### คำสั่ง Docker Compose เพิ่มเติม

| คำสั่ง | คำอธิบาย |
|-------|---------|
| `docker compose up` | สร้างและเริ่มเซอร์วิสที่กำหนดใน docker-compose.yml |
| `docker compose up -d` | สร้างและเริ่มแบบ detached mode |
| `docker compose stop` | หยุดเซอร์วิสทั้งหมด |
| `docker compose down` | หยุดและลบคอนเทนเนอร์ |
| `docker compose down -v` | หยุดและลบคอนเทนเนอร์พร้อมลบ volumes |
| `docker compose up -d db api` | เริ่มเฉพาะบางเซอร์วิส |
| `docker compose logs` | ดู logs |
| `docker compose up -d --build` | รีบิลด์ images แล้วเริ่มเซอร์วิสใหม่ |
| `docker compose up -d --scale api=3` | สเกลเซอร์วิส |
- Docker ช่วยให้การพัฒนาและ deploy แอปพลิเคชันสะดวกขึ้นมาก
- คอนเทนเนอร์ช่วยแก้ปัญหาความแตกต่างของสภาพแวดล้อม
- เทคนิคการสร้าง Dockerfile ที่ดีช่วยให้กระบวนการ build เร็วขึ้นและได้ Image ที่เล็กลง
- Docker Compose ช่วยจัดการหลายๆ เซอร์วิสได้ง่ายขึ้น
- การใช้คำสั่งที่เหมาะสมช่วยให้จัดการคอนเทนเนอร์และ images ได้อย่างมีประสิทธิภาพ

# Kong API Gateway

## API Gateway คืออะไร?
API Gateway เป็นอินเตอร์เฟซที่ทำหน้าที่จัดการกับ Request ต่างๆ ที่ส่งเข้ามาจากภายนอก ก่อนที่จะส่งต่อไปยังเซอร์วิสต่างๆ ที่อยู่ภายในระบบ

## หน้าที่หลักของ API Gateway

1. **Filter (การกรอง)**: 
    - กรอง traffic หรือ request ที่เข้ามาจากหลายแหล่ง เช่น web, mobile, หรือ web service อื่นๆ
    - แก้ปัญหาการมี URL หลายจุดที่ต้องจดจำ
    - ช่วยจัดการด้านความปลอดภัย

2. **Single Entry Point (จุดเข้าเดียว)**:
    - เปิดเผยเพียง endpoint เดียวสำหรับทุก API
    - ทำหน้าที่ Routing โดยพิจารณาจาก Path ที่เข้ามา
    - ตัวอย่าง: เมื่อมี request ที่พาธเป็น `/articles` จะถูกส่งต่อไปยังเซอร์วิส Article

3. **API Management (การจัดการ API)**:
    - จัดการกับ API ต่างๆ เช่น rate limiting, caching
    - ติดตามการใช้งาน API

4. **Security Mechanism (กลไกความปลอดภัย)**:
    - จัดการการเข้าถึงเซอร์วิสที่ต้องผ่านการล็อกอิน
    - ทำ logging บันทึกการเข้าถึง
    - ป้องกันการโจมตีต่างๆ

## ประโยชน์ของ API Gateway ใน Microservices

1. **แยกชั้นการทำงาน**:
    - แยกส่วนของแอปพลิเคชันออกจากส่วนจัดการ Request
    - ทีมพัฒนาสามารถโฟกัสที่ business logic โดยไม่ต้องกังวลเรื่องการจัดการ Request
    - ลดการทำงานซ้ำซ้อน เช่น ไม่ต้องพัฒนา Rate Limit ในทุกเซอร์วิส

2. **ง่ายต่อการใช้งาน**:
    - ผู้ใช้จดจำเพียง URL เดียว
    - การเข้าถึงเซอร์วิสต่างๆ แยกตามพาธที่กำหนด

3. **เพิ่มความปลอดภัย**:
    - ผู้ใช้ภายนอกไม่สามารถเข้าถึงเซอร์วิสภายในได้โดยตรง
    - ต้องผ่าน API Gateway เท่านั้น

## Kong API Gateway

Kong เป็น API Gateway แบบ Open Source ที่มีความสามารถหลัก ดังนี้:
- จัดการ API ทั้งในส่วนของ Routing และ Monitoring
- รองรับ Plugin หลากหลายสำหรับการจัดการ API
- Scalable และมีประสิทธิภาพสูง

## การตั้งค่า Kong API Gateway

ในตัวอย่างนี้ เราจะตั้งค่า Kong ผ่านไฟล์ `kong.yml` เพื่อสร้าง Endpoint เดียวที่จะทำหน้าที่เป็นประตูสู่เซอร์วิสต่างๆ:

### 1. สร้างไฟล์ `kong/kong.yml`

```yaml
_format_version: "3.0"
_transform: true

services:
  - name: site-service
     url: http://site:80
     routes:
        - name: site
          paths:
             - /
  - name: api-service
     url: http://api:3000
     routes:
        - name: api
          paths:
             - /api
```

การตั้งค่านี้กำหนดให้:
- เมื่อมี request ที่พาธ `/` จะถูกส่งต่อไปยังเซอร์วิส `site`
- เมื่อมี request ที่พาธ `/api` จะถูกส่งต่อไปยังเซอร์วิส `api`

### 2. อัพเดทไฟล์ `docker-compose.yml`

```yaml
version: "3.9"
services:
  site:
     image: babelcoder/intro-to-devops-ui:1.0
     ports:
        - 5151:80
  api:
     image: babelcoder/intro-to-devops-api:1.0
     ports:
        - 5152:3000
     environment:
        - DATABASE_URL=redis://db:6379
        - PORT=3000
        - APP_ENV=production
  db:
     image: redis:7.2.4-alpine
     ports:
        - 6379:6379
  kong:
     image: kong:3.3.1-alpine
     environment:
        KONG_DATABASE: "off"
        KONG_DECLARATIVE_CONFIG: /user/local/kong/declarative/kong.yml
        KONG_PROXY_LISTEN: 0.0.0.0:8000
     ports:
        - 8000:8000
     volumes:
        - "./kong:/user/local/kong/declarative"
```

### 3. เริ่มใช้งาน

ใช้คำสั่ง `docker compose up` เพื่อเริ่มการทำงาน

### 4. ทดสอบการใช้งาน

- เข้าถึง API ผ่าน: http://localhost:8000/api
- เข้าถึงหน้าเว็บไซต์ผ่าน: http://localhost:8000

ด้วยการตั้งค่านี้ ทุก request ที่เข้ามาจะผ่าน Kong API Gateway และถูกนำทางไปยังเซอร์วิสที่เหมาะสมตามพาธที่กำหนดไว้

# Infrastructure as Code และการใช้ Terraform

## 1. เข้าใจพื้นฐาน Infrastructure as Code (IaC)

การพัฒนาแอปพลิเคชันมีเป้าหมายสุดท้ายคือการส่งมอบให้ผู้ใช้งานได้ใช้จริง ซึ่งต้องการเซิร์ฟเวอร์หรือโครงสร้างพื้นฐานที่เหมาะสม

### ปัญหาแบบดั้งเดิม:
- การสร้างเซิร์ฟเวอร์บน Cloud ผ่าน UI เว็บไซต์ต้องทำหลายขั้นตอนด้วยการคลิก
- ยากในการทำซ้ำเมื่อต้องสร้างเซิร์ฟเวอร์ที่เหมือนกันหลายครั้ง
- แม้มี API ให้เรียกใช้ แต่ก็ซับซ้อนและไม่ได้คำนึงถึงสถานะปัจจุบันของระบบ

### ทางออกคือ Infrastructure as Code (IaC):
การจัดการโครงสร้างพื้นฐานด้วยไฟล์คำสั่งที่อธิบายสถานะที่ต้องการของระบบ โดยมีคุณสมบัติ:
- ทำงานอัตโนมัติ
- ควบคุมเวอร์ชันได้
- ทำงานมีประสิทธิภาพ
- นำกลับมาใช้ซ้ำได้

## 2. รู้จัก Terraform

Terraform คือเครื่องมือ IaC ที่โดดเด่นด้วย:
- ใช้ภาษา HCL (HashiCorp Configuration Language) ที่อ่านง่าย
- รองรับ Cloud Provider มากกว่า 200 ราย
- แสดงแผนการเปลี่ยนแปลงก่อนดำเนินการจริง
- จัดการความสัมพันธ์ระหว่างทรัพยากรอัตโนมัติ
- ทำงานซ้ำได้โดยไม่สร้างความซ้ำซ้อน

### องค์ประกอบหลักของ Terraform:

1. **Terraform Core (CLI)**: โปรแกรมหลักสำหรับติดต่อกับ Terraform

2. **Terraform Providers**: ปลั๊กอินที่แปลงคำสั่งให้เป็น API calls ไปยัง Cloud Provider นั้นๆ

3. **Terraform State File**: ไฟล์ที่เก็บข้อมูลสถานะปัจจุบันของทรัพยากรที่ Terraform ดูแล

![Terraform Architecture](https://miro.medium.com/v2/resize:fit:1400/0*bJzMGdZBo0zKfbvQ)

## 3. โครงสร้างไฟล์ Terraform (.tf)

Terraform ใช้ไฟล์นามสกุล `.tf` โดยมีโครงสร้างหลักดังนี้:

### 1) Terraform Block
```hcl
terraform {
    required_providers {
        digitalocean = {
            source = "digitalocean/digitalocean"
            version = "~> 2.0"
        }
    }
}
```
เป็นการระบุ provider และเวอร์ชันที่ต้องการใช้

### 2) Provider Block
```hcl
provider "digitalocean" {
    token = var.do_token
}
```
ตั้งค่าการเชื่อมต่อกับ provider

### 3) Resource Block
```hcl
resource "digitalocean_droplet" "my-node" {
    image = "docker-20-04"
    name = "my-node"
    region = "sgp1"
    size = "s-1vcpu-1gb"
    ssh_keys = [
        data.digitalocean_ssh_key.terraform.id
    ]
}
```
กำหนดทรัพยากรที่ต้องการสร้างบน Cloud

### 4) Data Block
```hcl
data "digitalocean_ssh_key" "terraform" {
    name = "do_terraform"
}
```
ดึงข้อมูลจากทรัพยากรที่มีอยู่แล้วบน Cloud

### 5) Variable Block
```hcl
variable "do_token" {
    type = string
    description = "The DigitalOcean Personal Access Token"
    sensitive = true
}
```
กำหนดตัวแปรที่ใช้ในไฟล์

### 6) Output Block
```hcl
output "droplet_ip" {
    value = digitalocean_droplet.my-node.ipv4_address
}
```
กำหนดค่าที่ต้องการให้แสดงเมื่อ Terraform ทำงานเสร็จ

## 4. Terraform Workflow

การทำงานกับ Terraform มี 5 ขั้นตอนหลัก:

### 1) Write (เขียนไฟล์ตั้งค่า)
สร้างไฟล์ `.tf` ที่อธิบายโครงสร้างพื้นฐานที่ต้องการ

### 2) Init (เริ่มต้นโปรเจค)
```bash
terraform init
```
ดาวน์โหลด provider และตั้งค่าพื้นที่ทำงาน

### 3) Plan (ดูแผนการเปลี่ยนแปลง)
```bash
terraform plan
```
แสดงการเปลี่ยนแปลงที่จะเกิดขึ้นเมื่อ apply โดยไม่มีการเปลี่ยนแปลงจริง

### 4) Apply (นำไปใช้งานจริง)
```bash
terraform apply
```
สร้างหรือปรับเปลี่ยนทรัพยากรตามที่กำหนดในไฟล์

### 5) Destroy (ลบทรัพยากร)
```bash
terraform destroy
```
ลบทรัพยากรทั้งหมดที่ Terraform ดูแล

## 5. ตัวอย่างการใช้งานจริงกับ DigitalOcean

ต่อไปนี้เป็นตัวอย่างการสร้าง Droplet บน DigitalOcean ด้วย Terraform:

### ขั้นตอนที่ 1: เตรียม SSH Key

```bash
ssh-keygen -f ~/.ssh/do_terraform
cat ~/.ssh/do_terraform.pub
# นำ public key ไปเพิ่มใน DigitalOcean -> Settings -> Security -> Add SSH Key
```

### ขั้นตอนที่ 2: สร้าง Personal Access Token

1. ไปที่ Digital Ocean -> API -> Generate New Token
2. ตั้งชื่อ "terraform" และเลือก Write Permission
3. คัดลอก Token ที่ได้เก็บไว้

### ขั้นตอนที่ 3: เขียนไฟล์ Terraform (main.tf)

```hcl
terraform {
    required_providers {
        digitalocean = {
            source = "digitalocean/digitalocean"
            version = "~> 2.0"
        }
    }
}

variable "do_token" {
    type = string
    description = "The DigitalOcean Personal Access Token"
    sensitive = true
}

provider "digitalocean" {
    token = var.do_token
}

data "digitalocean_ssh_key" "terraform" {
    name = "do_terraform"
}

resource "digitalocean_droplet" "my-node" {
    image = "docker-20-04"
    name = "my-node"
    region = "sgp1"
    size = "s-1vcpu-1gb"
    ssh_keys = [
        data.digitalocean_ssh_key.terraform.id
    ]
}

resource "digitalocean_project" "terraform" {
    name        = "terraform"
    description = "A project to represent terraform demo."
    purpose     = "Web Application"
    environment = "Production"
    resources = [
        "${digitalocean_droplet.my-node.urn}"
    ]
}

output "droplet_ip" {
    value = digitalocean_droplet.my-node.ipv4_address
}
```

### ขั้นตอนที่ 4: สร้าง .gitignore

```
*.tfstate
*.tfstate.backup
*.tfstate.lock.info
.terraform/
```

### ขั้นตอนที่ 5: ทำงานตาม Workflow

```bash
# เริ่มต้นโปรเจค
terraform init

# ดูแผนการเปลี่ยนแปลง
terraform plan

# สร้างทรัพยากร
terraform apply

# แสดงเฉพาะ output
terraform output

# เมื่อต้องการลบทรัพยากร
terraform destroy
```

## 6. ประโยชน์ที่จะได้รับ

- **ลดความผิดพลาด**: กำหนดโครงสร้างชัดเจน ลดการกดผิด
- **ทำงานเร็วขึ้น**: อัตโนมัติแทนการคลิกหลายขั้นตอน
- **สามารถทำซ้ำได้**: สร้างสภาพแวดล้อมเหมือนกันได้หลายครั้ง
- **ติดตามการเปลี่ยนแปลง**: เก็บประวัติใน Git ได้
- **ทำงานร่วมกันได้**: ทีมสามารถเข้าใจและทำงานร่วมกันได้

## 7. ข้อควรระวัง

- **การเก็บรักษาความลับ**: อย่าเก็บ token หรือรหัสผ่านในไฟล์ที่เข้าถึงได้สาธารณะ
- **ตรวจสอบ State File**: ระวังการแชร์ไฟล์ state ที่อาจมีข้อมูลละเอียดอ่อน
- **ใช้ -target ระมัดระวัง**: การกำหนดเป้าหมายเฉพาะอาจทำให้ state เสียหาย
- **ตรวจสอบ Plan ก่อนเสมอ**: อย่าเพิ่ง Apply ทันที ดู Plan ให้ละเอียดก่อน

## สรุป

Terraform เป็นเครื่องมือที่ช่วยให้การจัดการโครงสร้างพื้นฐานเป็นระบบมากขึ้น ช่วยลดความเสี่ยงจากการทำงานด้วยมือ และเพิ่มประสิทธิภาพการทำงานของทีม DevOps อย่างมาก ด้วยการเขียนโค้ดเพียงไม่กี่บรรทัด คุณสามารถจัดการระบบขนาดใหญ่ได้อย่างมีประสิทธิภาพ

# GitOps คืออะไร?

## 🚀 สรุปแบบสั้นๆ (TL;DR)
GitOps คือการใช้ Git เป็นศูนย์กลางในการจัดการโครงสร้างพื้นฐานและการ deploy ซอฟต์แวร์ โดยอาศัย declarative configuration และ automation เพื่อให้สภาพแวดล้อมมีความสอดคล้องกับสิ่งที่กำหนดไว้ใน Git repository เสมอ

![GitOps Workflow](https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F91d70127-b143-49f1-a54d-1e27164aeca8_1280x1785.jpeg)

## 📘 คำอธิบายอย่างละเอียด

### GitOps คืออะไร?

GitOps เป็นแนวทางในการทำ DevOps ที่ใช้ Git เป็นแหล่งข้อมูลหลัก (single source of truth) ในการกำหนดสถานะของระบบทั้งหมด โดยมีหลักการสำคัญคือ:

- ทุกการตั้งค่าของระบบถูกเก็บในรูปแบบ **declarative code** (บอกว่าต้องการอะไร ไม่ใช่ทำอย่างไร)
- การเปลี่ยนแปลงใดๆ ในระบบเริ่มต้นจาก Git repository
- การเปลี่ยนแปลงถูกนำไปใช้โดยอัตโนมัติผ่านเครื่องมือ GitOps

![GitOps Components](https://cdn.prod.website-files.com/65a5be30bf4809bb3a2e8aff/65dd9fa2f3fe1e20b2808ff0_J2q7n8C.png)

### 🌟 ทำไม GitOps จึงมีความสำคัญ?

#### 1. การ Deploy ซอฟต์แวร์ได้ดียิ่งขึ้น
การใช้ GitOps ทำให้กระบวนการ deploy เป็นอัตโนมัติ ลดความผิดพลาดจากมนุษย์ (human error) และเพิ่มความเร็วในการส่งมอบซอฟต์แวร์ไปยังผู้ใช้

#### 2. การกู้คืนระบบรวดเร็ว
เมื่อเกิดปัญหา เราสามารถใช้คำสั่ง `git revert` เพื่อย้อนกลับไปยังเวอร์ชันที่ทำงานได้อย่างรวดเร็ว โดยระบบจะ deploy โค้ดเก่าโดยอัตโนมัติ

```bash
# ตัวอย่างการ revert commits
git revert HEAD~1
git push
```

#### 3. การจัดการข้อมูลความลับ (Credentials) ที่ปลอดภัย
GitOps สนับสนุนการใช้เครื่องมือจัดการความลับอย่าง HashiCorp Vault, Sealed Secrets หรือ AWS Secrets Manager ซึ่งสามารถทำงานร่วมกับ Git repository ได้อย่างปลอดภัย

#### 4. ความโปร่งใสในกระบวนการ Deploy
ทุกการเปลี่ยนแปลงใน infrastructure มีความชัดเจนและสามารถตรวจสอบย้อนหลังได้ผ่านประวัติ Git ทำให้ทุกคนในทีมเข้าใจสถานะปัจจุบันของระบบ

#### 5. ส่งเสริมวัฒนธรรมการทำงานที่ดี
GitOps ส่งเสริมให้ทีมรู้สึกเป็นเจ้าของโปรเจคร่วมกัน (Ownership) และกระตุ้นให้เกิดการเรียนรู้ข้ามสายงาน เนื่องจากทุกคนสามารถเข้าถึงและเรียนรู้จากโค้ดที่ใช้ในการตั้งค่าระบบได้

### 🏗️ หลักการพื้นฐานของ GitOps

#### 1. ระบบทั้งหมดถูกอธิบายด้วย Declarative Configuration
แทนที่จะใช้ imperative scripts (ชุดคำสั่งที่บอกว่าทำอะไร อย่างไร) GitOps ใช้ declarative configuration ที่ระบุเพียงสถานะสุดท้ายที่ต้องการ

**ตัวอย่าง Imperative vs Declarative:**

```bash
# Imperative (การสั่งงานทีละขั้นตอน)
kubectl create deployment nginx --image=nginx
kubectl scale deployment nginx --replicas=3
kubectl expose deployment nginx --port=80

# Declarative (ระบุเพียงสิ่งที่ต้องการ)
apiVersion: apps/v1
kind: Deployment
metadata:
    name: nginx
spec:
    replicas: 3
    selector:
        matchLabels:
            app: nginx
    template:
        metadata:
            labels:
                app: nginx
        spec:
            containers:
            - name: nginx
                image: nginx
---
apiVersion: v1
kind: Service
metadata:
    name: nginx
spec:
    selector:
        app: nginx
    ports:
    - port: 80
```

#### 2. Git เป็นแหล่งข้อมูลหลัก (Single Source of Truth)
ทุกการเปลี่ยนแปลงในระบบต้องผ่าน Git และ commit history เป็นบันทึกที่เชื่อถือได้ของทุกการเปลี่ยนแปลง

#### 3. การเปลี่ยนแปลงดำเนินการโดยอัตโนมัติผ่าน Operators
เมื่อมีการเปลี่ยนแปลงใน Git repository ระบบอัตโนมัติ (เช่น Argo CD, Flux) จะนำการเปลี่ยนแปลงไปใช้กับสภาพแวดล้อมจริง

#### 4. Automatic Reconciliation and Drift Detection
ระบบสามารถตรวจจับและแก้ไขความแตกต่างระหว่างสถานะที่ต้องการ (ใน Git) กับสถานะปัจจุบัน (ในสภาพแวดล้อมจริง) ได้โดยอัตโนมัติ

### 🔄 GitOps Workflow

GitOps มักใช้ repositories 2 ประเภท:

1. **Application Repository**: เก็บซอร์สโค้ดของแอปพลิเคชันและกระบวนการ build
2. **Environment Repository**: เก็บการตั้งค่า infrastructure และ deployment configurations

![GitOps Repositories](https://static.wixstatic.com/media/d9caf9_7145e0140ad64479b7829562be144f92~mv2.png/v1/fill/w_980,h_472,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/d9caf9_7145e0140ad64479b7829562be144f92~mv2.png)

การ deploy ใน GitOps มี 2 รูปแบบหลัก:

#### 1. Push Model
![Push Model](https://cdn.prod.website-files.com/622642781cd7e96ac1f66807/673e9cf86f9165033891c0ea_64b6277cc28963be1e445f19_image2.png)

**วิธีการทำงาน:**
- CI/CD pipeline (เช่น Jenkins, GitHub Actions) จะตรวจจับการเปลี่ยนแปลงใน repository
- เมื่อมีการเปลี่ยนแปลง pipeline จะ push การเปลี่ยนแปลงไปยัง environment
- ระบบต้องมีการตรวจสอบการเปลี่ยนแปลงที่อาจเกิดขึ้นนอก pipeline

**ตัวอย่างเครื่องมือ:**
- Jenkins
- CircleCI
- GitHub Actions
- Travis CI

**ข้อดี:**
- ง่ายต่อการเริ่มต้นใช้งาน
- เหมาะกับทีมที่คุ้นเคยกับ CI/CD pipelines ทั่วไป

**ข้อจำกัด:**
- ไม่มีการตรวจสอบความแตกต่าง (drift) โดยอัตโนมัติ
- ต้องดูแลสิทธิ์การเข้าถึง Kubernetes cluster

#### 2. Pull Model (Agent-based)
![Pull Model](https://www.aviator.co/blog/wp-content/uploads/2024/09/Frame-1430107217.png)

**วิธีการทำงาน:**
- Agent (เช่น Argo CD) ติดตั้งใน environment
- Agent ตรวจสอบการเปลี่ยนแปลงใน Git repository
- เมื่อพบการเปลี่ยนแปลง Agent จะนำมาใช้กับ environment
- Agent ตรวจสอบ drift ระหว่างสถานะที่ต้องการกับสถานะปัจจุบันอย่างสม่ำเสมอ

**ตัวอย่างเครื่องมือ:**
- Argo CD
- Flux
- Rancher Fleet

**ข้อดี:**
- มีความปลอดภัยสูงกว่า (ไม่ต้องเปิด Kubernetes API ให้ภายนอก)
- ตรวจจับและแก้ไขความแตกต่าง (drift) โดยอัตโนมัติ
- รองรับการทำงานแบบ multi-cluster ได้ดี

### 🛠️ เริ่มต้นใช้งาน GitOps อย่างไร?

1. **เลือกเครื่องมือ GitOps** ตามความต้องการของทีม (Argo CD, Flux, Jenkins X)
2. **จัดโครงสร้าง Git repositories** แยก application code และ infrastructure configuration
3. **ใช้ Infrastructure as Code (IaC)** เช่น Terraform, Pulumi หรือ Kubernetes manifests
4. **ตั้งค่า CI pipeline** สำหรับการทดสอบและ build images
5. **ตั้งค่า CD automation** ที่ใช้ GitOps principles

### 📚 ตัวอย่างการใช้งาน Argo CD (Pull-based GitOps)

```yaml
# ตัวอย่าง Application ใน Argo CD
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
    name: my-app
    namespace: argocd
spec:
    project: default
    source:
        repoURL: https://github.com/my-org/my-app-config.git
        targetRevision: HEAD
        path: kubernetes/overlays/production
    destination:
        server: https://kubernetes.default.svc
        namespace: production
    syncPolicy:
        automated:
            prune: true
            selfHeal: true
```

### 🔍 สรุป

GitOps เป็นแนวทางที่มีประสิทธิภาพในการจัดการ infrastructure และ deployment ที่ช่วยเพิ่มความเร็ว ความน่าเชื่อถือ และความปลอดภัยในกระบวนการพัฒนาซอฟต์แวร์ด้วยการใช้ Git เป็นแกนหลัก โดยอาศัยหลักการของ declarative configuration, automation และ continuous reconciliation

การเริ่มต้นใช้ GitOps อาจต้องใช้เวลาในการปรับตัว แต่ในระยะยาวจะช่วยลดความซับซ้อนและความเสี่ยงในการบริหารจัดการระบบขนาดใหญ่ได้อย่างมีประสิทธิภาพ

# CI/CD Pipeline การทำงานอัตโนมัติในการพัฒนาซอฟต์แวร์

## เข้าใจ CI/CD เบื้องต้น

CI/CD เป็นคำย่อของ **Continuous Integration** และ **Continuous Delivery/Deployment** ซึ่งเป็นแนวทางปฏิบัติในการพัฒนาซอฟต์แวร์ที่ช่วยทำให้การส่งมอบโค้ดจากนักพัฒนาไปสู่ผู้ใช้งานเป็นไปอย่างรวดเร็วและมีประสิทธิภาพ

![CI/CD Pipeline Overview](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa0392cd2-a9b4-4c12-8c12-5250127d7df2_1280x1679.jpeg)

### Continuous Integration (CI)

**CI** เป็นกระบวนการที่ทำให้นักพัฒนาสามารถรวมโค้ดเข้าด้วยกันบ่อยๆ โดยไม่ต้องกังวลว่าจะเกิดปัญหา เพราะมีระบบอัตโนมัติคอยตรวจสอบและทดสอบโค้ดให้ทุกครั้ง

**ประโยชน์ของ CI:**
- ตรวจจับข้อผิดพลาดได้เร็วขึ้น
- ลดความเสี่ยงในการรวมโค้ดที่มีปัญหา
- ทำให้โค้ดมีคุณภาพดีขึ้นผ่านการทดสอบอัตโนมัติ
- ทีมสามารถพัฒนาได้อย่างต่อเนื่องและรวดเร็ว

### Continuous Delivery/Deployment (CD)

**Continuous Delivery** คือการทำให้ซอฟต์แวร์พร้อมที่จะนำขึ้น Production ได้ตลอดเวลา แต่ยังต้องมีคนกดปุ่ม Deploy

**Continuous Deployment** คือการนำซอฟต์แวร์ขึ้น Production โดยอัตโนมัติ หลังจากผ่านการทดสอบทั้งหมด โดยไม่ต้องมีคนมากดปุ่ม

**ความแตกต่าง:**
- Continuous Delivery: พร้อมส่งมอบ (แต่ยังต้องมีคนตัดสินใจ Deploy)
- Continuous Deployment: ส่งมอบอัตโนมัติ (ทุกการเปลี่ยนแปลงที่ผ่านการทดสอบจะถูก Deploy อัตโนมัติ)

## การใช้ GitHub Actions สำหรับ CI/CD

[GitHub Actions](https://github.com/features/actions) เป็นเครื่องมือที่ GitHub ให้บริการเพื่อสร้างระบบ CI/CD ในโปรเจคของคุณ โดยคุณสามารถกำหนด Workflow ที่จะทำงานเมื่อมีเหตุการณ์ (Event) เกิดขึ้นในโปรเจค เช่น เมื่อมีการ push โค้ด หรือมีการสร้าง Pull Request

### 1. การสร้าง Continuous Integration (CI) ด้วย GitHub Actions

ตัวอย่างนี้เป็นการสร้าง Workflow ที่จะทำงานเมื่อมีการ push โค้ดไปยัง Repository

```yaml
name: CI
on: [push]
jobs:
    main:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
                with:
                    fetch-depth: 0
            - name: Use Node.js
                uses: actions/setup-node@v4
                with:
                    node-version: "20.x"
            - name: Install site dependencies
                run: cd site && npm ci
            - name: Test site
                run: cd site && npm test
            - name: Setup Go 1.21.x
                uses: actions/setup-go@v4
                with:
                    go-version: "1.21.x"
            - name: Install api dependencies
                run: cd api && go mod download
            - name: Test api
                run: cd api && go test ./...
```

**คำอธิบาย Workflow CI:**
1. **name: CI** - ชื่อของ Workflow
2. **on: [push]** - เหตุการณ์ที่จะทริกเกอร์ Workflow (ในที่นี้คือเมื่อมีการ push โค้ด)
3. **jobs** - งานที่จะทำใน Workflow
4. **runs-on: ubuntu-latest** - ระบบปฏิบัติการที่จะรัน Workflow
5. **steps** - ขั้นตอนการทำงานทั้งหมด ซึ่งประกอบด้วย:
     - **Checkout** - ดึงโค้ดจาก Repository
     - **Setup Node.js** - ติดตั้ง Node.js
     - **Install & Test site** - ติดตั้ง dependencies และทดสอบส่วน Frontend
     - **Setup Go** - ติดตั้ง Go
     - **Install & Test API** - ติดตั้ง dependencies และทดสอบส่วน Backend API

### 2. การสร้าง Continuous Delivery (CD) ด้วย GitHub Actions

ตัวอย่างต่อไปนี้เป็นการสร้าง Workflow ที่จะ Build Docker Image และ Push ไปยัง Docker Hub เมื่อมีการ push โค้ดไปยัง branch main

```yaml
name: CD
on:
    push:
        branches:
            - main
jobs:
    push_to_registry:
        runs-on: ubuntu-latest
        steps:
            - name: Check out the repo
                uses: actions/checkout@v4
            - name: Set up QEMU
                uses: docker/setup-qemu-action@v3
            - name: Set up Docker Buildx
                uses: docker/setup-buildx-action@v3

            - name: Log in to Docker Hub
                uses: docker/login-action@v3
                with:
                    username: ${{ secrets.DOCKERHUB_USERNAME  }}
                    password: ${{ secrets.DOCKERHUB_TOKEN  }}

            - name: Read Config
                id: config
                run: |
                    echo "site_version=$(cat ./site/version)" >> "$GITHUB_OUTPUT"
                    echo "api_version=$(cat ./site/version)" >> "$GITHUB_OUTPUT"

            - name: Build and push API
                uses: docker/build-push-action@v5
                with:
                    context: ./api
                    push: true
                    tags: babelcoder/intro-to-devops-api:${{steps.config.outputs.api_version}}

            - name: Build and push Site
                uses: docker/build-push-action@v5
                with:
                    context: ./site
                    push: true
                    tags: babelcoder/intro-to-devops-ui:${{steps.config.outputs.site_version}}
```

**คำอธิบาย Workflow CD:**
1. **name: CD** - ชื่อของ Workflow
2. **on: push: branches: [main]** - เหตุการณ์ที่จะทริกเกอร์ Workflow (ในที่นี้คือเมื่อมีการ push โค้ดไปยัง branch main)
3. **steps** - ขั้นตอนการทำงาน:
     - **Checkout** - ดึงโค้ดจาก Repository
     - **Setup Docker** - เตรียมสภาพแวดล้อมสำหรับ Docker
     - **Login to Docker Hub** - เข้าสู่ระบบ Docker Hub โดยใช้ Secrets ที่เก็บไว้ใน GitHub
     - **Read Config** - อ่านข้อมูล version ของ API และ Site
     - **Build and push** - สร้าง Docker Image และ Push ไปยัง Docker Hub

![Docker Hub Workflow](https://www.researchgate.net/profile/Daniele-Alma/publication/369734677/figure/fig6/AS:11431281135911839@1680491010032/Docker-Hub-workflow-pipeline.png)

### 3. การสร้าง Continuous Deployment ด้วย GitHub Actions

ตัวอย่างนี้จะแสดงการสร้าง Workflow ที่จะ Deploy โปรเจคโดยใช้ Terraform และ Docker Compose เมื่อมีการ push โค้ดไปยัง branch main

```yaml
name: CD
on:
    push:
        branches:
            - main
env:
    TF_CLI_CONFIG_FILE: "./.terraformrc"
jobs:
    deployment:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: hashicorp/setup-terraform@v3

            - name: Setup Terraform Config File
                id: terraform-config
                run: |-
                    cat > .terraformrc <<EOF
                    credentials "app.terraform.io" {
                        token = "${{ secrets.TF_API_TOKEN }}"
                    }
                    EOF

            - name: Terraform Init
                id: init
                run: TF_CLI_CONFIG_FILE=${{env.TF_CLI_CONFIG_FILE}} terraform init

            - name: Terraform Validate
                id: validate
                run: terraform validate -no-color

            - name: Terraform Plan
                id: plan
                run: TF_CLI_CONFIG_FILE=${{env.TF_CLI_CONFIG_FILE}} terraform plan -no-color

            - name: Terraform Apply
                id: apply
                run: TF_CLI_CONFIG_FILE=${{env.TF_CLI_CONFIG_FILE}} terraform apply -auto-approve -no-color

            - name: Terraform Output
                id: output
                run: terraform output | sed -r 's/.+"([0-9,\.]+)"/ip=\1/' >> "$GITHUB_OUTPUT"

            - name: Check SSH Port Alive
                id: check-ssh-alive
                run: |
                    while ! nc -z ${{ steps.output.outputs.ip }} 22; do
                        sleep 1
                        echo "port not response"
                    done

            - name: Read Config
                id: config
                run: |
                    docker_content=$(cat ./docker-compose.yml)
                    echo "docker_content<<EOF" >> "$GITHUB_OUTPUT"
                    echo "$docker_content" >> "$GITHUB_OUTPUT"
                    echo "EOF" >> "$GITHUB_OUTPUT"

                    kong_content=$(cat ./kong/kong.yml)
                    echo "kong_content<<EOF" >> "$GITHUB_OUTPUT"
                    echo "$kong_content" >> "$GITHUB_OUTPUT"
                    echo "EOF" >> "$GITHUB_OUTPUT"

            - name: Deploy
                id: deploy
                uses: appleboy/ssh-action@v1.0.3
                with:
                    host: ${{ steps.output.outputs.ip }}
                    username: root
                    key: ${{ secrets.SSH_KEY }}
                    script: |
                        docker compose down

                        rm -f ./docker-compose.yml

                        mkdir -p ./kong
                        cat > ./kong/kong.yml <<EOF
                        ${{steps.config.outputs.kong_content}}
                        EOF
                        cat > ./docker-compose.yml <<EOF
                        ${{steps.config.outputs.docker_content}}
                        EOF

                        docker compose up -d
```

**คำอธิบาย Workflow Continuous Deployment:**

1. **การเตรียม Terraform**:
     - ติดตั้ง Terraform
     - สร้างไฟล์ config สำหรับ Terraform ที่มี token สำหรับการเข้าถึง Terraform Cloud

2. **การทำงานกับ Terraform**:
     - `terraform init` - เริ่มต้น Terraform project
     - `terraform validate` - ตรวจสอบ syntax ของไฟล์ Terraform
     - `terraform plan` - วางแผนการสร้าง infrastructure
     - `terraform apply` - สร้าง infrastructure ตามที่กำหนดไว้ใน code
     - `terraform output` - ดึงค่า output (เช่น IP address) จาก Terraform

3. **การตรวจสอบ Server**:
     - รอให้ port SSH (port 22) เปิดใช้งานได้ก่อนดำเนินการต่อ

4. **การอ่านไฟล์ Config**:
     - อ่านไฟล์ `docker-compose.yml` และ `kong/kong.yml` เพื่อเตรียมสำหรับการ deploy

5. **การ Deploy**:
     - ใช้ SSH เพื่อเชื่อมต่อไปยัง server
     - หยุดการทำงานของ containers เดิม (`docker compose down`)
     - สร้างไฟล์ config ใหม่ (`docker-compose.yml` และ `kong/kong.yml`)
     - เริ่มการทำงานของ containers ใหม่ (`docker compose up -d`)

![Infrastructure as Code](https://cdn.hashnode.com/res/hashnode/image/upload/v1683046135334/1af0095a-e1b1-4328-bde9-1fd662931423.jpeg)

## สรุป

การใช้ CI/CD ช่วยให้ทีมพัฒนาสามารถส่งมอบซอฟต์แวร์ได้เร็วขึ้น มีคุณภาพดีขึ้น และลดความเสี่ยงในการเกิดปัญหาเมื่อนำขึ้น Production โดย GitHub Actions เป็นเครื่องมือที่ทรงพลังและใช้งานง่ายสำหรับการสร้างระบบ CI/CD ใน GitHub Repository

**Tips สำหรับการเริ่มต้นใช้งาน CI/CD:**
1. เริ่มจากการทำ CI ก่อน (การทดสอบอัตโนมัติ)
2. ค่อยๆ เพิ่ม CD เมื่อทีมมีความคุ้นเคยกับ CI แล้ว
3. ใช้ Secrets ในการเก็บข้อมูลที่สำคัญ อย่าเก็บไว้ในโค้ดโดยตรง
4. ทำให้ Workflow เป็นส่วนสำคัญของกระบวนการพัฒนาซอฟต์แวร์

### ทรัพยากรเพิ่มเติม
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Terraform Documentation](https://www.terraform.io/docs)
- [Docker Documentation](https://docs.docker.com/)

# Kubernetes: หลักการและองค์ประกอบพื้นฐาน

![Kubernetes Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/791px-Kubernetes_logo_without_workmark.svg.png)

## ดาวน์โหลดซอร์สโค้ด
[ดาวน์โหลด K8s.zip](https://www.dropbox.com/scl/fi/vdb5qc9xem06w0org0qor/k8s.zip?rlkey=qg0ceg9l8wujoproxpn9480yq&st=drppgsqg&dl=0)

## 1. Container Orchestration คืออะไร?

![Container Orchestration](https://cdn.prod.website-files.com/5ff66329429d880392f6cba2/63bee7de323e0503981d88f9_What%20Is%20Container%20Orchestration.jpg)

**Container Orchestration** เป็นระบบที่จัดการกลุ่มของคอนเทนเนอร์โดยอัตโนมัติ แก้ปัญหาต่างๆ ที่การใช้งาน Docker เพียงอย่างเดียวไม่สามารถแก้ไขได้ เช่น:

- การสเกลอัตโนมัติเมื่อโหลดเพิ่มขึ้น
- การจัดการเครือข่ายระหว่างคอนเทนเนอร์ที่กระจายตัว
- การตรวจสอบสถานะและรีสตาร์ทเมื่อเกิดปัญหา
- การอัปเดตแบบ zero-downtime

### สถาปัตยกรรม Kubernetes

![Kubernetes Architecture](https://d33wubrfki0l68.cloudfront.net/2475489eaf20163ec0f54ddc1d92aa8d4c87c96b/e7c81/images/docs/components-of-kubernetes.svg)

Kubernetes ประกอบด้วยส่วนหลักๆ ดังนี้:

**Control Plane (ส่วนควบคุม):**
- **kube-apiserver:** API Server ที่เป็นจุดติดต่อของระบบ
- **kube-scheduler:** จัดการการกำหนด Pod ไปยัง Node ที่เหมาะสม
- **kube-controller-manager:** ควบคุมสถานะของระบบให้เป็นไปตามที่กำหนด
- **etcd:** ฐานข้อมูลเก็บสถานะของคลัสเตอร์
- **cloud-controller-manager:** เชื่อมต่อกับ Cloud Provider API

**Node (เครื่องปฏิบัติการ):**
- **kubelet:** ตัวแทนที่ทำงานบนแต่ละ Node เพื่อจัดการคอนเทนเนอร์
- **kube-proxy:** จัดการเครือข่ายและการเชื่อมต่อ
- **Container Runtime:** เช่น Docker ที่รันคอนเทนเนอร์จริงๆ

## 2. Pods: หน่วยพื้นฐานของ Kubernetes

![Pods](https://d33wubrfki0l68.cloudfront.net/aecab1f649bc640ebef1f05581bfcc91a48038c4/728d6/images/docs/pod.svg)

**Pod** คือหน่วยเล็กที่สุดที่สามารถสร้างและจัดการได้ใน Kubernetes โดยแต่ละ Pod จะประกอบด้วยหนึ่งหรือหลายคอนเทนเนอร์ที่แบ่งปันทรัพยากรและเครือข่ายร่วมกัน

Pod ใช้งานได้สองรูปแบบหลัก:
1. **Single-container Pod:** Pod ที่มีคอนเทนเนอร์เพียงตัวเดียว
2. **Multi-container Pod:** Pod ที่มีหลายคอนเทนเนอร์ทำงานร่วมกัน

### ตัวอย่างการสร้าง Pod

```bash
# สร้าง Pod ชื่อ "site" ที่รัน image babelcoder/intro-to-devops-ui:1.0
kubectl run site --image=babelcoder/intro-to-devops-ui:1.0

# ตรวจสอบสถานะ Pod
kubectl get pod
```

ผลลัพธ์:
```
NAME   READY   STATUS    RESTARTS   AGE
site   1/1     Running   0          2m1s
```

### การเข้าถึง Pod ผ่าน Port Forwarding

```bash
kubectl port-forward site 5151:80
```

คำสั่งนี้ทำให้เราสามารถเข้าถึง Pod ผ่าน `http://localhost:5151`


## 3. Multi-Container Design Patterns

เมื่อมีคอนเทนเนอร์หลายตัวใน Pod เดียวกัน เราสามารถออกแบบรูปแบบการทำงานร่วมกันได้หลายแบบ:

### 3.1 Init Containers

![Init Containers](https://drek4537l1klr.cloudfront.net/stoneman2/v-7/Figures/02-08_img_0105.jpg)

คอนเทนเนอร์ตัวหนึ่งทำหน้าที่เตรียมข้อมูล/สภาพแวดล้อมก่อนที่คอนเทนเนอร์หลักจะเริ่มทำงาน เช่น:
- การสร้างไฟล์คอนฟิก
- การตรวจสอบว่าเซอร์วิสอื่นๆ พร้อมแล้ว
- การดาวน์โหลดข้อมูลที่จำเป็น

### 3.2 Ambassador Pattern

![Ambassador Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/_images/ambassador.png)

คอนเทนเนอร์ "ทูต" ที่ทำหน้าที่เป็นตัวกลางในการติดต่อกับบริการภายนอก:
- เช่น แอปพลิเคชันที่เขียนให้เชื่อมต่อกับ `localhost:6379` แต่ Redis จริงๆ อยู่ที่ `redis:6379`
- Ambassador Proxy จะรับการเชื่อมต่อจาก `localhost:6379` แล้วส่งต่อไปยัง `redis:6379`

### 3.3 Sidecar Pattern

![Sidecar Pattern](https://media.licdn.com/dms/image/v2/D4E12AQFd288_c78Xmg/article-inline_image-shrink_1500_2232/article-inline_image-shrink_1500_2232/0/1686865725271?e=1753315200&v=beta&t=wuOCzt77b6zQ-fABYWFxp7eFwuCF3aHy75vhd5l_B8U)

คอนเทนเนอร์เสริมที่ทำงานคู่กับคอนเทนเนอร์หลัก แต่มีหน้าที่แยกกัน:
- เช่น คอนเทนเนอร์ที่เก็บและส่งล็อก
- คอนเทนเนอร์ที่ทำการซิงค์ไฟล์
- คอนเทนเนอร์ที่ทำ monitoring

### 3.4 Adapter Pattern

![Adapter Pattern](https://media.geeksforgeeks.org/wp-content/uploads/20240204210126/Class-Diagram-of-Adapter-Design-Pattern_.webp)

คล้ายกับ Sidecar แต่เน้นการแปลงข้อมูล:
- เช่น แปลง format ของ log files
- แปลงรูปแบบ metrics ให้เข้ากับระบบ monitoring

## 4. Deployments: การจัดการ Pod ในระดับที่สูงขึ้น

![Deployment ReplicaSet Pods](https://d33wubrfki0l68.cloudfront.net/152c845f25df8e69dd24dd7b0836a289747e258a/4a1d2/docs/tutorials/kubernetes-basics/public/images/module_02_first_app.svg)

การสร้าง Pod โดยตรงมีข้อจำกัด เช่น ไม่มีการรีสตาร์ทอัตโนมัติเมื่อ Pod ล้มเหลว Kubernetes จึงมี **ReplicaSet** และ **Deployment**:

- **ReplicaSet:** ควบคุมจำนวน Pod ให้คงที่ตามที่กำหนด
- **Deployment:** ควบคุม ReplicaSet เพื่อจัดการการอัปเดตและ rollback

การทำงานของ Deployment จะใช้ **Labels** เพื่อระบุว่า Pod ใดอยู่ภายใต้การควบคุม:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: site-deployment
    labels:
        app: site
spec:
    replicas: 3  # จำนวน Pod ที่ต้องการให้ทำงาน
    selector:
        matchLabels:
            app: site  # ค้นหา Pod ที่มี label app=site
    template:
        metadata:
            labels:
                app: site  # กำหนด label ให้กับ Pod ที่สร้างขึ้น
        spec:
            containers:
            - name: site
                image: babelcoder/intro-to-devops-ui:1.0
```

![Label Selector](https://i0.wp.com/theithollow.com/wp-content/uploads/2019/01/image-13.png?resize=1024%2C436&ssl=1)

## 5. Services: การเข้าถึง Pod ผ่านเครือข่าย

![Service](https://miro.medium.com/v2/resize:fit:578/0*K6fOlxtXDEC2BtpQ.png)

**Services** เป็นวิธีการเข้าถึง Pod ที่ทนทานต่อการเปลี่ยนแปลง แม้ว่า Pod จะมี IP ที่เปลี่ยนไปเมื่อรีสตาร์ท แต่ Service จะยังคงมี IP ที่คงที่

### 5.1 ClusterIP (ค่าเริ่มต้น)

![Cluster IP](https://miro.medium.com/v2/resize:fit:1200/1*dLlC4L2qpImyZS6gOntUjg.png)

- เข้าถึงได้เฉพาะภายใน Cluster
- ใช้สำหรับการสื่อสารระหว่าง Pod ภายในคลัสเตอร์

```yaml
apiVersion: v1
kind: Service
metadata:
    name: db
    labels:
        app: db
spec:
    ports:
        - port: 6379        # พอร์ตของ Service
            protocol: TCP
            targetPort: 6379  # พอร์ตของ Pod ปลายทาง
    selector:
        app: db             # เลือก Pod ที่มี label app=db
```

การทดสอบ:
```bash
# สร้าง Pod ชั่วคราวเพื่อทดสอบ
kubectl run busybox --rm --restart Never -it --image=busybox

# ทดสอบเชื่อมต่อไปยัง Service ชื่อ db
/ # telnet db 6379
Connected to db
```

### 5.2 NodePort

![Node Port](https://zesty.co/wp-content/uploads/2025/02/nodeport.png)

- เปิดพอร์ตบนทุก Node เพื่อให้เข้าถึงได้จากภายนอก
- พอร์ตจะถูกเลือกโดยอัตโนมัติในช่วง 30000-32767

```yaml
apiVersion: v1
kind: Service
metadata:
    name: site
    labels:
        app: site
spec:
    type: NodePort       # ระบุประเภทเป็น NodePort
    ports:
        - port: 5152       # พอร์ตภายใน Cluster
            protocol: TCP
            targetPort: 3000 # พอร์ตของ Pod
    selector:
        app: site
```

การเข้าถึง:
```
http://<NODE_IP>:32074  # พอร์ตที่ถูกสุ่มเลือก
```

### 5.3 LoadBalancer

![Load Balancer](https://www.densify.com/wp-content/uploads/article-k8s-capacity-kubernetes-service-overview.svg)

- สร้าง Load Balancer บนระบบคลาวด์ (AWS, GCP, Azure)
- เหมาะสำหรับการเข้าถึงจากภายนอกในระบบ Production

```yaml
apiVersion: v1
kind: Service
metadata:
    name: site
    labels:
        app: site
spec:
    type: LoadBalancer  # ระบุประเภทเป็น LoadBalancer
    ports:
        - port: 5151      # พอร์ตที่ LoadBalancer รับทราฟฟิก
            protocol: TCP
            targetPort: 80  # พอร์ตของ Pod
    selector:
        app: site
```

## 6. ConfigMap: การจัดการค่าคอนฟิกและตัวแปรสภาพแวดล้อม

![ConfigMap](https://miro.medium.com/v2/resize:fit:1400/0*IqSixgSg53qKT4cv.png)

**ConfigMap** เป็นวิธีการจัดเก็บข้อมูลคอนฟิกที่ไม่เป็นความลับ แยกออกจากการ Deploy ของแอพลิเคชัน ทำให้สามารถใช้ซ้ำและเปลี่ยนแปลงได้โดยไม่ต้อง rebuild image

### ตัวอย่างการสร้าง ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
    name: api-config
data:
    databaseUrl: "redis://db:6379"
    port: "3000"
    env: "production"
```

### การนำ ConfigMap ไปใช้ใน Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: api
    labels:
        app: api
spec:
    replicas: 3
    selector:
        matchLabels:
            app: api
    template:
        metadata:
            labels:
                app: api
        spec:
            containers:
                - name: api
                    image: babelcoder/intro-to-devops-api:1.0
                    env:
                        - name: DATABASE_URL
                            valueFrom:
                                configMapKeyRef:
                                    name: api-config
                                    key: databaseUrl
                        - name: PORT
                            valueFrom:
                                configMapKeyRef:
                                    name: api-config
                                    key: port
                        - name: APP_ENV
                            valueFrom:
                                configMapKeyRef:
                                    name: api-config
                                    key: env
```

ด้วยวิธีนี้ เราสามารถเปลี่ยนแปลงค่าคอนฟิกได้โดยไม่ต้องสร้าง image ใหม่หรือ restart Deployment

## สรุป

Kubernetes เป็นระบบจัดการคอนเทนเนอร์ที่มีประสิทธิภาพและยืดหยุ่น โดยมีองค์ประกอบหลักคือ:

1. **Pods**: หน่วยพื้นฐานที่รันคอนเทนเนอร์
2. **Deployments**: จัดการชุดของ Pods และการอัปเดต
3. **Services**: จัดการการเข้าถึงผ่านเครือข่ายไปยัง Pods
4. **ConfigMaps**: จัดการการตั้งค่าแยกออกจากโค้ดแอพลิเคชัน

ด้วยองค์ประกอบเหล่านี้ Kubernetes ช่วยให้เราสามารถจัดการแอปพลิเคชันที่อยู่ในคอนเทนเนอร์ได้อย่างมีประสิทธิภาพและพร้อมสำหรับการใช้งานจริง

# Horizontal Pod Autoscaler (HPA) ใน Kubernetes

![Kubernetes HPA](https://kubernetes.io/images/docs/horizontal-pod-autoscaler.svg)

## Horizontal Pod Autoscaler คืออะไร?

HorizontalPodAutoscaler (HPA) เป็นทรัพยากรใน Kubernetes ที่ช่วยจัดการจำนวน Pod ของ workload ต่างๆ (เช่น Deployment หรือ StatefulSet) โดยอัตโนมัติ โดยอ้างอิงจากการใช้ทรัพยากรที่กำหนดไว้ เช่น CPU หรือหน่วยความจำ

### การทำงานแบบ Horizontal Scaling

การทำงานของ HPA เป็นแบบ **Horizontal Scaling** คือการเพิ่มหรือลดจำนวน Pod ซึ่งต่างจาก **Vertical Scaling** ที่เพิ่มทรัพยากร (CPU, Memory) ให้แต่ละ Pod

## ขั้นตอนการติดตั้งและใช้งาน HPA

### 1. ติดตั้ง Metrics Server

Metrics Server เป็นส่วนประกอบสำคัญสำหรับ HPA เพราะทำหน้าที่เก็บข้อมูลการใช้ทรัพยากรของ Pod ต่างๆ ในคลัสเตอร์

**สร้างไฟล์ `k8s/hpa-components.yaml`**

```yaml
# เนื้อหาของ Metrics Server YAML ทั้งหมด
# ประกอบด้วย ServiceAccount, ClusterRole, ClusterRoleBinding, Service, Deployment, และ APIService
apiVersion: v1
kind: ServiceAccount
metadata:
    labels:
        k8s-app: metrics-server
    name: metrics-server
    namespace: kube-system
---
# ข้อมูลส่วนอื่นๆ ตามตัวอย่างในไฟล์เดิม...
```

**วิธีติดตั้ง**

```bash
kubectl apply -f k8s/hpa-components.yaml
```

### 2. กำหนดทรัพยากรให้กับ Pod ในแอพพลิเคชัน

การสร้าง HPA จำเป็นต้องกำหนด `resources.requests` ให้กับแต่ละ Pod เพื่อให้ Kubernetes รู้ว่าต้องใช้ทรัพยากรเท่าไหร่ และ HPA จะใช้ค่านี้เป็นฐานในการคำนวณ

**แก้ไขไฟล์ `k8s/deployment.yaml`**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: site
    labels:
        app: site
spec:
    replicas: 1  # เริ่มต้นด้วย Pod 1 ตัว จาก HPA จะช่วยปรับเพิ่ม/ลดให้
    selector:
        matchLabels:
            app: site
    template:
        metadata:
            labels:
                app: site
        spec:
            containers:
                - name: site
                    image: babelcoder/intro-to-devops-ui:1.0
                    resources:  # ส่วนสำคัญสำหรับ HPA
                        limits:
                            memory: "200Mi"  # จำกัดการใช้งานสูงสุด
                            cpu: "200m"
                        requests:
                            memory: "100Mi"  # ทรัพยากรที่ต้องการเริ่มต้น
                            cpu: "100m"
# ส่วนของ api และ db deployment เช่นเดียวกัน...
```

### 3. สร้าง HPA - วิธีที่ 1: ใช้คำสั่ง kubectl

```bash
kubectl autoscale deployment api --cpu-percent=20 --min=1 --max=5
```

**คำอธิบาย**:
- `--cpu-percent=20`: เพิ่ม Pod เมื่อการใช้งาน CPU เฉลี่ยเกิน 20%
- `--min=1`: จำนวน Pod อย่างน้อย 1 ตัว
- `--max=5`: จำนวน Pod มากสุด 5 ตัว

**ตรวจสอบสถานะ HPA**:

```bash
kubectl get hpa
```

ผลลัพธ์จะแสดงข้อมูลดังนี้:
```
NAME   REFERENCE        TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
api    Deployment/api   1%/20%    1         5         1          17m
```

**คำอธิบาย**:
- `TARGETS: 1%/20%` หมายถึง ปัจจุบันใช้ CPU 1% เมื่อเทียบกับที่ตั้งค่าไว้ 20%

### 4. ทดสอบการทำงานของ HPA

#### เพิ่มโหลดให้กับระบบ

สร้างโหลดเพื่อทดสอบการทำงานของ HPA:

```bash
kubectl run -i --tty load-generator --rm --image=busybox:1.28 --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://api:5152/articles; done"
```

**คำสั่งนี้จะ**:
- สร้าง Pod ชั่วคราวชื่อ `load-generator`
- ส่งคำขอไปที่ API endpoint `/articles` ซ้ำๆ ทุก 0.01 วินาที

#### ติดตามการทำงานของ HPA

```bash
kubectl get hpa api --watch
```

เมื่อการใช้งาน CPU เพิ่มขึ้นจนเกิน 20%:
```
NAME   REFERENCE        TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
api    Deployment/api   1%/20%    1         5         1          3s
api    Deployment/api   31%/20%   1         5         2          61s
```

ดูจำนวน Pod ที่เพิ่มขึ้น:
```bash
kubectl get deploy api -w
```

ผลลัพธ์:
```
NAME   READY   UP-TO-DATE   AVAILABLE   AGE
api    2/2     2            2           6d5h
```

#### ทดสอบการลดขนาด

เมื่อหยุดการสร้างโหลด การใช้งาน CPU จะลดลง:
```
NAME   REFERENCE        TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
api    Deployment/api   16%/20%   1         5         2          32m
api    Deployment/api   1%/20%    1         5         2          33m
```

หลังจากนั้นไม่นาน จำนวน Pod จะลดลงโดยอัตโนมัติ:
```
NAME   READY   UP-TO-DATE   AVAILABLE   AGE
api    1/1     1            1           6d5h
```

### 5. สร้าง HPA - วิธีที่ 2: ใช้ไฟล์ YAML (แนะนำ)

วิธีนี้ดีกว่าเพราะอธิบายการตั้งค่าทั้งหมดใน Git ได้

**ลบ HPA เดิมที่สร้างจากคำสั่ง**:
```bash
kubectl delete hpa api
```

**สร้างไฟล์ `k8s/hpa.yaml`**:
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
    name: api
spec:
    scaleTargetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: api
    minReplicas: 1
    maxReplicas: 5
    metrics:
        - type: Resource
            resource:
                name: cpu
                target:
                    type: Utilization
                    averageUtilization: 20
```

**นำ HPA ไปใช้งาน**:
```bash
kubectl apply -f k8s/hpa.yaml
```

## แนวปฏิบัติที่ดี

1. **กำหนดค่า resources.requests อย่างเหมาะสม** - ค่านี้เป็นฐานในการคำนวณเปอร์เซ็นต์การใช้งาน CPU
2. **หลีกเลี่ยงการตั้งค่า CPU threshold ต่ำเกินไป** - อาจทำให้เกิดการสร้าง Pod มากเกินความจำเป็น
3. **ใช้ค่า minReplicas ที่เหมาะสม** - เพื่อรับมือกับโหลดพื้นฐาน
4. **ทดสอบ HPA ก่อนใช้งานจริง** - เพื่อให้แน่ใจว่าการตั้งค่าเหมาะสมกับแอปพลิเคชันของคุณ

## ข้อควรระวัง

- HPA อาจใช้เวลาสักครู่ในการตอบสนองต่อการเปลี่ยนแปลงโหลด
- การตั้งค่า resources.requests ต่ำเกินไปอาจทำให้การคำนวณเปอร์เซ็นต์การใช้งานไม่ถูกต้อง
- ไม่ควรใช้ HPA กับแอปพลิเคชันที่มีสถานะ (stateful) โดยไม่มีการวางแผนที่ดี

![HPA Scaling Diagram](https://d33wubrfki0l68.cloudfront.net/4fe1ef7265a93f5f564bd3fbb0269ebd10b73b4e/1775d/images/docs/horizontal-pod-autoscaler.svg)


![Kubernetes Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/791px-Kubernetes_logo_without_workmark.svg.png)

## ดาวน์โหลดซอร์สโค้ด
[ดาวน์โหลด K8s.zip](https://www.dropbox.com/scl/fi/vdb5qc9xem06w0org0qor/k8s.zip?rlkey=qg0ceg9l8wujoproxpn9480yq&st=drppgsqg&dl=0)

## 1. Container Orchestration คืออะไร?

![Container Orchestration](https://cdn.prod.website-files.com/5ff66329429d880392f6cba2/63bee7de323e0503981d88f9_What%20Is%20Container%20Orchestration.jpg)

**Container Orchestration** เป็นระบบที่จัดการกลุ่มของคอนเทนเนอร์โดยอัตโนมัติ แก้ปัญหาต่างๆ ที่การใช้งาน Docker เพียงอย่างเดียวไม่สามารถแก้ไขได้ เช่น:

- การสเกลอัตโนมัติเมื่อโหลดเพิ่มขึ้น
- การจัดการเครือข่ายระหว่างคอนเทนเนอร์ที่กระจายตัว
- การตรวจสอบสถานะและรีสตาร์ทเมื่อเกิดปัญหา
- การอัปเดตแบบ zero-downtime

### สถาปัตยกรรม Kubernetes

![Kubernetes Architecture](https://d33wubrfki0l68.cloudfront.net/2475489eaf20163ec0f54ddc1d92aa8d4c87c96b/e7c81/images/docs/components-of-kubernetes.svg)

Kubernetes ประกอบด้วยส่วนหลักๆ ดังนี้:

**Control Plane (ส่วนควบคุม):**
- **kube-apiserver:** API Server ที่เป็นจุดติดต่อของระบบ
- **kube-scheduler:** จัดการการกำหนด Pod ไปยัง Node ที่เหมาะสม
- **kube-controller-manager:** ควบคุมสถานะของระบบให้เป็นไปตามที่กำหนด
- **etcd:** ฐานข้อมูลเก็บสถานะของคลัสเตอร์
- **cloud-controller-manager:** เชื่อมต่อกับ Cloud Provider API

**Node (เครื่องปฏิบัติการ):**
- **kubelet:** ตัวแทนที่ทำงานบนแต่ละ Node เพื่อจัดการคอนเทนเนอร์
- **kube-proxy:** จัดการเครือข่ายและการเชื่อมต่อ
- **Container Runtime:** เช่น Docker ที่รันคอนเทนเนอร์จริงๆ

## 2. Pods: หน่วยพื้นฐานของ Kubernetes

![Pods](https://d33wubrfki0l68.cloudfront.net/aecab1f649bc640ebef1f05581bfcc91a48038c4/728d6/images/docs/pod.svg)

**Pod** คือหน่วยเล็กที่สุดที่สามารถสร้างและจัดการได้ใน Kubernetes โดยแต่ละ Pod จะประกอบด้วยหนึ่งหรือหลายคอนเทนเนอร์ที่แบ่งปันทรัพยากรและเครือข่ายร่วมกัน

Pod ใช้งานได้สองรูปแบบหลัก:
1. **Single-container Pod:** Pod ที่มีคอนเทนเนอร์เพียงตัวเดียว
2. **Multi-container Pod:** Pod ที่มีหลายคอนเทนเนอร์ทำงานร่วมกัน

### ตัวอย่างการสร้าง Pod

```bash
# สร้าง Pod ชื่อ "site" ที่รัน image babelcoder/intro-to-devops-ui:1.0
kubectl run site --image=babelcoder/intro-to-devops-ui:1.0

# ตรวจสอบสถานะ Pod
kubectl get pod
```

ผลลัพธ์:
```
NAME   READY   STATUS    RESTARTS   AGE
site   1/1     Running   0          2m1s
```

### การเข้าถึง Pod ผ่าน Port Forwarding

```bash
kubectl port-forward site 5151:80
```

คำสั่งนี้ทำให้เราสามารถเข้าถึง Pod ผ่าน `http://localhost:5151`


## 3. Multi-Container Design Patterns

เมื่อมีคอนเทนเนอร์หลายตัวใน Pod เดียวกัน เราสามารถออกแบบรูปแบบการทำงานร่วมกันได้หลายแบบ:

### 3.1 Init Containers

![Init Containers](https://drek4537l1klr.cloudfront.net/stoneman2/v-7/Figures/02-08_img_0105.jpg)

คอนเทนเนอร์ตัวหนึ่งทำหน้าที่เตรียมข้อมูล/สภาพแวดล้อมก่อนที่คอนเทนเนอร์หลักจะเริ่มทำงาน เช่น:
- การสร้างไฟล์คอนฟิก
- การตรวจสอบว่าเซอร์วิสอื่นๆ พร้อมแล้ว
- การดาวน์โหลดข้อมูลที่จำเป็น

### 3.2 Ambassador Pattern

![Ambassador Pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/_images/ambassador.png)

คอนเทนเนอร์ "ทูต" ที่ทำหน้าที่เป็นตัวกลางในการติดต่อกับบริการภายนอก:
- เช่น แอปพลิเคชันที่เขียนให้เชื่อมต่อกับ `localhost:6379` แต่ Redis จริงๆ อยู่ที่ `redis:6379`
- Ambassador Proxy จะรับการเชื่อมต่อจาก `localhost:6379` แล้วส่งต่อไปยัง `redis:6379`

### 3.3 Sidecar Pattern

![Sidecar Pattern](https://media.licdn.com/dms/image/v2/D4E12AQFd288_c78Xmg/article-inline_image-shrink_1500_2232/article-inline_image-shrink_1500_2232/0/1686865725271?e=1753315200&v=beta&t=wuOCzt77b6zQ-fABYWFxp7eFwuCF3aHy75vhd5l_B8U)

คอนเทนเนอร์เสริมที่ทำงานคู่กับคอนเทนเนอร์หลัก แต่มีหน้าที่แยกกัน:
- เช่น คอนเทนเนอร์ที่เก็บและส่งล็อก
- คอนเทนเนอร์ที่ทำการซิงค์ไฟล์
- คอนเทนเนอร์ที่ทำ monitoring

### 3.4 Adapter Pattern

![Adapter Pattern](https://media.geeksforgeeks.org/wp-content/uploads/20240204210126/Class-Diagram-of-Adapter-Design-Pattern_.webp)

คล้ายกับ Sidecar แต่เน้นการแปลงข้อมูล:
- เช่น แปลง format ของ log files
- แปลงรูปแบบ metrics ให้เข้ากับระบบ monitoring

## 4. Deployments: การจัดการ Pod ในระดับที่สูงขึ้น

![Deployment ReplicaSet Pods](https://d33wubrfki0l68.cloudfront.net/152c845f25df8e69dd24dd7b0836a289747e258a/4a1d2/docs/tutorials/kubernetes-basics/public/images/module_02_first_app.svg)

การสร้าง Pod โดยตรงมีข้อจำกัด เช่น ไม่มีการรีสตาร์ทอัตโนมัติเมื่อ Pod ล้มเหลว Kubernetes จึงมี **ReplicaSet** และ **Deployment**:

- **ReplicaSet:** ควบคุมจำนวน Pod ให้คงที่ตามที่กำหนด
- **Deployment:** ควบคุม ReplicaSet เพื่อจัดการการอัปเดตและ rollback

การทำงานของ Deployment จะใช้ **Labels** เพื่อระบุว่า Pod ใดอยู่ภายใต้การควบคุม:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: site-deployment
    labels:
        app: site
spec:
    replicas: 3  # จำนวน Pod ที่ต้องการให้ทำงาน
    selector:
        matchLabels:
            app: site  # ค้นหา Pod ที่มี label app=site
    template:
        metadata:
            labels:
                app: site  # กำหนด label ให้กับ Pod ที่สร้างขึ้น
        spec:
            containers:
            - name: site
                image: babelcoder/intro-to-devops-ui:1.0
```

![Label Selector](https://i0.wp.com/theithollow.com/wp-content/uploads/2019/01/image-13.png?resize=1024%2C436&ssl=1)

## 5. Services: การเข้าถึง Pod ผ่านเครือข่าย

![Service](https://miro.medium.com/v2/resize:fit:578/0*K6fOlxtXDEC2BtpQ.png)

**Services** เป็นวิธีการเข้าถึง Pod ที่ทนทานต่อการเปลี่ยนแปลง แม้ว่า Pod จะมี IP ที่เปลี่ยนไปเมื่อรีสตาร์ท แต่ Service จะยังคงมี IP ที่คงที่

### 5.1 ClusterIP (ค่าเริ่มต้น)

![Cluster IP](https://miro.medium.com/v2/resize:fit:1200/1*dLlC4L2qpImyZS6gOntUjg.png)

- เข้าถึงได้เฉพาะภายใน Cluster
- ใช้สำหรับการสื่อสารระหว่าง Pod ภายในคลัสเตอร์

```yaml
apiVersion: v1
kind: Service
metadata:
    name: db
    labels:
        app: db
spec:
    ports:
        - port: 6379        # พอร์ตของ Service
            protocol: TCP
            targetPort: 6379  # พอร์ตของ Pod ปลายทาง
    selector:
        app: db             # เลือก Pod ที่มี label app=db
```

การทดสอบ:
```bash
# สร้าง Pod ชั่วคราวเพื่อทดสอบ
kubectl run busybox --rm --restart Never -it --image=busybox

# ทดสอบเชื่อมต่อไปยัง Service ชื่อ db
/ # telnet db 6379
Connected to db
```

### 5.2 NodePort

![Node Port](https://zesty.co/wp-content/uploads/2025/02/nodeport.png)

- เปิดพอร์ตบนทุก Node เพื่อให้เข้าถึงได้จากภายนอก
- พอร์ตจะถูกเลือกโดยอัตโนมัติในช่วง 30000-32767

```yaml
apiVersion: v1
kind: Service
metadata:
    name: site
    labels:
        app: site
spec:
    type: NodePort       # ระบุประเภทเป็น NodePort
    ports:
        - port: 5152       # พอร์ตภายใน Cluster
            protocol: TCP
            targetPort: 3000 # พอร์ตของ Pod
    selector:
        app: site
```

การเข้าถึง:
```
http://<NODE_IP>:32074  # พอร์ตที่ถูกสุ่มเลือก
```

### 5.3 LoadBalancer

![Load Balancer](https://www.densify.com/wp-content/uploads/article-k8s-capacity-kubernetes-service-overview.svg)

- สร้าง Load Balancer บนระบบคลาวด์ (AWS, GCP, Azure)
- เหมาะสำหรับการเข้าถึงจากภายนอกในระบบ Production

```yaml
apiVersion: v1
kind: Service
metadata:
    name: site
    labels:
        app: site
spec:
    type: LoadBalancer  # ระบุประเภทเป็น LoadBalancer
    ports:
        - port: 5151      # พอร์ตที่ LoadBalancer รับทราฟฟิก
            protocol: TCP
            targetPort: 80  # พอร์ตของ Pod
    selector:
        app: site
```

## 6. ConfigMap: การจัดการค่าคอนฟิกและตัวแปรสภาพแวดล้อม

![ConfigMap](https://miro.medium.com/v2/resize:fit:1400/0*IqSixgSg53qKT4cv.png)

**ConfigMap** เป็นวิธีการจัดเก็บข้อมูลคอนฟิกที่ไม่เป็นความลับ แยกออกจากการ Deploy ของแอพลิเคชัน ทำให้สามารถใช้ซ้ำและเปลี่ยนแปลงได้โดยไม่ต้อง rebuild image

### ตัวอย่างการสร้าง ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
    name: api-config
data:
    databaseUrl: "redis://db:6379"
    port: "3000"
    env: "production"
```

### การนำ ConfigMap ไปใช้ใน Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: api
    labels:
        app: api
spec:
    replicas: 3
    selector:
        matchLabels:
            app: api
    template:
        metadata:
            labels:
                app: api
        spec:
            containers:
                - name: api
                    image: babelcoder/intro-to-devops-api:1.0
                    env:
                        - name: DATABASE_URL
                            valueFrom:
                                configMapKeyRef:
                                    name: api-config
                                    key: databaseUrl
                        - name: PORT
                            valueFrom:
                                configMapKeyRef:
                                    name: api-config
                                    key: port
                        - name: APP_ENV
                            valueFrom:
                                configMapKeyRef:
                                    name: api-config
                                    key: env
```

ด้วยวิธีนี้ เราสามารถเปลี่ยนแปลงค่าคอนฟิกได้โดยไม่ต้องสร้าง image ใหม่หรือ restart Deployment

## สรุป

Kubernetes เป็นระบบจัดการคอนเทนเนอร์ที่มีประสิทธิภาพและยืดหยุ่น โดยมีองค์ประกอบหลักคือ:

1. **Pods**: หน่วยพื้นฐานที่รันคอนเทนเนอร์
2. **Deployments**: จัดการชุดของ Pods และการอัปเดต
3. **Services**: จัดการการเข้าถึงผ่านเครือข่ายไปยัง Pods
4. **ConfigMaps**: จัดการการตั้งค่าแยกออกจากโค้ดแอพลิเคชัน

ด้วยองค์ประกอบเหล่านี้ Kubernetes ช่วยให้เราสามารถจัดการแอปพลิเคชันที่อยู่ในคอนเทนเนอร์ได้อย่างมีประสิทธิภาพและพร้อมสำหรับการใช้งานจริง

## เข้าใจ CI/CD เบื้องต้น

CI/CD เป็นคำย่อของ **Continuous Integration** และ **Continuous Delivery/Deployment** ซึ่งเป็นแนวทางปฏิบัติในการพัฒนาซอฟต์แวร์ที่ช่วยทำให้การส่งมอบโค้ดจากนักพัฒนาไปสู่ผู้ใช้งานเป็นไปอย่างรวดเร็วและมีประสิทธิภาพ

![CI/CD Pipeline Overview](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa0392cd2-a9b4-4c12-8c12-5250127d7df2_1280x1679.jpeg)

### Continuous Integration (CI)

**CI** เป็นกระบวนการที่ทำให้นักพัฒนาสามารถรวมโค้ดเข้าด้วยกันบ่อยๆ โดยไม่ต้องกังวลว่าจะเกิดปัญหา เพราะมีระบบอัตโนมัติคอยตรวจสอบและทดสอบโค้ดให้ทุกครั้ง

**ประโยชน์ของ CI:**
- ตรวจจับข้อผิดพลาดได้เร็วขึ้น
- ลดความเสี่ยงในการรวมโค้ดที่มีปัญหา
- ทำให้โค้ดมีคุณภาพดีขึ้นผ่านการทดสอบอัตโนมัติ
- ทีมสามารถพัฒนาได้อย่างต่อเนื่องและรวดเร็ว

### Continuous Delivery/Deployment (CD)

**Continuous Delivery** คือการทำให้ซอฟต์แวร์พร้อมที่จะนำขึ้น Production ได้ตลอดเวลา แต่ยังต้องมีคนกดปุ่ม Deploy

**Continuous Deployment** คือการนำซอฟต์แวร์ขึ้น Production โดยอัตโนมัติ หลังจากผ่านการทดสอบทั้งหมด โดยไม่ต้องมีคนมากดปุ่ม

**ความแตกต่าง:**
- Continuous Delivery: พร้อมส่งมอบ (แต่ยังต้องมีคนตัดสินใจ Deploy)
- Continuous Deployment: ส่งมอบอัตโนมัติ (ทุกการเปลี่ยนแปลงที่ผ่านการทดสอบจะถูก Deploy อัตโนมัติ)

## การใช้ GitHub Actions สำหรับ CI/CD

[GitHub Actions](https://github.com/features/actions) เป็นเครื่องมือที่ GitHub ให้บริการเพื่อสร้างระบบ CI/CD ในโปรเจคของคุณ โดยคุณสามารถกำหนด Workflow ที่จะทำงานเมื่อมีเหตุการณ์ (Event) เกิดขึ้นในโปรเจค เช่น เมื่อมีการ push โค้ด หรือมีการสร้าง Pull Request

### 1. การสร้าง Continuous Integration (CI) ด้วย GitHub Actions

ตัวอย่างนี้เป็นการสร้าง Workflow ที่จะทำงานเมื่อมีการ push โค้ดไปยัง Repository

```yaml
name: CI
on: [push]
jobs:
    main:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
                with:
                    fetch-depth: 0
            - name: Use Node.js
                uses: actions/setup-node@v4
                with:
                    node-version: "20.x"
            - name: Install site dependencies
                run: cd site && npm ci
            - name: Test site
                run: cd site && npm test
            - name: Setup Go 1.21.x
                uses: actions/setup-go@v4
                with:
                    go-version: "1.21.x"
            - name: Install api dependencies
                run: cd api && go mod download
            - name: Test api
                run: cd api && go test ./...
```

**คำอธิบาย Workflow CI:**
1. **name: CI** - ชื่อของ Workflow
2. **on: [push]** - เหตุการณ์ที่จะทริกเกอร์ Workflow (ในที่นี้คือเมื่อมีการ push โค้ด)
3. **jobs** - งานที่จะทำใน Workflow
4. **runs-on: ubuntu-latest** - ระบบปฏิบัติการที่จะรัน Workflow
5. **steps** - ขั้นตอนการทำงานทั้งหมด ซึ่งประกอบด้วย:
     - **Checkout** - ดึงโค้ดจาก Repository
     - **Setup Node.js** - ติดตั้ง Node.js
     - **Install & Test site** - ติดตั้ง dependencies และทดสอบส่วน Frontend
     - **Setup Go** - ติดตั้ง Go
     - **Install & Test API** - ติดตั้ง dependencies และทดสอบส่วน Backend API

### 2. การสร้าง Continuous Delivery (CD) ด้วย GitHub Actions

ตัวอย่างต่อไปนี้เป็นการสร้าง Workflow ที่จะ Build Docker Image และ Push ไปยัง Docker Hub เมื่อมีการ push โค้ดไปยัง branch main

```yaml
name: CD
on:
    push:
        branches:
            - main
jobs:
    push_to_registry:
        runs-on: ubuntu-latest
        steps:
            - name: Check out the repo
                uses: actions/checkout@v4
            - name: Set up QEMU
                uses: docker/setup-qemu-action@v3
            - name: Set up Docker Buildx
                uses: docker/setup-buildx-action@v3

            - name: Log in to Docker Hub
                uses: docker/login-action@v3
                with:
                    username: ${{ secrets.DOCKERHUB_USERNAME  }}
                    password: ${{ secrets.DOCKERHUB_TOKEN  }}

            - name: Read Config
                id: config
                run: |
                    echo "site_version=$(cat ./site/version)" >> "$GITHUB_OUTPUT"
                    echo "api_version=$(cat ./site/version)" >> "$GITHUB_OUTPUT"

            - name: Build and push API
                uses: docker/build-push-action@v5
                with:
                    context: ./api
                    push: true
                    tags: babelcoder/intro-to-devops-api:${{steps.config.outputs.api_version}}

            - name: Build and push Site
                uses: docker/build-push-action@v5
                with:
                    context: ./site
                    push: true
                    tags: babelcoder/intro-to-devops-ui:${{steps.config.outputs.site_version}}
```

**คำอธิบาย Workflow CD:**
1. **name: CD** - ชื่อของ Workflow
2. **on: push: branches: [main]** - เหตุการณ์ที่จะทริกเกอร์ Workflow (ในที่นี้คือเมื่อมีการ push โค้ดไปยัง branch main)
3. **steps** - ขั้นตอนการทำงาน:
     - **Checkout** - ดึงโค้ดจาก Repository
     - **Setup Docker** - เตรียมสภาพแวดล้อมสำหรับ Docker
     - **Login to Docker Hub** - เข้าสู่ระบบ Docker Hub โดยใช้ Secrets ที่เก็บไว้ใน GitHub
     - **Read Config** - อ่านข้อมูล version ของ API และ Site
     - **Build and push** - สร้าง Docker Image และ Push ไปยัง Docker Hub

![Docker Hub Workflow](https://www.researchgate.net/profile/Daniele-Alma/publication/369734677/figure/fig6/AS:11431281135911839@1680491010032/Docker-Hub-workflow-pipeline.png)

### 3. การสร้าง Continuous Deployment ด้วย GitHub Actions

ตัวอย่างนี้จะแสดงการสร้าง Workflow ที่จะ Deploy โปรเจคโดยใช้ Terraform และ Docker Compose เมื่อมีการ push โค้ดไปยัง branch main

```yaml
name: CD
on:
    push:
        branches:
            - main
env:
    TF_CLI_CONFIG_FILE: "./.terraformrc"
jobs:
    deployment:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: hashicorp/setup-terraform@v3

            - name: Setup Terraform Config File
                id: terraform-config
                run: |-
                    cat > .terraformrc <<EOF
                    credentials "app.terraform.io" {
                        token = "${{ secrets.TF_API_TOKEN }}"
                    }
                    EOF

            - name: Terraform Init
                id: init
                run: TF_CLI_CONFIG_FILE=${{env.TF_CLI_CONFIG_FILE}} terraform init

            - name: Terraform Validate
                id: validate
                run: terraform validate -no-color

            - name: Terraform Plan
                id: plan
                run: TF_CLI_CONFIG_FILE=${{env.TF_CLI_CONFIG_FILE}} terraform plan -no-color

            - name: Terraform Apply
                id: apply
                run: TF_CLI_CONFIG_FILE=${{env.TF_CLI_CONFIG_FILE}} terraform apply -auto-approve -no-color

            - name: Terraform Output
                id: output
                run: terraform output | sed -r 's/.+"([0-9,\.]+)"/ip=\1/' >> "$GITHUB_OUTPUT"

            - name: Check SSH Port Alive
                id: check-ssh-alive
                run: |
                    while ! nc -z ${{ steps.output.outputs.ip }} 22; do
                        sleep 1
                        echo "port not response"
                    done

            - name: Read Config
                id: config
                run: |
                    docker_content=$(cat ./docker-compose.yml)
                    echo "docker_content<<EOF" >> "$GITHUB_OUTPUT"
                    echo "$docker_content" >> "$GITHUB_OUTPUT"
                    echo "EOF" >> "$GITHUB_OUTPUT"

                    kong_content=$(cat ./kong/kong.yml)
                    echo "kong_content<<EOF" >> "$GITHUB_OUTPUT"
                    echo "$kong_content" >> "$GITHUB_OUTPUT"
                    echo "EOF" >> "$GITHUB_OUTPUT"

            - name: Deploy
                id: deploy
                uses: appleboy/ssh-action@v1.0.3
                with:
                    host: ${{ steps.output.outputs.ip }}
                    username: root
                    key: ${{ secrets.SSH_KEY }}
                    script: |
                        docker compose down

                        rm -f ./docker-compose.yml

                        mkdir -p ./kong
                        cat > ./kong/kong.yml <<EOF
                        ${{steps.config.outputs.kong_content}}
                        EOF
                        cat > ./docker-compose.yml <<EOF
                        ${{steps.config.outputs.docker_content}}
                        EOF

                        docker compose up -d
```

**คำอธิบาย Workflow Continuous Deployment:**

1. **การเตรียม Terraform**:
     - ติดตั้ง Terraform
     - สร้างไฟล์ config สำหรับ Terraform ที่มี token สำหรับการเข้าถึง Terraform Cloud

2. **การทำงานกับ Terraform**:
     - `terraform init` - เริ่มต้น Terraform project
     - `terraform validate` - ตรวจสอบ syntax ของไฟล์ Terraform
     - `terraform plan` - วางแผนการสร้าง infrastructure
     - `terraform apply` - สร้าง infrastructure ตามที่กำหนดไว้ใน code
     - `terraform output` - ดึงค่า output (เช่น IP address) จาก Terraform

3. **การตรวจสอบ Server**:
     - รอให้ port SSH (port 22) เปิดใช้งานได้ก่อนดำเนินการต่อ

4. **การอ่านไฟล์ Config**:
     - อ่านไฟล์ `docker-compose.yml` และ `kong/kong.yml` เพื่อเตรียมสำหรับการ deploy

5. **การ Deploy**:
     - ใช้ SSH เพื่อเชื่อมต่อไปยัง server
     - หยุดการทำงานของ containers เดิม (`docker compose down`)
     - สร้างไฟล์ config ใหม่ (`docker-compose.yml` และ `kong/kong.yml`)
     - เริ่มการทำงานของ containers ใหม่ (`docker compose up -d`)

![Infrastructure as Code](https://cdn.hashnode.com/res/hashnode/image/upload/v1683046135334/1af0095a-e1b1-4328-bde9-1fd662931423.jpeg)

## สรุป

การใช้ CI/CD ช่วยให้ทีมพัฒนาสามารถส่งมอบซอฟต์แวร์ได้เร็วขึ้น มีคุณภาพดีขึ้น และลดความเสี่ยงในการเกิดปัญหาเมื่อนำขึ้น Production โดย GitHub Actions เป็นเครื่องมือที่ทรงพลังและใช้งานง่ายสำหรับการสร้างระบบ CI/CD ใน GitHub Repository

**Tips สำหรับการเริ่มต้นใช้งาน CI/CD:**
1. เริ่มจากการทำ CI ก่อน (การทดสอบอัตโนมัติ)
2. ค่อยๆ เพิ่ม CD เมื่อทีมมีความคุ้นเคยกับ CI แล้ว
3. ใช้ Secrets ในการเก็บข้อมูลที่สำคัญ อย่าเก็บไว้ในโค้ดโดยตรง
4. ทำให้ Workflow เป็นส่วนสำคัญของกระบวนการพัฒนาซอฟต์แวร์

### ทรัพยากรเพิ่มเติม
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Terraform Documentation](https://www.terraform.io/docs)
- [Docker Documentation](https://docs.docker.com/)