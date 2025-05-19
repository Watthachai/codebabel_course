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

## การติดตั้ง React Router
```bash
yarn add react-router-dom
```

## การเปลี่ยนแปลงจาก React Router v5 เป็น v6

### 1. การเปลี่ยนจาก Switch เป็น Routes

**React Router v5 (เดิม):**
```jsx
<Switch>
    <Route path="/products">
        <ProductRoutes></ProductRoutes>
    </Route>
    <Route path="/cart">
        <CartRoutes></CartRoutes>
    </Route>
</Switch>
```

**React Router v6 (ใหม่):**
```jsx
<Routes>
    <Route path="/products" element={<ProductRoutes />} />
    <Route path="/cart" element={<CartRoutes />} />
</Routes>
```

### 2. การจัดการ Root Component

**React Router v6:**
```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
```

### 3. ตัวอย่างการใช้งาน Nested Routes

**ตัวอย่างในไฟล์ /src/modules/ui/components/Routes.js:**
```jsx
<Routes>
    <Route path="/" element={<ProductList />} />
    <Route path="/products/*" element={<ProductRoutes />} />
    <Route path="/cart" element={<CartRoutes />} />
</Routes>
```

### ข้อควรระวัง:
- ใน React Router v6 เมื่อใช้ nested routes ต้องเพิ่ม `/*` ที่ path ของ parent route
- ไม่ต้องมี prefix ของ parent path ใน child routes

## 2. การเข้าถึงข้อมูล path ด้วย useParams แทน useRouteMatch

ใน React Router v6 มีการเปลี่ยนแปลง API อย่างมาก โดย useRouteMatch ถูกแทนที่ด้วย Hooks ตัวใหม่แล้ว

### การเปลี่ยนแปลงใน React Router v6
React Router v6 ได้แยก Hooks ให้เฉพาะเจาะจงมากขึ้น ทำให้โค้ดอ่านง่ายและกระชับ:

- `useParams()` - สำหรับเข้าถึง URL parameters
- `useSearchParams()` - สำหรับเข้าถึง query parameters
- `useLocation()` - สำหรับข้อมูล URL ปัจจุบัน
- `useNavigate()` - สำหรับการนำทาง (แทน useHistory)

### ตัวอย่างการแก้ไข
ใน `frontend/src/modules/products/components/ProductDetails.js` ผมได้แก้ไขโดย:

```javascript
// เพิ่ม
const { id } = useParams();

// ใน useEffect
useEffect(() => {
    // เพิ่ม id เป็นพารามิเตอร์
    // ...
}, [id]);
```

## 3. การเปลี่ยนหน้าเพจด้วย Link และ useNavigate แทน useHistory (หัวข้อที่ 4)

### การเปลี่ยนจาก useHistory เป็น useNavigate
React Router v6 ได้แทนที่ `useHistory` ด้วย `useNavigate` เพื่อ:
- สื่อความหมายชัดเจนกว่า
- รองรับฟีเจอร์ใหม่
- ใช้งานง่ายขึ้น

### วิธีแก้ไขโค้ด
**จากเดิม:**
```javascript
import { useHistory } from 'react-router-dom';

export default function Header() {
    const history = useHistory();
    
    const navigateToCart = () => {
        history.push('/cart');
    }
}
```

**เปลี่ยนเป็น:**
```javascript
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    
    const navigateToCart = () => {
        navigate('/cart');
        // หรือใช้ replace: navigate('/cart', { replace: true });
    }
}
```

### ฟีเจอร์เพิ่มเติมของ useNavigate
```javascript
const navigate = useNavigate();

// การนำทางพื้นฐาน
navigate('/products');

// แบบ replace (ไม่เพิ่มในประวัติ)
navigate('/products', { replace: true });

// ส่งข้อมูลไปด้วย
navigate('/products', { state: { from: 'home' } });

// ย้อนกลับ/ไปข้างหน้า
navigate(-1); // ย้อนกลับ
navigate(1);  // ไปข้างหน้า
```

## 4. การสร้าง Utility สำหรับจัดการ Path

เพื่อให้การจัดการ path เป็นระบบและง่ายต่อการบำรุงรักษา ผมได้สร้างไฟล์ utility แยกต่างหาก:

### สร้างไฟล์ `frontend/src/utils/urlUtils.js`
```javascript
export const paths = {
    products: '/products',
    cart: '/cart',
    // เพิ่ม path อื่นๆ ตามต้องการ
};

export function buildUrl(basePath, ...segments) {
    return `${basePath}/${segments.join('/')}`;
}
```

### วิธีใช้งานใน ProductItem.js
```javascript
import { paths, buildUrl } from '../../../utils/urlUtils';

export default function ProductItem({ id, image, name, desc, category, price }) {
    return (
        <Grid item xs={12} sm={6} lg={4}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea component={Link} to={buildUrl(paths.products, id)}>
                    {/* ...content... */}
                </CardActionArea>
            </Card>
        </Grid>
    )
}
```

