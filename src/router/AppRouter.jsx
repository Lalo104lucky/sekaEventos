import React, { useContext, useState, useEffect } from 'react';
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
import EventsAdmin from '../module/admin/EventsAdmin';
import Groups from '../module/admin/Groups';
import AdminGroups from '../module/admin/AdminGroups';
import Logo from '../assets/img/Logo.png';
import EventsMember from '../module/member/Events';
import Page404 from '../module/auth/Page404';
import ProfileMember from '../module/member/Profile';

const AppRouter = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);;

    const [perfilData, setPerfilData] = useState(null);
    
    const obtenerDatosLocalStorage=()=>{
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const parsedData = JSON.parse(userData);
                const perfilInfo = parsedData|| {};
                setPerfilData(perfilInfo);
                console.log("funcion ejecutada")
            } catch (error) {
                console.error("Error al parsear datos del usuario:", error);
            }
        }

    }
    
    useEffect(() => {
        console.log("funcion ejecutada")
        obtenerDatosLocalStorage();
    }, []);


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
            {loading ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="relative">
                    <div className="loader2"></div>
                    <img src={Logo} alt="logo" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10" />
                </div>
            </div>
            ) : (
                <Routes>
                    {user?.token ? (
                        <>
                            {role === "ADMIN" ? (
                                <Route path="/" element={
                                    <ProtectedRoute isAllowed={role === "ADMIN"}>
                                        <AdminLayout />
                                    </ProtectedRoute>
                                }>
                                    <Route index element={<EventsAdmin setLoading={setLoading}/>} />
                                    <Route path='/grupos' element={<Groups setLoading={setLoading}/>} />
                                    <Route path='/admingroups' element={<AdminGroups setLoading={setLoading}/>} />
                                </Route>

                            ) : role === "ADMIN_GROUP" ? (
                                <Route path="/" element={
                                    <ProtectedRoute isAllowed={role === "ADMIN_GROUP"}>
                                        <AdminGroupLayout />
                                    </ProtectedRoute>
                                }>
                                    <Route index element={<Events setLoading={setLoading}/>} />
                                    <Route path='/miembros' element={<Members setLoading={setLoading}/>} />
                                </Route>
                            ) : (
                                <Route path="/" element={
                                    <ProtectedRoute isAllowed={role === "USER"}>
                                        <MemberLayout />
                                    </ProtectedRoute>
                                }>
                                     <Route index path="/" element={<EventsMember setLoading={setLoading}/>} />
                                     <Route path="/perfil-miembro" element={<ProfileMember setLoading={setLoading} perfilData={perfilData} obtenerDatosLocalStorage={obtenerDatosLocalStorage}/>} />
                                </Route>
                            )}
                            <Route path="*" element={<Page404 />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<SignInPage setLoading={setLoading}/>} />
                            <Route path="/forgot-password" element={<ForgotPasswordPage setLoading={setLoading}/>} />
                            <Route path="/reset-password" element={<ResetPasswordPage setLoading={setLoading}/>} />
                            <Route path="*" element={<Page401 />} />
                        </>
                    )}
                </Routes>
            )}
        </BrowserRouter>
    );
};

export default AppRouter;
