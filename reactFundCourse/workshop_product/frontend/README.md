# Product Workshop On React Fundamentals Course

## การตกแต่ง CSS และจัดหน้าเพจด้วย Material UI (หัวข้อที่ 1, 2 และ 3)

หมายเหตุ: คลิปของ Babel Coder ใช้ Material UI Version 4 แต่ในปัจจุบันเป็น Version 7.1.0 แล้ว การ Import และ Install จึงมีการเปลี่ยนแปลงบางส่วน

### การติดตั้ง Material UI (หัวข้อที่ 1, 2 และ 3)

ติดตั้ง Material UI จาก [Official Website](https://mui.com/material-ui/getting-started/installation/)

```bash
# ใช้ yarn
yarn add @mui/material @emotion/react @emotion/styled

# หรือใช้ npm
npm install @mui/material @emotion/react @emotion/styled
```

> **หมายเหตุ**: ตั้งแต่ปี 2021 เป็นต้นมา styled-components ไม่สามารถทำงานร่วมกับ Material UI ที่แสดงผลบนเซิร์ฟเวอร์ได้ เนื่องจาก babel-plugin-styled-components ไม่สามารถทำงานกับ styled() ยูทิลิตี้ภายใน @mui แพ็คเกจได้
>
> เนื่องจากในคลิปยังมีการใช้ .babel-plugin ซึ่งปัจจุบันไม่จำเป็นต้องใช้แล้ว

### การใช้งาน Component (หัวข้อที่ 4)

สามารถศึกษาการใช้งาน Component ได้ที่ [MUI Usage Documentation](https://mui.com/material-ui/getting-started/usage/)

#### ตัวอย่างการใช้งาน Button Component

```jsx
import Button from '@mui/material/Button';

function App() {
    return (
        <Button variant="contained" color="primary">
            สวัสดี Material UI
        </Button>
    );
}
```

### การใช้งาน CSS ผ่าน makeStyles (หัวข้อที่ 5)

**สำคัญ**: @mui/styles ถูกยกเลิกพร้อมกับการเปิดตัว MUI Core v5 ในช่วงปลายปี 2021 
- ไม่เข้ากันกับ React.StrictMode หรือ React 18+
- จะไม่ได้รับการอัปเดตอีกต่อไป

เอกสารยังคงมีอยู่สำหรับผู้ที่ทำงานกับโปรเจ็กต์รุ่นเก่า แต่ไม่แนะนำให้ใช้ @mui/styles เมื่อสร้างแอปใหม่ด้วย Material UI เนื่องจากจะเกิดปัญหาการอ้างอิงที่ไม่สามารถแก้ไขได้

#### วิธีการทำ Styling ที่แนะนำในปัจจุบัน (MUI v5+) ผมใช้ v.7.1.0

```jsx
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

// สร้าง styled component
const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'purple',
    color: 'white',
    padding: '10px 20px',
    '&:hover': {
        backgroundColor: 'darkpurple',
    },
    // ใช้ theme
    [theme.breakpoints.down('md')]: {
        padding: '5px 10px',
    },
}));

function App() {
    return <CustomButton>ปุ่มที่กำหนดสไตล์เอง</CustomButton>;
}
```

อ้างอิง: [MUI Styles Documentation](https://v6.mui.com/system/styles/basics/)

### Nested Selectors (หัวข้อที่ 6)
บทเรียนนี้ผู้เรียนจะได้รู้จักกับการใช้ Nested Selectors ใน Material UI ที่มีลักษณะคล้ายกับ SASS

Nested Selectors เป็นเทคนิคการเขียน CSS ที่อนุญาตให้เราสามารถซ้อน selectors ภายในกันได้ คล้ายกับโครงสร้าง HTML ทำให้โค้ด CSS มีความเป็นระเบียบและอ่านง่ายมากขึ้น (ตัวนี้ &)

#### ตัวอย่างการใช้งาน Nested Selectors

```jsx
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(2),
    // ส่วนหลักของการ์ด
    '& .card-header': {
        borderBottom: '1px solid #eee',
        marginBottom: theme.spacing(2),
        
        // Nested selector สำหรับข้อความในส่วนหัว
        '& .title': {
            fontWeight: 'bold',
            color: theme.palette.primary.main,
        },
        
        // Nested selector สำหรับข้อความย่อยในส่วนหัว
        '& .subtitle': {
            fontSize: '0.875rem',
            color: theme.palette.text.secondary,
        }
    },
    
    // ส่วนเนื้อหา
    '& .card-content': {
        '& p': {
            marginBottom: theme.spacing(1),
        }
    }
}));

function CardExample() {
    return (
        <StyledCard>
            <div className="card-header">
                <Typography className="title">หัวข้อการ์ด</Typography>
                <Typography className="subtitle">รายละเอียดเพิ่มเติม</Typography>
            </div>
            <div className="card-content">
                <Typography variant="body1">
                    <p>นี่คือตัวอย่างการใช้ Nested Selectors ใน Material UI</p>
                    <p>ทำให้การเขียน CSS เป็นระเบียบมากขึ้น</p>
                </Typography>
            </div>
        </StyledCard>
    );
}
```

### การทำงานกับ breakpoints ผ่าน useMediaQuery (หัวข้อที่ 7)

`useMediaQuery` เป็น Hook ในการตรวจสอบขนาดหน้าจอเพื่อสร้าง Responsive Design:

```jsx
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function ResponsiveComponent() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return (
        <div>
            {isMobile ? 
                <p>แสดงบนอุปกรณ์มือถือ</p> : 
                <p>แสดงบนหน้าจอขนาดใหญ่</p>
            }
        </div>
    );
}
```

อ้างอิง: [useMediaQuery Documentation](https://mui.com/material-ui/react-use-media-query/)

### รู้จัก Container และ Grid ใน Material UI (หัวข้อที่ 8)

#### Container

`Container` ใช้จำกัดความกว้างของเนื้อหาและจัดให้อยู่ตรงกลางหน้าจอ:

```jsx
import Container from '@mui/material/Container';

function App() {
    return (
        <Container maxWidth="md">
            <h1>เนื้อหาที่ถูกจำกัดความกว้าง</h1>
            <p>เนื้อหาจะมีขนาดไม่เกิน md (960px) และจัดให้อยู่ตรงกลางหน้าจอ</p>
        </Container>
    );
}
```

#### Grid

`Grid` ใช้สำหรับจัดวางองค์ประกอบแบบแถวและคอลัมน์:

```jsx
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function GridExample() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>คอลัมน์ที่ 1</Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2 }}>คอลัมน์ที่ 2</Paper>
            </Grid>
        </Grid>
    );
}
```

**ค่า property ที่สำคัญ:**
- `container`: กำหนดให้ Grid เป็น container
- `item`: กำหนดให้ Grid เป็น item ภายใน container
- `spacing`: กำหนดระยะห่างระหว่าง items
- `xs, sm, md, lg, xl`: กำหนดจำนวนคอลัมน์บนหน้าจอขนาดต่างๆ จาก 12 คอลัมน์

อ้างอิง: 
- [Grid Documentation](https://mui.com/material-ui/react-grid/) 
- [Container Documentation](https://mui.com/material-ui/react-container/)

### 9. การวางโครงสร้างโปรเจคให้เหมาะสมและยืดหยุ่น (หัวข้อที่ 9)

การวางโครงสร้างโปรเจคที่ดีถือเป็นรากฐานสำคัญของการพัฒนาซอฟต์แวร์ที่มีประสิทธิภาพ ไม่เพียงแค่ทำให้โค้ดทำงานได้เท่านั้น แต่ยังต้องคำนึงถึงการบำรุงรักษา การขยายฟีเจอร์ และความเข้าใจของทีมในอนาคตด้วย

#### โครงสร้างโปรเจคที่ใช้ในการอบรม

ในบทเรียนนี้ เราได้จัดโครงสร้างโปรเจคแบบแยก Frontend และ Backend ชัดเจน:

```
project/
├── backend/
│   ├── db.json         # JSON Server สำหรับจำลอง REST API
│   └── package.json    # Dependencies สำหรับ backend
│
└── frontend/
    ├── src/
    │   ├── App.js      # Component หลักของแอปพลิเคชัน
    │   └── index.js    # Entry point ของแอปพลิเคชัน
    │
    └── modules/        # แบ่งโค้ดตาม modules/features
        ├── cart/       # ฟีเจอร์ตะกร้าสินค้า
        │   └── components/  # React components เฉพาะของ cart
        │
        ├── product/    # ฟีเจอร์สินค้า
        │   └── components/  # React components เฉพาะของ product
        │
        └── ui/         # UI components ที่ใช้ร่วมกันทั้งระบบ
            └── components/  # Shared/Common UI components
```

#### ประโยชน์ของการแบ่งโครงสร้างแบบนี้

1. **แยกความรับผิดชอบชัดเจน** - Frontend และ Backend แยกจากกันโดยสิ้นเชิง ทำให้สามารถพัฒนาแยกกันได้
   
2. **การจัดการตาม Feature (Feature-based Organization)** - แบ่งโค้ดตามฟีเจอร์ (cart, product) ทำให้:
   - หาและแก้ไขโค้ดได้ง่าย
   - เพิ่มฟีเจอร์ใหม่โดยไม่กระทบฟีเจอร์เดิม
   - ทีมสามารถทำงานบนฟีเจอร์แยกกันได้

3. **Reusable Components** - โฟลเดอร์ `ui/components` ช่วยให้เราสร้าง components ที่ใช้ร่วมกันได้ ลดการเขียนโค้ดซ้ำซ้อน

4. **Scalability** - โครงสร้างนี้รองรับการเติบโตของแอปพลิเคชัน สามารถเพิ่มโมดูลใหม่ได้โดยไม่ต้องปรับโครงสร้างเดิม 

5. ผู้เรียนมองว่าการวางโครงสร้างที่เหมาะสมเช่นนี้ช่วยให้ทีมพัฒนาสามารถทำงานร่วมกันได้อย่างมีประสิทธิภาพ และรองรับการขยายฟีเจอร์ในอนาคตได้อย่างยืดหยุ่นครับผม

### 10. Workshop การออกแบบ UI เพื่อการวางเลย์เอาท์บนหน้าเพจ ใช้แนวทางนี้ในการเขียนตั้งแต่ หัวข้อที่ 10 - 14 เลยนะครับ

#### ความก้าวหน้าในการเรียนรู้

ในบทเรียนนี้ ได้เรียนรู้เกี่ยวกับการออกแบบ UI โดยใช้ Material UI สำหรับการวางLayout และได้ปรับปรุงโค้ดจากเวอร์ชันเก่าให้ทันสมัย

#### การปรับโค้ดจาก MUI v4 เป็น v7.1.0

ผู้เรียนได้เรียนรู้การปรับเปลี่ยนจาก Material UI v4 เป็น v7.1.0 โดยเฉพาะการเปลี่ยนแปลงสำคัญ:

1. **เปลี่ยนจาก makeStyles เป็น sx prop**:
    - MUI v5+ ไม่สนับสนุน makeStyles แล้ว เนื่องจากเปลี่ยนจาก JSS ไปใช้ Emotion หรือ Styled Components
    - ใช้ `sx` prop แทนสำหรับการจัดการสไตล์ทุกองค์ประกอบ

2. **เปลี่ยนการอิมพอร์ต**:
    - จาก `@material-ui/core` และ `@material-ui/icons` 
    - เป็น `@mui/material` และ `@mui/icons-material`

3. **ปรับการใช้งาน JSX**:
    - เพิ่ม Box component สำหรับ flexbox styling
    - ปรับปรุงการใช้งานให้ทันสมัยและประหยัดโค้ดมากขึ้น

#### ตัวอย่างโค้ดเปรียบเทียบ

**จาก MUI v4 (แบบเดิม):**
```jsx
// ใช้ makeStyles และ @material-ui/core
import { makeStyles } from '@material-ui/core/styles'
// ...โค้ดส่วนอื่นๆ

const useStyles = makeStyles((theme) => ({
  appBar: {
     zIndex: theme.zIndex.drawer,
  },
  // ...styles อื่นๆ
}))

export default function Header() {
  const classes = useStyles()
  return (
     <AppBar position="fixed" className={classes.appBar}>
        {/* ...content */}
     </AppBar>
  )
}
```

**เป็น MUI v7.1.0 (แบบใหม่):**
```jsx
// ใช้ sx prop และ @mui/material
import { Box } from '@mui/material'
// ...โค้ดส่วนอื่นๆ

export default function Header() {
  return (
     <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        {/* ...content */}
        <Box sx={{ flexGrow: 1 }}></Box>
        {/* ...content */}
     </AppBar>
  )
}
```

#### ตัวอย่างการปรับ Content.js

**จาก MUI v4:**
```jsx
import React from 'react'
import { Container, Toolbar, Snackbar, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2, 0),
  },
}))

export default function Content() {
  const classes = useStyles()

  return (
    <main className={classes.content}>
      <Container maxWidth="lg">
        <Toolbar></Toolbar>
        <Snackbar
          open
          message="Hello"
          action={
            <Button color="inherit" size="small">
              Close
            </Button>
          }
        ></Snackbar>
      </Container>
    </main>
  )
}
```

**เป็น MUI v7.1.0:**
```jsx
import { Container, styled, Toolbar, Snackbar, Button } from '@mui/material'
import React from 'react'

// สร้าง Styled Component จาก HTML tag main
const Main = styled('main')(({ theme }) => ({
    padding: theme.spacing(2, 0),
}));

export default function Content() {
 return (
    <Main>
        <Container maxWidth="lg">
            <Toolbar />
            <Snackbar
              open
              message="Hello"
              action={
                <Button color="inherit" size="small">
                  Close
                </Button>
              }
            />
        </Container>
    </Main>
  )
}
```

# จัดการเส้นทางในหน้าเพจด้วย React Router
## 1. การประกาศ Route และการใช้ Switch