ด้วยวิธีนี้ หากในอนาคตต้องเปลี่ยน URL structure เราสามารถแก้ไขได้ที่ไฟล์ `urlUtils.js` ไฟล์เดียว

## 5. การดึงค่า Dynamic Segments ด้วย useParams
บาง URL ประกอบด้วย Dynamic Segments หรือส่วนที่เปลี่ยนแปลงได้ เช่น `/products/:id` เรียก `:id` ว่า Dynamic Segments บทเรียนนี้จะพูดถึงการทำงานกับ Dynamic Segments ผ่าน `useParams` ซึ่งผู้เรียน อธิบายไว้ให้แล้วในขั้นตอนที่ 2. การเข้าถึงข้อมูล path ด้วย useParams แทน useRouteMatch

## 6. การดึงค่า Query String ผ่าน useLocation

หลังจากนั้นสามารถใช้ `useLocation()` ต่อได้ตามปกติตามคลิปเลย ในหัวข้อนี้มีการใช้งาน query-string ทำการติดตั้งก่อน:

```bash
yarn add query-string
```

### การปรับใช้งานในหน้า ProductList.js:
```javascript
// เพิ่มส่วนนี้เข้าไป
const { search } = useLocation();
const { category } = queryString.parse(search); 
// หมายเหตุ: การ Deconstruct นี้ทำให้ดึงเฉพาะ property "category" จาก object ที่ได้จากการ parse
// เช่น ถ้า search = "?category=electronics" จะได้ category = "electronics"
```

### เปลี่ยนแปลงใน useEffect()
ปรับการกรองสินค้าตามค่า category ที่ได้จาก query string

### การปรับใช้งานในหน้า CategoryItem.js:
```javascript
// เปลี่ยนจาก useHistory เป็น useNavigate
const navigate = useNavigate();  

const filterProductsByCategory = () => {
    navigate(`${paths.products}?category=${title}`);
}
```

## 7. Redirect ใน React Router

> **การเปลี่ยนแปลงสำคัญจาก React Router v5 ไปยัง v6**

### แบบเดิม (v5):
```jsx
<Route>
  <div>Page not found</div>
</Route>
```

### แบบใหม่ (v6):
```jsx
<Route path="*" element={<div>Page not found</div>} />
```

### เหตุผลที่มีการเปลี่ยนแปลง:
1. **เปลี่ยนจาก Children API เป็น Element Props** - v6 ใช้ element prop แทนการใส่ component โดยตรงเป็น children
2. **ความชัดเจนมากขึ้น** - เห็นชัดเจนว่าอะไรจะถูก render เมื่อ route นั้นถูกเรียกใช้
3. **รองรับโครงสร้างแบบลำดับชั้น** - ทำให้สร้าง nested routes ได้ง่ายขึ้น ผ่าน Outlet component
4. **แยก matching logic และ rendering logic** - แยก logic การจับคู่ URL (path) และการแสดงผล (element) ออกจากกัน
5. **Performance ดีขึ้น** - ช่วยให้ optimize การ render components ได้ดีขึ้น

# การจัดการฟอร์มด้วย React Hook Form

## 1. เปรียบเทียบ Formik กับ React Hook Form
ปัจจุบันมีไลบรารี่สำหรับการทำงานกับฟอร์มที่ได้รับความนิยมคือ Formik และ React Hook Form บทเรียนนี้จะทำการเปรียบเทียบสองสิ่งนี้ พร้อมทั้งระบุเหตุผลที่คอร์สนี้เลือกใช้ React Hook Form

## 2. การสร้างฟอร์มด้วย React Hook Form ผ่าน useForm
## 3. ตรวจสอบความถูกต้องของฟอร์มด้วย Yup

### การติดตั้ง:
```bash
yarn add react-hook-form @hookform/resolvers yup
```

### การแก้ไขจาก API เวอร์ชันเก่าให้เป็นเวอร์ชันใหม่:

#### 1. การใช้งาน register:
- **แบบเก่า (จากคลิป)**: `inputRef={register}`
- **แบบใหม่**: `{...register("fieldName")}`

#### 2. การเข้าถึง errors:
- **แบบเก่า (จากคลิป)**:
  ```javascript
  const { register, errors } = useForm();
  // ...
  {errors.name && <span>{errors.name.message}</span>}
  ```
- **แบบใหม่**:
  ```javascript
  const { register, formState: { errors } } = useForm();
  // ...
  {errors.name && <span>{errors.name.message}</span>}
  ```

#### 3. การใช้งาน handleSubmit:
- **เพิ่มใน form**: `<form onSubmit={handleSubmit(submit)}>`

#### 4. การสร้าง validation schema:
- **แบบเก่า**:
  ```javascript
  yup.string().required()
  ```
