import React from 'react';
import MainPage from './components/mainPage/MainPage';
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
    return (
        <Router>
            <MainPage />
        </Router>

    )
}