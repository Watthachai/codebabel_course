# Kubernetes Workshop: บัญชีระบบ Microservices

## โจทย์: สร้างระบบบัญชีบน Kubernetes

เราต้องการสร้างระบบบัญชีที่ประกอบด้วย microservices หลายตัวทำงานร่วมกันบน Kubernetes

## โครงสร้างระบบ

ระบบของเราประกอบด้วย microservices 5 ตัว แต่ละตัวมีหน้าที่เฉพาะดังนี้:

| Service | หน้าที่ | Port | การเข้าถึง | Docker Image | Replicas |
|---------|--------|------|------------|--------------|----------|
| **Site** | UI สำหรับแสดงผลบนเว็บเบราว์เซอร์ | 80 | ภายในและภายนอก Cluster | babelcoder-accounting/site:1.0 | 5 |
| **Revenue Cycle** | จัดการวงจรรายได้ เช่น รายได้จากการขาย | 5121 | เฉพาะภายใน Cluster | babelcoder-accounting/revenue:1.0 | 3 |
| **Tax Calculator** | คำนวณภาษีประเภทต่างๆ | 5122 | เฉพาะภายใน Cluster | babelcoder-accounting/tax:1.0 | 2 |
| **Report** | ออกรายงานทางการเงิน | 5123 | เฉพาะภายใน Cluster | babelcoder-accounting/report:1.0 | 2 |
| **Email** | ส่งอีเมลไปยังปลายทาง | 5124 | เฉพาะภายใน Cluster | babelcoder-accounting/email:1.0 | 3 |

## แผนภาพโครงสร้างระบบ

```
                           ┌───────────────────────────────────────────────┐
                           │                                               │
                           │                  Kubernetes Cluster           │
                           │                                               │
     Internet              │                                               │
        │                  │   ┌─────────────┐      ┌───────────────┐      │
        │                  │   │             │      │               │      │
        ▼                  │   │             │      │ Revenue Cycle │      │
┌───────────────┐          │   │    Site     │─────▶│  (Port 5121)  │      │
│               │          │   │ (Port 80)   │      │               │      │
│     User      │─────────▶│   │             │      └───────┬───────┘      │
│               │          │   │             │              │              │
└───────────────┘          │   └──────┬──────┘              ▼              │
                           │          │            ┌───────────────┐       │
                           │          │            │               │       │
                           │          │            │Tax Calculator │       │
                           │          │            │  (Port 5122)  │       │
                           │          │            │               │       │
                           │          │            └───────┬───────┘       │
                           │          │                    │               │
                           │          │                    ▼               │
                           │          │            ┌───────────────┐       │
                           │          └───────────▶│               │       │
                           │                       │    Report     │       │
                           │                       │  (Port 5123)  │       │
                           │                       │               │       │
                           │                       └───────┬───────┘       │
                           │                               │               │
                           │                               ▼               │
                           │                       ┌───────────────┐       │
                           │                       │               │       │
                           │                       │     Email     │       │
                           │                       │  (Port 5124)  │       │
                           │                       │               │       │
                           │                       └───────────────┘       │
                           │                                               │
                           └───────────────────────────────────────────────┘
```

## สร้างไฟล์ YAML สำหรับการ Deploy

เราจะแบ่งการ deploy ออกเป็นไฟล์ YAML แยกตามเซอร์วิส:

### 1. Site Service (site.yaml)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: site-deployment
  labels:
    app: site
spec:
  replicas: 5
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
        image: babelcoder-accounting/site:1.0
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: site-service
spec:
  type: LoadBalancer  # เข้าถึงได้จากภายนอก
  ports:
  - port: 80
    targetPort: 80
  selector:
    app: site
```

### 2. Revenue Cycle Service (revenue.yaml)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: revenue-deployment
  labels:
    app: revenue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: revenue
  template:
    metadata:
      labels:
        app: revenue
    spec:
      containers:
      - name: revenue
        image: babelcoder-accounting/revenue:1.0
        ports:
        - containerPort: 5121
---
apiVersion: v1
kind: Service
metadata:
  name: revenue-service
spec:
  type: ClusterIP  # เข้าถึงได้เฉพาะภายใน cluster
  ports:
  - port: 5121
    targetPort: 5121
  selector:
    app: revenue
```

