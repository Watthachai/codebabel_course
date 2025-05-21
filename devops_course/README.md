# คอร์สอบรม DevOps - หลักสูตรระยะสั้น กระชับ เน้น Workshop

## 📚 เนื้อหาหลักสูตร
- [DevOps คืออะไร](documents/document_course_details.md#devops---คู่มือฉบับเข้าใจง่าย)
- [เทคโนโลยี Cloud Computing](#เทคโนโลยี-cloud-computing)
- [Microservices](#microservices)
    - [Microservices Workshop](#microservices-workshop)
- [เทคโนโลยีคอนเทนเนอร์](#เทคโนโลยีคอนเทนเนอร์)
    - [Docker](#docker)
    - [Docker Workshop](#docker-workshop)
    - [Kong API Gateway](#kong-api-gateway)
- [GitOps](#gitops)
    - [Infrastructure as Code และ Terraform](#infrastructure-as-code-และ-terraform)
    - [GitOps คืออะไร](#gitops-คืออะไร)
    - [CI / CD](#ci--cd)
    - [CI / CD Workshop](#ci--cd-workshop)
- [Logging และ Monitoring](#logging-และ-monitoring)
- [Kubernetes](#kubernetes)
    - [Kubernetes Workshop](#kubernetes-workshop)
    - [Horizontal Pod Autoscaler](#horizontal-pod-autoscaler)
- [บทส่งท้าย](#บทส่งท้าย)
    - [วัฒนธรรมองค์กรของ DevOps](#วัฒนธรรมองค์กรของ-devops)

## 🎥 บันทึกการสอน
1. [แนะนำคอร์ส](#1-แนะนำคอร์ส)
2. [DevOps คืออะไร](#2-devops-คืออะไร)
3. [Cloud Computing](#3-cloud-computing)
4. [Microservices](#4-microservices)
5. [Microservices Workshop](#5-microservices-workshop)
6. [Docker และ Docker Compose](#6-docker-และ-docker-compose)
7. [Docker Build และ Push](#7-docker-build-และ-push)
8. [Kong Gateway API](#8-kong-gateway-api)
9. [Terraform](#9-terraform)
10. [ทบทวนเนื้อหาวันแรก](#10-ทบทวนเนื้อหาวันแรก)
11. [GitOps](#11-gitops)
12. [Continuous Integration Flow](#12-continuous-integration-flow)
13. [Continuous Delivery Flow](#13-continuous-delivery-flow)
14. [Continuous Deployment Flow](#14-continuous-deployment-flow)
15. [Kubernetes](#15-kubernetes)
16. [HPA](#16-hpa)
17. [Datadog](#17-datadog)
18. [บทส่งท้าย](#18-บทส่งท้าย)

## 📝 รายละเอียดคอร์ส

DevOps เป็นหนึ่งในแนวปฏิบัติที่สำคัญขององค์กร IT ยุคใหม่ เพื่อการพัฒนาซอฟต์แวร์ที่เน้นการรวมการพัฒนาซอฟต์แวร์ (Dev) และ IT operations (Ops) ผ่านเครื่องมือ แนวคิดและการเน้นขั้นตอนการทำงานแบบอัตโนมัติ อันจะนำไปสู่การนำผลิตภัณฑ์ที่ดีกว่าให้กับลูกค้าได้เร็วขึ้น

### 🎯 หลักสูตรนี้ครอบคลุม:
* ภาพรวมของ DevOps และการประยุกต์ใช้เครื่องมือต่างๆ
* การใช้งาน Docker, Kubernetes, Terraform, Kong API Gateway, DataDog
* การทำงานกับ Git และ Github Workflow
* หลักการสำคัญเช่น Cloud Computing, Microservices, CI/CD, GitOps
* เทคนิคการทำ Logging, Tracing และ Monitoring

### 🚀 เนื้อหาแบ่งเป็นหมวดหมู่:
1. **พื้นฐาน DevOps:** ความหมาย, ประโยชน์, คำศัพท์สำคัญ และการปรับเปลี่ยนทีม
2. **Cloud Computing & Microservices:** การออกแบบ Cloud Native, Microservices และการสื่อสารระหว่างเซอร์วิส
3. **Container Technology:** การใช้งาน Docker, Images, Dockerfile และ Docker Compose
4. **API Gateway:** การใช้งาน Kong API Gateway
5. **GitOps & CI/CD:** หลักการของ GitOps, Infrastructure as Code ด้วย Terraform
6. **Logging & Monitoring:** การใช้งาน Datadog สำหรับติดตามระบบ
7. **Kubernetes:** Container Orchestration, การใช้งาน Pods, Deployments, Services และ Autoscaling

## 💼 จุดประสงค์การเรียนรู้
* เข้าใจหลักการของ DevOps และการปรับเปลี่ยนองค์กร
* เข้าใจ Cloud Computing และการออกแบบ Microservices
* สามารถใช้ Docker สร้าง Containers และ Images ได้
* เข้าใจ API Gateway และการใช้งาน Kong
* สามารถใช้ Terraform สำหรับ Infrastructure as Code
* เข้าใจ GitOps และการสร้าง CI/CD pipeline
* เข้าใจการทำ Logging, Monitoring ด้วย Datadog
* ทราบหลักการของ Kubernetes และการใช้งานเบื้องต้น

## 👨‍💻 คอร์สนี้เหมาะกับใคร
* ผู้ที่ต้องการเรียนรู้ DevOps อย่างครอบคลุมในเวลาสั้นๆ
* นักพัฒนาที่สนใจเรื่อง DevOps
* นักวิเคราะห์ระบบที่ต้องการเข้าใจภาพรวมด้าน IT
* องค์กรที่ต้องการปรับเปลี่ยนสู่แนวทาง DevOps
* นักศึกษาหรือผู้สนใจที่มีพื้นฐานการพัฒนาซอฟต์แวร์

## 📋 ความรู้พื้นฐานที่จำเป็น
* สามารถใช้คอมพิวเตอร์พื้นฐานได้
* มีความรู้พื้นฐานด้านกระบวนการพัฒนาซอฟต์แวร์ (SDLC)
* มีความรู้เบื้องต้นเกี่ยวกับ Git