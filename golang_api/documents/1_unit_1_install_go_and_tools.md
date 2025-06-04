# Unit 1: ติดตั้ง Go และเครื่องมือสำหรับการพัฒนา

## 📋 สารบัญ

1. [การติดตั้ง Go](#การติดตั้ง-go)
2. [การติดตั้ง Visual Studio Code](#การติดตั้ง-visual-studio-code)
3. [การตั้งค่า VS Code สำหรับ Go](#การตั้งค่า-vs-code-สำหรับ-go)
4. [การทดสอบและรันโปรแกรม Go แรก](#การทดสอบและรันโปรแกรม-go-แรก)
5. [สิ่งที่ปรับปรุงใหม่สำหรับปี 2025](#สิ่งที่ปรับปรุงใหม่สำหรับปี-2025)

---

## 🚀 การติดตั้ง Go

### วิธีการติดตั้งตามระบบปฏิบัติการ

#### 🍎 สำหรับ macOS

```bash
# วิธีที่ 1: ใช้ Homebrew (แนะนำ)
brew install go

# วิธีที่ 2: ดาวน์โหลดจาก golang.org
# ไปที่ https://golang.org/dl/ และเลือกไฟล์ .pkg
```

#### 🪟 สำหรับ Windows

1. ไปที่ [golang.org/dl](https://golang.org/dl/)
2. ดาวน์โหลดไฟล์ `.msi` สำหรับ Windows
3. รันไฟล์และทำตามขั้นตอนการติดตั้ง

#### 🐧 สำหรับ Linux

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install golang-go

# หรือดาวน์โหลดจาก golang.org
wget https://golang.org/dl/go1.21.x.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.21.x.linux-amd64.tar.gz
```

### ✅ ตรวจสอบการติดตั้ง

```bash
go version
# ควรแสดง: go version go1.21.x darwin/amd64 (หรือตามระบบของคุณ)
```

---

## 💻 การติดตั้ง Visual Studio Code

### ดาวน์โหลดและติดตั้ง

1. ไปที่ [code.visualstudio.com](https://code.visualstudio.com/)
2. เลือกเวอร์ชันตามระบบปฏิบัติการของคุณ
3. ติดตั้งตามขั้นตอนปกติ

### 📁 สร้างโฟลเดอร์โปรเจค

```bash
# สร้างโฟลเดอร์สำหรับคอร์ส
mkdir golang_course
cd golang_course

# เปิด VS Code ในโฟลเดอร์นี้
code .
```

---

## ⚙️ การตั้งค่า VS Code สำหรับ Go

### 1. ติดตั้ง Go Extension

1. เปิด VS Code
2. กด `Ctrl+Shift+X` (Windows/Linux) หรือ `Cmd+Shift+X` (macOS)
3. ค้นหา "Go" และติดตั้ง Extension จาก Google

![Go Extension](https://code.visualstudio.com/assets/docs/languages/go/go-extension.png)

### 2. ตั้งค่า Workspace Settings

สร้างไฟล์ `.vscode/settings.json` ในโฟลเดอร์โปรเจคของคุณ:

```json
{
  "go.useLanguageServer": true,
  "go.lintOnSave": "package",
  "go.formatTool": "goimports",
  "go.formatFlags": ["-local", "your-project-name"],
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "go.toolsManagement.checkForUpdates": "local",
  "go.buildOnSave": "package",
  "go.vetOnSave": "package",
  "go.coverOnSave": true,
  "go.testFlags": ["-v"],
  "go.testTimeout": "30s"
}
```

### 3. ติดตั้งเครื่องมือเสริม

เมื่อเปิดไฟล์ `.go` ครั้งแรก VS Code จะถามให้ติดตั้งเครื่องมือเสริม ให้กด "Install All"

หรือใช้คำสั่ง:

```bash
go install -a golang.org/x/tools/gopls@latest
go install -a golang.org/x/tools/cmd/goimports@latest
go install -a github.com/go-delve/delve/cmd/dlv@latest
```

---

## 🧪 การทดสอบและรันโปรแกรม Go แรก

### สร้างไฟล์ main.go

```go
package main

import (
  "fmt"
  "time"
)

func main() {
  fmt.Println("Hello, Go World! 🚀")
  fmt.Printf("Current time: %s\n", time.Now().Format("2006-01-02 15:04:05"))

  // ทดสอบ auto-formatting และ auto-import
  names := []string{"Alice", "Bob", "Charlie"}
  for i, name := range names {
    fmt.Printf("%d. Hello, %s!\n", i+1, name)
  }
}
```

### วิธีการรัน

#### วิธีที่ 1: Compile แล้ว Run

```bash
# Compile
go build main.go

# Run (macOS/Linux)
./main

# Run (Windows)
main.exe
```

#### วิธีที่ 2: Run โดยตรง (แนะนำสำหรับการพัฒนา)

```bash
go run main.go
```

### 🔍 ทดสอบฟีเจอร์ของ VS Code

1. **Auto-formatting**: ลองเขียนโค้ดที่ไม่เป็นระเบียบแล้วกด Save
2. **Auto-import**: ลบ import statement แล้วกด Save
3. **IntelliSense**: พิมพ์ `fmt.` และดูการแนะนำ
4. **Go to Definition**: กด `F12` บนฟังก์ชัน
5. **Error Detection**: ลองเขียนโค้ดที่ผิด syntax

---

## 🆕 สิ่งที่ปรับปรุงใหม่สำหรับปี 2025

### การปรับปรุงจากเวอร์ชันเดิม:

#### 1. **Go Version แนะนำ: Go 1.21+ (2025)**

- เดิม: Go 1.18 หรือต่ำกว่า
- ใหม่: Go 1.21.x มีฟีเจอร์ใหม่และ performance ที่ดีขึ้น

#### 2. **VS Code Extension Updates**

```json
{
  // เพิ่ม settings ใหม่สำหรับ 2025
  "go.toolsManagement.autoUpdate": true,
  "go.diagnostic.vulncheck": "Imports",
  "go.addTags": {
    "tags": "json,yaml,xml",
    "options": "json=omitempty,yaml=omitempty",
    "promptForTags": false,
    "transform": "snakecase"
  }
}
```

#### 3. **Modern Go Project Structure**

```
golang_course/
├── .vscode/
│   └── settings.json
├── cmd/
│   └── app/
│       └── main.go
├── internal/
│   ├── handler/
│   ├── service/
│   └── model/
├── pkg/
├── go.mod
├── go.sum
├── Dockerfile
├── docker-compose.yml
└── README.md
```

#### 4. **Go Modules (แนะนำใช้เสมอ)**

```bash
# เริ่มต้น Go module
go mod init your-project-name

# ตัวอย่างไฟล์ go.mod ที่ทันสมัย
```

```go
module golang_course

go 1.21

require (
  github.com/gin-gonic/gin v1.10.0
  github.com/stretchr/testify v1.8.4
  go.uber.org/zap v1.26.0
)
```

#### 5. **Security และ Best Practices 2025**

```bash
# ตรวจสอบ vulnerability
go mod tidy
govulncheck ./...

# Format และ Lint
go fmt ./...
golangci-lint run
```

### 🎯 Tips สำหรับผู้เริ่มต้น

1. **ใช้ Go Modules เสมอ**: `go mod init project-name`
2. **ตั้งค่า Git**:
   ```bash
   git init
   echo "# My Go Project" > README.md
   ```
3. **ใช้ Makefile**:

   ```makefile
   .PHONY: run build test clean

   run:
     go run cmd/app/main.go

   build:
     go build -o bin/app cmd/app/main.go

   test:
     go test ./...

   clean:
     rm -rf bin/
   ```

### 📚 Resources เพิ่มเติม

- [Go Documentation](https://golang.org/doc/)
- [Go by Example](https://gobyexample.com/)
- [Effective Go](https://golang.org/doc/effective_go.html)
- [Go Style Guide](https://google.github.io/styleguide/go/)

---

> **หมายเหตุ**: คู่มือนี้ได้รับการปรับปรุงให้ทันสมัยสำหรับปี 2025 โดยเพิ่มฟีเจอร์ใหม่ๆ และแนวทางการพัฒนาที่ดีที่สุดในปัจจุบัน ทำให้เหมาะสำหรับทั้งผู้เริ่มต้นและผู้ที่ต้องการอัปเดตความรู้
