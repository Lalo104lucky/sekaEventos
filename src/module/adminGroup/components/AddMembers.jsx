import React from 'react'
import {
    alertaExito,
    alertaError,
    alertaCargando,
    alertaPregunta,
} from "../../../config/context/alert";

function AddMembers() {

    const labelStyles = "block mb-2 text-sm font-quicksand dark_forest font-medium text-gray-900";
    const inputStyles = "bg-custom-greenlight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 custom-border-bottom";

    const modalStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo negro con opacidad
        },
        container: {
            maxHeight: "80vh",
            overflowY: "auto",
        },
        header: {
            justifyContent: "flex-end",
        },
        closeButton: {
            width: "1.5rem",
            height: "1.5rem",
            cursor: "pointer",
        },
    };

    return (
        <div
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={modalStyles.overlay}
        >
            <div
                className="relative bg-white rounded-lg shadow-lg dark:bg-gray-900 w-full max-w-md mx-auto"
                style={modalStyles.container}
            >
                <div className="px-6 py-4">
                    {/* Header */}
                    <div className="flex" style={modalStyles.header}>
                        <button
                            onClick={onClose}
                            type="button"
                            className="text-sm font-medium text-gray-900 rounded-lg"
                        >
                            <svg class="w-6 h-6 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                        </button>
                    </div>

                    {/* Title */}
                    {title && (
                        <h1 className="font-semibold text-xl text-start font-quicksand text-black mb-6">
                            {title}
                        </h1>
                    )}

                    {/* Content */}
                    <form onSubmit={onSubmit} className="space-y-4">
                        {children}

                        {/* Footer */}
                        <div className="flex justify-center items-center mt-4">
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-quicksand font-medium rounded-lg text-sm px-5 py-2.5 dark:text-white dark:hover:bg-gray-800"
                                >
                                    {cancelButtonText}
                                </button>
                                <button
                                    type="submit"
                                    className="text-white bg-custom-cyan hover-bg-custom-cyanBlack focus:ring-1 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-custom-cyanDark hover-bg-custom-cyanDark"
                                >
                                    {submitButtonText}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddMembers
