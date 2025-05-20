import React, { useState, useMemo, useEffect } from "react";
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import Header from "./Header";
import Content from "./Content";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../actions';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export default function Layout() {
    // ตรวจสอบ system preference สำหรับ dark mode
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const darkModeFromStore = useSelector(state => state.ui.darkMode)

    // สร้าง state โดยใช้ค่าเริ่มต้นจาก system preference และ store
    const [darkMode, setDarkMode] = useState(darkModeFromStore ?? prefersDarkMode);
    
    const dispatch = useDispatch();
    // ติดตามการเปลี่ยนแปลงของ system preference
    useEffect(() => {
        const action = actions.setDarkMode(prefersDarkMode)

        dispatch(action)
    }, [prefersDarkMode, dispatch]);
    
    // สร้าง theme ตามโหมดที่เลือก และใช้ useMemo เพื่อ optimize performance
    const theme = useMemo(() => createTheme({
        palette: {
            mode: darkModeFromStore  ? 'dark' : 'light',
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
    }), [darkModeFromStore]);
    
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