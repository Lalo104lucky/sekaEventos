import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from "../module/admin/AdminLayout";
import AdminGroupLayout from '../module/adminGroup/AdminGroupLayout';
import MemberLayout from '../module/member/MemberLayout';
import SignInPage from '../module/auth/SignInPage';
import ForgotPasswordPage from '../module/auth/FortgotPasswordPage';
import ResetPasswordPage from '../module/auth/ResetPasswordPage';
import AuthContext from '../config/context/auth-context';
import Events from '../module/adminGroup/Events';
import Members from '../module/adminGroup/Members';
import Page401 from '../module/auth/Page401';
import ProtectedRoute from './ProtectedRouter';
import EventList from '../module/member/components/EventList';
import ProfileMember from '../module/member/Profile';
import EventsAdmin from '../module/admin/EventsAdmin';
import Groups from '../module/admin/Groups';
import AdminGroups from '../module/admin/AdminGroups';

const AppRouter = () => {
    const { user } = useContext(AuthContext);
    const getRole = () => {
        if (user?.usuario?.rol.rol === "ADMIN") {
            return "ADMIN";
        } else if (user?.usuario?.rol.rol === "ADMIN_GROUP") {
            return "ADMIN_GROUP";
        } else {
            return "USER";
        }
    }

    const role = getRole()

    return (
        <BrowserRouter>
            <Routes>
                {user?.token ? (
                    <>
                        {role === "ADMIN" ? (
                            <Route path="/" element={
                                <ProtectedRoute isAllowed={role === "ADMIN"}>
                                    <AdminLayout />
                                </ProtectedRoute>
                            }>
                                <Route index element={<EventsAdmin />} />
                                <Route path='/grupos' element={<Groups />} />
                                <Route path='/admingroups' element={<AdminGroups />} />
                                {/* <Route path='/cuenta' element={<Profile />} /> */}
                            </Route>

                        ) : role === "ADMIN_GROUP" ? (
                            <Route path="/" element={
                                <ProtectedRoute isAllowed={role === "ADMIN_GROUP"}>
                                    <AdminGroupLayout />
                                </ProtectedRoute>
                            }>
                                <Route index element={<Events />} />
                                <Route path='/miembros' element={<Members />} />
                            </Route>
                        ) : (
                            <Route path="/" element={
                                <ProtectedRoute isAllowed={role === "USER"}>
                                    <MemberLayout />
                                </ProtectedRoute>
                            }>
                                <Route index path="/" element={<EventList />} />
                                <Route path="/perfil-miembro" element={<ProfileMember />} />
                            </Route>
                        )}
                    </>
                ) : (
                    <>
                        <Route path="/" element={<SignInPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/reset-password" element={<ResetPasswordPage />} />
                        <Route path="*" element={<Page401 />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
