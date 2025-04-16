import React from 'react'

const Profile = () => {
    return (
        <div className="grid grid-cols-3 gap-4 w-full p-4">

            <div className="grid-rows-3">

                <div className='border-sage p-4 flex flex-col justify-center items-center space-y-2 mb-5'>
                    <i class="fa-regular fa-circle-user text-9xl"></i>
                    <p className="text-xl   font-medium">Nombre</p>
                    <p className="text-sm font-regular">Correo</p>
                </div>

                <div className='row-span-2 color-dark border-sage p-4'>
                    <h1>Columna 1</h1>
                </div>

            </div>


            <div className="col-span-2 border-sage text-green-200 p-4">
                <p className="text-3xl mb-2">Cuenta</p>
                <p className='line-sage w-full h-1 mb-3'></p>
                <p className="text-xl  mb-2 font-medium">Información Personal</p>
                <p className="text-sm  mb-2 font-regular">Actualizar tu información personal</p>

                <form action="#" method="post" id='formUdapteUser'>
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        <div >
                            <div>
                                <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario:</label>
                                <input type="text" id="username" class="colorInput text-sm rounded-lg  block w-full p-2.5 " required disabled />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre:</label>
                                <input type="text" id="name" class="colorInput text-sm rounded-lg  block w-full p-2.5 " pattern="([A-ZÑÁÉÚÓ]{1}[a-záéíóú]*){1}(\s[A-ZZÑÁÉÚÓa-záéíóú][a-záéíóú]*)+$" required />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label for="surname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos:</label>
                                <input type="text" id="surname" class="colorInput text-gray-900 text-sm rounded-lg  block w-full p-2.5 " pattern="([A-ZÑÁÉÚÓ]{1}[a-záéíóú]*){1}(\s[A-ZZÑÁÉÚÓa-záéíóú][a-záéíóú]*)+$" required />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div >
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo Eletronico:</label>
                                <input type="email" id="email" class="colorInput text-sm rounded-lg  block w-full p-2.5 " pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$' required />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Núm.Telefono:</label>
                                <input type="text" id="phone" class="colorInput text-sm rounded-lg  block w-full p-2.5 " pattern='^\d{10}$' required />
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>


                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div />
                        <div />
                        <div class="flex space-x-2">
                            <button type="button" class="w-1/2  cancelButton border-2 font-medium rounded-lg text-sm px-5 py-2.5 ">Descartar</button>

                            <button type="button" class="w-1/2 styleButton  font-medium rounded-lg text-sm px-5 py-2.5 ">Modificar</button>
                        </div>
                    </div>
                </form>

                <p className='line-sage w-full h-1 mt-5 mb-5'></p>
                <p className="text-xl  mb-2 font-medium">Información de Inicio de Sesión</p>
                <p className="text-sm  mb-2 font-regular">Usuario de Inicio de Sesión:</p>

                <div className="grid grid-cols-3 gap-4 mt-8">
                    <div>
                        <div>
                            <label for="newpassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nueva Contraseña:</label>
                            <input type="password" id="newpassword" class="colorInput text-gray-900 text-sm rounded-lg  block w-full p-2.5 " required />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label for="newpassword1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmar Contraseña:</label>
                            <input type="password" id="newpassword1" class="colorInput text-gray-900 text-sm rounded-lg  block w-full p-2.5 " required />
                        </div>
                    </div>
                    <div >
                        <div>
                            <label for="newpassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña Actual:</label>
                            <input type="password" id="newpassword" class="colorInput text-gray-900 text-sm rounded-lg  block w-full p-2.5 " required />
                        </div>
                    </div>

                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <div />
                    <div />
                    <div class="flex space-x-2">
                        <button type="button" class="w-1/2  cancelButton border-2 font-medium rounded-lg text-sm px-5 py-2.5 ">Descartar</button>

                        <button type="button" class="w-1/2 styleButton  font-medium rounded-lg text-sm px-5 py-2.5 ">Modificar</button>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Profile;