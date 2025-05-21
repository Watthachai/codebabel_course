# CI/CD Workshop

ในเวิร์กชอปนี้เราจะเรียนรู้การสร้างระบบ CI/CD โดยแบ่ง Git Repository ออกเป็น 2 ส่วน:

- **app**: เก็บซอร์สโค้ดและไฟล์ของแอปพลิเคชัน
- **env**: เก็บโค้ดที่เกี่ยวกับโครงสร้าง Infrastructure และการ Deploy

## 1. การเตรียม Repository

### 1.1 สร้าง Repositories บน GitHub

1. สร้าง Repository ชื่อ `devops-quickstart-app` 
    ![Create App Repo](https://example.com/create-app-repo.png)

2. สร้าง Repository ชื่อ `devops-quickstart-env`
    ![Create Env Repo](https://example.com/create-env-repo.png)

### 1.2 จัดเตรียมโฟลเดอร์ในเครื่อง

1. สร้างโฟลเดอร์ `devops-quickstart` และโฟลเดอร์ย่อย `app` และ `env`
    ```
    mkdir -p devops-quickstart/{app,env}
    ```
    ![DevOps Quickstart Subfolders](https://example.com/quickstart-folders.png)

2. ดาวน์โหลดซอร์สโค้ด:
    - [ดาวน์โหลดโค้ด app](https://example.com/download-app)
    - [ดาวน์โหลดโค้ด env](https://example.com/download-env)

3. แตกไฟล์และวางในโฟลเดอร์ที่เตรียมไว้

> **หมายเหตุสำหรับผู้ใช้ WSL2**: หากพบไฟล์นามสกุล Zone.Identifier ให้ลบด้วยคำสั่ง:
> ```bash
> find / -type f -name "*:Zone.Identifier" -exec rm -f {} \;
> ```

## 2. การกำหนดขั้นตอน CI (Continuous Integration)

CI จะทำงานเมื่อมีการ push โค้ดไปที่ GitHub โดยจะทำการทดสอบโค้ดอัตโนมัติ

![CI Flow](https://example.com/ci-flow.png)

### ไฟล์ CI Workflow

ไฟล์ `.github/ci.yml` จะมีโค้ดดังนี้:

```yaml
name: CI
on: [push]
jobs:
  testing:
     runs-on: ubuntu-latest
     steps:
        - uses: actions/checkout@v4
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

Workflow นี้จะ:
1. ดึงโค้ดล่าสุดมาจาก Repository
2. ติดตั้ง Node.js และ Go
3. ติดตั้ง dependencies ของแต่ละส่วน
4. รันการทดสอบทั้งส่วน frontend (site) และ backend (api)

## 3. การกำหนดขั้นตอน CD (Continuous Delivery)

เมื่อมีการ push โค้ดไปที่ branch main เราจะสร้าง Docker Image และนำขึ้น Docker Hub

### 3.1 เตรียม Docker Hub

1. สร้าง Repository บน Docker Hub ชื่อ `devops-quickstart-api`
    ![Create API Image](https://example.com/create-api-image.png)

2. สร้าง Repository อีกอันชื่อ `devops-quickstart-site`
    ![Create Site Image](https://example.com/create-site-image.png)

### 3.2 เตรียม Docker Hub Access Token

1. ไปที่ My Profile > Edit Profile > Security
    ![Docker Hub Security](https://example.com/docker-hub-security.png)

2. คลิก New Access Token และระบุชื่อ "Github Actions"
    ![Docker Hub Create Token](https://example.com/docker-hub-token.png)

3. คัดลอก Token ที่สร้างได้
    ![Docker Hub Copy Token](https://example.com/docker-hub-copy-token.png)

### 3.3 ตั้งค่า GitHub Secrets

1. ไปที่ Repository `devops-quickstart-app` > Settings > Secrets and variables > Actions
    ![Github Settings](https://example.com/github-settings.png)

2. สร้าง Secret ชื่อ `DOCKERHUB_USERNAME` ใส่ username ของ Docker Hub
    ![Github Secret Dockerhub Username](https://example.com/github-secret-username.png)

3. สร้าง Secret ชื่อ `DOCKERHUB_TOKEN` ใส่ค่า Token ที่คัดลอกไว้
    ![Github Secret Dockerhub Token](https://example.com/github-secret-token.png)

### 3.4 กำหนด CD Workflow

แก้ไขไฟล์ `.github/cd.yml`:

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
             tags: [DOCKERHUB_ACCOUNT]/devops-quickstart-api:${{steps.config.outputs.api_version}}

        - name: Build and push Site
          uses: docker/build-push-action@v5
          with:
             context: ./site
             push: true
             tags: [DOCKERHUB_ACCOUNT]/devops-quickstart-site:${{steps.config.outputs.site_version}}
```

> **สำคัญ**: แก้ไขส่วน `[DOCKERHUB_ACCOUNT]` เป็น username ของคุณบน Docker Hub เช่น `babelcoder/devops-quickstart-api`

### 3.5 กำหนดเวอร์ชัน

1. แก้ไขไฟล์ `api/version` ให้เป็น `1.0`
2. แก้ไขไฟล์ `site/version` ให้เป็น `1.0`

## 4. นำส่งโค้ด app และทดสอบ CI/CD

ใช้คำสั่งต่อไปนี้เพื่อนำโค้ดขึ้น GitHub:

```bash
cd devops-quickstart/app
git init
git add -A
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:[USERNAME]/devops-quickstart-app.git
git push -u origin main
```

> **หมายเหตุ**: แทนที่ `[USERNAME]` ด้วยชื่อ account หรือ organization ของคุณบน GitHub

หลังจาก push โค้ด:
1. ตรวจสอบผลการทำงานที่ Actions tab บน GitHub
    ![Github Actions](https://example.com/github-actions.png)

2. คลิกเข้าไปดูรายละเอียดการทำงานของแต่ละ workflow
    ![Github Jobs](https://example.com/github-jobs.png)
    ![Github Jobs Details](https://example.com/github-jobs-details.png)

3. เมื่อการทำงานเสร็จสิ้น จะแสดงผลเป็นสีเขียว
    ![Github Actions Success](https://example.com/github-actions-success.png)

4. ตรวจสอบ Docker Hub ว่ามีการสร้าง Image เรียบร้อยแล้ว (จะเห็น tag 1.0)
    ![Docker Deploy Success](https://example.com/docker-deploy-success.png)

## 5. การกำหนดขั้นตอน Deployment อัตโนมัติ

Repository `env` จะรับผิดชอบในการ deploy แอปพลิเคชันไปยัง cloud provider โดยใช้ Terraform

### 5.1 เตรียม Terraform Cloud

1. สมัครใช้งาน [Terraform Cloud](https://app.terraform.io/signup/account)
2. สร้าง Organization ชื่อ `devops-quickstart`
    ![Terraform Create Organization](https://example.com/terraform-create-org.png)

3. สร้าง Workspace แบบ API-Driven ชื่อ `github-actions`
    ![Terraform API Driven](https://example.com/terraform-api-driven.png)
    ![Terraform Create Workspace](https://example.com/terraform-create-workspace.png)

### 5.2 เพิ่ม DigitalOcean Token ใน Terraform Cloud

1. ไปที่ Variables ในหน้า Workspace
    ![Terraform Create DO Token Menu](https://example.com/terraform-do-token-menu.png)

2. เพิ่ม Variable ชื่อ `do_token` โดยใส่ค่า DigitalOcean API Token และทำเครื่องหมาย Sensitive
    ![Terraform Create DO Token](https://example.com/terraform-do-token.png)

### 5.3 สร้าง Terraform API Token

1. ไปที่ Account Settings > Tokens > Create an API token
    ![Terraform Create Token Menu](https://example.com/terraform-token-menu.png)

2. ตั้งชื่อเป็น "Github Actions" แล้วคลิก Generate token
    ![Terraform Generate Token](https://example.com/terraform-generate-token.png)

3. คัดลอก Token ที่ได้
    ![Terraform Token](https://example.com/terraform-token.png)

### 5.4 เพิ่ม Secrets ใน GitHub Repository env

1. ไปที่ `devops-quickstart-env` > Settings > Secrets and variables > Actions
    ![Github Env Repo Add Secret](https://example.com/github-env-secret.png)

2. เพิ่ม Secret ชื่อ `TF_API_TOKEN` และใส่ค่า Terraform API Token ที่ได้
    ![Github Env Repo Add Terraform Secret](https://example.com/github-env-tf-secret.png)

3. เพิ่ม Secret ชื่อ `SSH_KEY` โดยคัดลอกมาจาก SSH key ของคุณ
    ```bash
    cat ~/.ssh/do_terraform
    ```
    ![Github Env Repo SSH Key Secret](https://example.com/github-env-ssh-secret.png)

### 5.5 แก้ไขไฟล์ docker-compose.yml

แก้ไขชื่อ Docker image ใน `docker-compose.yml` ให้ตรงกับที่คุณอัพโหลดไว้ใน Docker Hub:

- `babelcoder/intro-to-devops-ui:2.0` → `[DOCKERHUB_ACCOUNT]/devops-quickstart-site:1.0`
- `babelcoder/intro-to-devops-api` → `[DOCKERHUB_ACCOUNT]/devops-quickstart-api:1.0`

## 6. นำส่งโค้ด env และทดสอบ Deployment

นำโค้ดขึ้น GitHub ด้วยคำสั่ง:

```bash
cd devops-quickstart/env
git init
git add -A
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:[USERNAME]/devops-quickstart-env.git
git push -u origin main
```

หลังจาก push โค้ด:
1. ตรวจสอบการทำงานของ Workflow ที่ Actions tab
    ![Env Deployment Job](https://example.com/env-deployment-job.png)

2. รอให้ Terraform ทำงานเสร็จสิ้น ซึ่งจะสร้าง infrastructure และ deploy แอปพลิเคชันโดยอัตโนมัติ

### การลบ Infrastructure (ถ้าต้องการ)

เมื่อต้องการลบ infrastructure ที่สร้างขึ้น:

1. ไปที่ Terraform Cloud > Workspace > Settings > Destruction and Deletion
2. คลิก Queue destroy plan
    ![Terraform Queue Destroy Plan](https://example.com/terraform-destroy-plan.png)

3. ใส่ชื่อ workspace (`github-actions`) เพื่อยืนยัน
    ![Terraform Queue Destroy Github Actions](https://example.com/terraform-destroy-confirm.png)

4. รอให้ plan ทำงานเสร็จ แล้วคลิก Confirm
    ![Terraform Apply](https://example.com/terraform-apply.png)
