function toggleSubmenu(id) {
    const submenu = document.getElementById(id);

    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
    } else {
        submenu.style.display = 'block';
    }
}
