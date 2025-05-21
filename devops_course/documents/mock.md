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