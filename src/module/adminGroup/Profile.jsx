import React from 'react';

function Profile() {
    // Datos del usuario (puedes reemplazar esto con datos dinámicos)
    const user = {
        usuario: "Matsuri",
        nombre: "Maximiliano",
        apellido_p: "González",
        apellido_m: "García",
        telefono: "7771234567",
        correo: "maximus_garcia@gmail.com",
    };

    const labelStyles = "block mb-2 text-sm font-quicksand dark_forest font-medium text-gray-900";
    const inputStyles = "bg-custom-greenlight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 custom-border-bottom";


    return (
        <div className="px-8 font-poppins">
            <div className="flex justify-between items-center px-8 mt-8 mb-8">
                <div className="flex items-center space-x-4">
                    <div className="bg-custom-green text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                        {user.nombre.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-900">
                            {user.nombre} {user.apellido_p} {user.apellido_m}
                        </h3>
                        <p className="text-gray-800">{user.correo}</p>
                    </div>
                </div>

                <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition">
                    Cerrar Sesión
                </button>
            </div>

            <div className="grid grid-cols-2 gap-8 px-8">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Actualizar Información Personal</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelStyles}>Nombre</label>
                            <svg className="absolute w-8 h-10 text-[#001C0E] items-center ps-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <input
                                type="text"
                                defaultValue={user.nombre}
                                className={inputStyles}
                                required
                                minLength="2"
                                maxLength="50"
                            />
                        </div>
                        <div>
                            <label className={labelStyles}>Apellido Paterno</label>
                            <svg className="absolute w-8 h-10 text-[#001C0E] items-center ps-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <input
                                type="text"
                                defaultValue={user.apellido_p}
                                className={inputStyles}
                                required
                                minLength="2"
                                maxLength="50"
                            />
                        </div>
                        <div>
                            <label className={labelStyles}>Apellido Materno</label>
                            <svg className="absolute w-8 h-10 text-[#001C0E] items-center ps-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <input
                                type="text"
                                defaultValue={user.apellido_m}
                                className={inputStyles}
                                required
                                minLength="2"
                                maxLength="50"
                            />
                        </div>
                        <div>
                            <label className={labelStyles}>Teléfono</label>
                            <svg className="absolute w-8 h-10 text-[#001C0E] items-center ps-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z" />
                            </svg>
                            <input
                                type="tel"
                                defaultValue={user.telefono}
                                className={inputStyles}
                                required
                                pattern="[0-9]{10}"
                                title="Debe contener 10 dígitos numéricos"
                            />
                        </div>
                        <div className='relative col-span-2'>
                            <label className={labelStyles}>Correo Electrónico</label>
                            <svg className="absolute w-8 h-10 text-[#001C0E] items-center ps-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                            </svg>
                            <input
                                type="email"
                                defaultValue={user.correo}
                                className={inputStyles}
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-6 text-right">
                        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition">
                            Actualizar Información
                        </button>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Actualizar Contraseña</h4>
                    <div className="space-y-4">
                        <div>
                            <label className={labelStyles}>Usuario</label>
                            <svg className="absolute w-8 h-10 text-[#001C0E] items-center ps-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <input
                                type="text"
                                value={user.usuario}
                                disabled
                                className={`${inputStyles} bg-gray-100`}
                            />
                        </div>
                        <div>
                            <label className={labelStyles}>Nueva Contraseña</label>
                            <svg className="absolute w-8 h-10 text-[#001C0E] items-center ps-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
                            </svg>
                            <input
                                type="password"
                                placeholder="Nueva Contraseña"
                                className={inputStyles}
                                required
                                minLength="8"
                                title="Debe contener al menos 8 caracteres"
                            />
                        </div>
                        <div>
                            <label className={labelStyles}>Confirmar Contraseña</label>
                            <svg className="absolute w-8 h-10 text-[#001C0E] items-center ps-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
                            </svg>
                            <input
                                type="password"
                                placeholder="Confirmar Contraseña"
                                className={inputStyles}
                                required
                                minLength="8"
                                title="Debe coincidir con la nueva contraseña"
                            />
                        </div>
                    </div>
                    <div className="mt-6 text-right">
                        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition">
                            Actualizar Contraseña
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;