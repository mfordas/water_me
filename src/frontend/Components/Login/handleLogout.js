const handleLogout = (logoutFunction) => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    window.location.reload();
};

export default handleLogout;