- **แบบใหม่**:
  ```javascript
  yup.string().required("Address is required")
  ```

# บริหาร state ในแอพพลิเคชันด้วย Redux

## 1. Redux คืออะไร ทำไมจึงสำคัญ

เว็บแอพทั่วไปมักมีข้อมูลที่ต้องส่งผ่านระหว่างคอมโพแนนท์หรือใช้งานร่วมกัน เราจึงต้องการเครื่องมือที่ทำให้การส่งผ่านข้อมูลหรือ state ระหว่างคอมโพแนนท์เป็นไปอย่างสะดวกและสามารถ Debug หรือรู้ลำดับการทำงานอย่างชัดแจ้ง บทเรียนนี้จึงยก Redux ที่เป็นตัวจัดการ state (state management) ยอดนิยมใน React มาพูดถึง

Redux คือไลบรารีสำหรับการจัดการ state ที่มีหลักการสำคัญ 3 ประการ:
1. **Store เป็น Single Source of Truth** - ข้อมูลทั้งหมดของแอพถูกเก็บไว้ในที่เดียว ทำให้การติดตามและจัดการ state ง่ายขึ้น
2. **State is Read-Only** - state ไม่สามารถเปลี่ยนแปลงได้โดยตรง ต้องส่ง Action ไปที่ Store เพื่อบอกว่าต้องการเปลี่ยนแปลงอะไร
3. **Changes are Made with Pure Functions** - การเปลี่ยนแปลง state ทำผ่าน Reducer ซึ่งเป็น Pure Function ที่รับ state เก่าและ action แล้วคืนค่า state ใหม่

## 2. Store และ Reducers

เริ่มต้นด้วยการติดตั้ง Redux ในโปรเจค React ของผม:

```bash
yarn add redux react-redux
yarn add -D redux-devtools-extension
```

จากนั้นให้ติดตั้งส่วนเสริม Redux DevTools บนเบราว์เซอร์เพื่อช่วยในการ debug

**คำเตือน!**
ในบทเรียนนี้ผมใช้ Redux แบบดั้งเดิม (v4 หรือเก่ากว่า) ซึ่งต่างจากปัจจุบันที่ Redux Toolkit ได้กลายเป็นมาตรฐานที่แนะนำ ผมเลือกใช้แบบเดิมเพื่อให้สอดคล้องกับบทเรียนที่กำลังศึกษา

**แบบเก่า (ที่ใช้ในบทเรียนนี้):**

```javascript
import { applyMiddleware, createStore, combineReducers } from "redux";

// นำ reducers มารวมกัน
const rootReducer = combineReducers({
  // cart: cartReducer,
  // products: productsReducer,
  // เพิ่ม reducers อื่นๆ ที่นี่
});

export default function configureStore(initialState) {
    const middleware = [];
    
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    );
    return store;
}
```

**แบบใหม่ด้วย Redux Toolkit (เพื่อการอ้างอิง):**

```javascript
import { configureStore } from "@reduxjs/toolkit";

export default function setupStore(preloadedState) {
  return configureStore({
    reducer: {
      // cart: cartSlice.reducer,
      // products: productsSlice.reducer,
    },
    preloadedState
  });
}
```

**ข้อดีของ Redux Toolkit:**
- ลดโค้ด boilerplate ลงมาก
- มี middleware ในตัว (redux-thunk)
- ใช้ immer ช่วยจัดการ immutable state
- รองรับ TypeScript ได้ดีกว่า

แม้ว่า Redux แบบดั้งเดิมจะแสดงข้อความเตือนว่าควรใช้ Redux Toolkit แทน แต่ผมยังคงใช้แบบเดิมในบทเรียนนี้เพื่อให้เข้าใจพื้นฐานของ Redux และไม่สับสนกับเนื้อหาที่กำลังเรียน

## 3. Actions และ Action Creators

Actions คือวัตถุ JavaScript ธรรมดา (plain objects) ที่อธิบายว่าเกิดอะไรขึ้นในแอพพลิเคชัน โดยต้องมี property ชื่อ `type` เสมอ ซึ่งระบุประเภทของ action

Action Creators คือฟังก์ชันที่สร้างและส่งคืน action object ช่วยให้เราไม่ต้องเขียน action object ซ้ำๆ และเพิ่มความสะดวกในการส่ง actions

ตัวอย่างเช่น:

```javascript
// Action type
const ADD_TO_CART = 'ADD_TO_CART';

// Action creator
function addToCart(product, quantity) {
  return {
    type: ADD_TO_CART,
    payload: {
      product,
      quantity
    }
  };
}
```

ในการใช้งานจริง ผมสามารถเรียกใช้ action creator นี้เมื่อต้องการเพิ่มสินค้าลงตะกร้า โดยผลลัพธ์จะเป็น pure function ที่ให้ค่าคงที่และคาดเดาได้เสมอเมื่อใส่ input เดิม
