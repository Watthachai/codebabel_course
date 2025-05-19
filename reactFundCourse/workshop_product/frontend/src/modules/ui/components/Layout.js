import React, { useState, useMemo, useEffect } from "react";
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import Header from "./Header";
import Content from "./Content";
import axios from "axios";
import { useSelector } from "react-redux";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export default function Layout() {
    // ตรวจสอบ system preference สำหรับ dark mode
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const darkMode = useSelector(state => state.ui.darkMode)

    // สร้าง state โดยใช้ค่าเริ่มต้นจาก system preference
    const [darkMode, setDarkMode] = useState(prefersDarkMode);
    
    // ติดตามการเปลี่ยนแปลงของ system preference
    useEffect(() => {
        setDarkMode(prefersDarkMode);
    }, [prefersDarkMode]);
    
    // สร้าง theme ตามโหมดที่เลือก และใช้ useMemo เพื่อ optimize performance
    const theme = useMemo(() => createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#f50057',
            },
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            h4: {
                fontWeight: 600,
            },
        },
    }), [darkMode]);
    
    // ฟังก์ชันสำหรับสลับโหมด
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
            <Content />

        </ThemeProvider>
    );
}