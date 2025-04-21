import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import Page403 from '../module/auth/Page403';
import Page404 from '../module/auth/Page404';
import ProtectedRoute from './ProtectedRouter';
import EventsAdmin from '../module/admin/EventsAdmin';
import Groups from '../module/admin/Groups';
import AdminGroups from '../module/admin/AdminGroups';
import Logo from '../assets/img/Logo.png';
import EventsMember from '../module/member/Events';
import ProfileMember from '../module/member/Profile';

const AppRouter = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const getRole = () => {
        if (user?.usuario?.rol.rol === "ADMIN") {
            return "ADMIN";
        } else if (user?.usuario?.rol.rol === "ADMIN_GROUP") {
            return "ADMIN_GROUP";
        } else {
            return "USER";
        }
    }

    const role = getRole();

    return (
        <BrowserRouter>
            {loading ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="relative">
                        <div className="loader2"></div>
                        <img src={Logo} alt="logo" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10" />
                    </div>
                </div>
            ) : (
                <Routes>
                    {/* Rutas públicas cuando no está logueado */}
                    {!user?.token ? (
                        <>
                            <Route path="/" element={<SignInPage setLoading={setLoading}/>} />
                            <Route path="/forgot-password" element={<ForgotPasswordPage setLoading={setLoading}/>} />
                            <Route path="/reset-password" element={<ResetPasswordPage setLoading={setLoading}/>} />
                            {/* Redirigir a 401 para rutas protegidas */}
                            <Route path="/grupos" element={<Page401 />} />
                            <Route path="/admingroups" element={<Page401 />} />
                            <Route path="/miembros" element={<Page401 />} />
                            <Route path="/perfil-miembro" element={<Page401 />} />
                            {/* Cualquier otra ruta no definida va a 401 */}
                            <Route path="*" element={<Page401 />} />
                        </>
                    ) : (
                        /* Rutas cuando está logueado */
                        <>
                            {/* Rutas para ADMIN */}
                            {role === "ADMIN" && (
                                <Route path="/" element={
                                    <ProtectedRoute isAllowed={role === "ADMIN"} redirectPath="/403">
                                        <AdminLayout />
                                    </ProtectedRoute>
                                }>
                                    <Route index element={<EventsAdmin setLoading={setLoading}/>} />
                                    <Route path='/grupos' element={<Groups setLoading={setLoading}/>} />
                                    <Route path='/admingroups' element={<AdminGroups setLoading={setLoading}/>} />
                                </Route>
                            )}
                            
                            {/* Rutas para ADMIN_GROUP */}
                            {role === "ADMIN_GROUP" && (
                                <Route path="/" element={
                                    <ProtectedRoute isAllowed={role === "ADMIN_GROUP"} redirectPath="/403">
                                        <AdminGroupLayout />
                                    </ProtectedRoute>
                                }>
                                    <Route index element={<Events setLoading={setLoading}/>} />
                                    <Route path='/miembros' element={<Members setLoading={setLoading}/>} />
                                </Route>
                            )}
                            
                            {/* Rutas para USER */}
                            {role === "USER" && (
                                <Route path="/" element={
                                    <ProtectedRoute isAllowed={role === "USER"} redirectPath="/403">
                                        <MemberLayout/>
                                    </ProtectedRoute>
                                }>
                                    <Route index element={<EventsMember setLoading={setLoading} />} />
                                    <Route path="/perfil-miembro" element={<ProfileMember setLoading={setLoading}/>} />
                                </Route>
                            )}
                            
                            {/* Rutas no permitidas para el rol específico redirigen a 403 */}
                            {role !== "ADMIN" && (
                                <Route path="/admingroups" element={<Page403 />} />
                            )}
                            {role !== "ADMIN" && role !== "ADMIN_GROUP" && (
                                <Route path="/miembros" element={<Page403 />} />
                            )}
                            
                            {/* Página 403 para acceso prohibido */}
                            <Route path="/403" element={<Page403 />} />
                            
                            {/* Rutas que no existen para usuarios logueados van a 404 */}
                            <Route path="*" element={<Page404 />} />
                        </>
                    )}
                </Routes>
            )}
        </BrowserRouter>
    );
};

export default AppRouter;