### 3. Tax Calculator Service (tax.yaml)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tax-deployment
  labels:
    app: tax
spec:
  replicas: 2
  selector:
    matchLabels:
      app: tax
  template:
    metadata:
      labels:
        app: tax
    spec:
      containers:
      - name: tax
        image: babelcoder-accounting/tax:1.0
        ports:
        - containerPort: 5122
---
apiVersion: v1
kind: Service
metadata:
  name: tax-service
spec:
  type: ClusterIP
  ports:
  - port: 5122
    targetPort: 5122
  selector:
    app: tax
```

### 4. Report Service (report.yaml)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: report-deployment
  labels:
    app: report
spec:
  replicas: 2
  selector:
    matchLabels:
      app: report
  template:
    metadata:
      labels:
        app: report
    spec:
      containers:
      - name: report
        image: babelcoder-accounting/report:1.0
        ports:
        - containerPort: 5123
---
apiVersion: v1
kind: Service
metadata:
  name: report-service
spec:
  type: ClusterIP
  ports:
  - port: 5123
    targetPort: 5123
  selector:
    app: report
```

### 5. Email Service (email.yaml)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: email-deployment
  labels:
    app: email
spec:
  replicas: 3
  selector:
    matchLabels:
      app: email
  template:
    metadata:
      labels:
        app: email
    spec:
      containers:
      - name: email
        image: babelcoder-accounting/email:1.0
        ports:
        - containerPort: 5124
---
apiVersion: v1
kind: Service
metadata:
  name: email-service
spec:
  type: ClusterIP
  ports:
  - port: 5124
    targetPort: 5124
  selector:
    app: email
```

## วิธีการ Deploy

1. สร้างไฟล์ YAML ทั้ง 5 ไฟล์ตามตัวอย่างด้านบน
2. ใช้คำสั่ง kubectl เพื่อ deploy เซอร์วิสทั้งหมด:

```bash
# สร้าง namespace สำหรับระบบของเรา (optional)
kubectl create namespace accounting-system

# Apply YAML files
kubectl apply -f site.yaml
kubectl apply -f revenue.yaml
kubectl apply -f tax.yaml
kubectl apply -f report.yaml
kubectl apply -f email.yaml

# หรือจะ Apply ทุกไฟล์พร้อมกัน
kubectl apply -f .
```

## คำสั่งที่ใช้บ่อยสำหรับการจัดการระบบ

| คำสั่ง | คำอธิบาย |
|-------|----------|
| `kubectl get pods` | ดูรายการ pods ทั้งหมด |
| `kubectl get deployments` | ดูรายการ deployments ทั้งหมด |
| `kubectl get services` | ดูรายการ services ทั้งหมด |
| `kubectl describe pod <pod-name>` | ดูรายละเอียดของ pod |
| `kubectl logs <pod-name>` | ดู logs ของ pod |
| `kubectl exec -it <pod-name> -- /bin/bash` | เข้าไปใน pod ด้วย bash |
| `kubectl scale deployment <deployment-name> --replicas=<number>` | ปรับจำนวน replicas |
| `kubectl get svc site-service -o wide` | ดู IP address ของ site service |
| `kubectl delete -f <file.yaml>` | ลบ resources ที่สร้างจากไฟล์นั้น |

## การปรับขนาดเซอร์วิส (Scaling)

หากต้องการปรับขนาดของเซอร์วิสใดๆ เช่น เพิ่ม replicas ของ Site เป็น 10:

```bash
kubectl scale deployment site-deployment --replicas=10
```

## การตรวจสอบระบบ

1. ตรวจสอบว่า pods ทั้งหมดทำงานปกติ:
```bash
kubectl get pods
```

2. ตรวจสอบ services:
```bash
kubectl get services
```

3. เข้าถึง Site จากภายนอก:
```bash
kubectl get service site-service
```
จดบันทึก EXTERNAL-IP แล้วเปิดในเบราว์เซอร์

## สรุป

ระบบของเราเป็น microservices ที่แบ่งหน้าที่ชัดเจน โดยมี Site เป็นจุดเข้าถึงจากภายนอก และมีบริการอื่นๆ ที่ทำงานภายใน cluster เท่านั้น การออกแบบเช่นนี้ช่วยให้ระบบมีความปลอดภัยและขยายขนาดได้ง่าย
