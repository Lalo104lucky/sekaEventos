import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from "../module/admin/AdminLayout";
import AdminGroupLayout from '../module/adminGroup/AdminGroupLayout';
import MemberLayout from '../module/member/MemberLayout';
import SignInPage from '../module/auth/SignInPage';
import ForgotPasswordPage from '../module/auth/FortgotPasswordPage';
import ResetPasswordPage from '../module/auth/ResetPasswordPage';
import AuthContext from '../config/context/auth-context';
import Events from '../module/adminGroup/Events';

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
                            <Route path="/" element={<AdminLayout/>}>
                                
                            </Route>

                        ) : role === "ADMIN_GROUP" ? (
                            <Route path="*" element={<AdminGroupLayout perfilData={""} />}>
                                <Route index element={<Events />}></Route>
                            </Route>
                        ) : (
                            <Route path="*" element={<MemberLayout perfilData={""} />} />
                        )}
                    </>
                ) : (
                    <>
                        <Route path="/" element={<SignInPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/reset-password" element={<ResetPasswordPage />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
