/*
    ================================================================
    Script de Funcionalidad para el Portafolio
    Autor: Tu Nombre (Experto UI/UX)
    Descripción: Este archivo maneja la lógica para el cambio
    de tema (oscuro/claro).
    ================================================================
*/

// Usamos un 'DOMContentLoaded' para asegurarnos de que el DOM esté completamente
// cargado antes de intentar manipularlo.
document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTOS DEL DOM ---
    // Obtenemos el botón para cambiar el tema y el ícono dentro de él.
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = themeToggleButton.querySelector('i');
    const rootHtml = document.documentElement; // La etiqueta <html>

    // --- VARIABLES ---
    // Clave que usaremos para guardar la preferencia del usuario en el localStorage.
    const THEME_STORAGE_KEY = 'user-theme-preference';

    // --- LÓGICA DE INICIALIZACIÓN DEL TEMA ---

    /**
     * Función para aplicar un tema.
     * Cambia el atributo 'data-theme' en la etiqueta <html> y actualiza el ícono.
     * @param {string} theme - El tema a aplicar ('dark' o 'light').
     */
    const applyTheme = (theme) => {
        rootHtml.setAttribute('data-theme', theme);
        
        // Actualizamos el ícono del botón
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }

        // Guardamos la preferencia del usuario en localStorage
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    };

    /**
     * Función para obtener el tema inicial.
     * La lógica es la siguiente:
     * 1. Revisa si el usuario ya ha guardado una preferencia en localStorage.
     * 2. Si no, revisa la preferencia del sistema operativo (@media prefers-color-scheme).
     * 3. Si no hay ninguna preferencia, el valor por defecto es 'dark'.
     * @returns {string} - El tema a usar ('dark' o 'light').
     */
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
            return savedTheme; // 1. Usar tema guardado
        }
        
        // 2. Usar preferencia del sistema
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    };

    // Aplicamos el tema inicial al cargar la página
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);

    // --- MANEJADORES DE EVENTOS ---

    /**
     * Event Listener para el botón de cambio de tema.
     * Al hacer clic, alterna entre el tema oscuro y claro.
     */
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = rootHtml.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    /**
     * Event Listener para cambios en la preferencia del sistema.
     * Si el usuario cambia el tema de su SO (ej. de modo oscuro a claro),
     * la página web se actualizará automáticamente, SIEMPRE Y CUANDO
     * el usuario no haya establecido una preferencia manual (guardada en localStorage).
     */
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Solo actualizamos si el usuario no ha elegido un tema manualmente.
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
        }
    });
});