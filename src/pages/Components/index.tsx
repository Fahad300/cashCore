import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ComponentLayout from './ComponentLayout';
import Overview from './pages/Overview';
import {
    Buttons,
    Forms,
    Tables,
    Cards,
    Charts,
    Modals,
    Notifications,
    Typography
} from './pages';

const Components = () => {
    return (
        <Routes>
            <Route element={<ComponentLayout />}>
                <Route index element={<Overview />} />
                <Route path="buttons" element={<Buttons />} />
                <Route path="forms" element={<Forms />} />
                <Route path="tables" element={<Tables />} />
                <Route path="cards" element={<Cards />} />
                <Route path="charts" element={<Charts />} />
                <Route path="modals" element={<Modals />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="typography" element={<Typography />} />
                <Route path="*" element={<Navigate to="/components" replace />} />
            </Route>
        </Routes>
    );
};

export default Components; 