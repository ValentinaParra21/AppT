const obtenerRutasP = (isAuthenticated, roles) => {
    const rutasBase = [
        { nombre: 'Homepage', ruta: '/Homepage', roles: [] },
        ...(isAuthenticated ? [] : [{ nombre: 'Sesion', ruta: '/Sesion', roles: [] }]),
    ];


    const rutasAdmin = [
        { nombre: "Platillos", ruta: "/platillos", roles: ["Admin", "Root"] },
        { nombre: "Pedidos", ruta: "/pedidos", roles: ["Admin", "Root"] },
        { nombre: "Usuario", ruta: "/usuario", roles: ["Admin", "Root"] },
        { nombre: "Productos", ruta: "/Productos", roles: ["Admin", "Root"] },
        { nombre: "facturas", ruta: "/facturas", roles: ["Admin", "Root"] },
    ];


    const rutasMesero = [
        { nombre: "Platillos", ruta: "/platillos", roles: ["Mesero", "Root"] },
        { nombre: "Pedidos", ruta: "/pedidos", roles: ["Mesero", "Root"] },
        { nombre: "Productos", ruta: "/Productos", roles: ["Mesero", "Root"] },
    ];
    const rutasCocinero = [
        { nombre: "Pedidos", ruta: "/pedidos", roles: ["Cocinero", "Root"] },
    ];

    let rutasPermitidas = [
        ...rutasBase,
        ...(isAuthenticated && (roles.includes("Admin") || roles.includes("Root")) ? rutasAdmin : []),
        ...(isAuthenticated && (roles.includes("Mesero") || roles.includes("Root")) ? rutasMesero : []),
        ...(isAuthenticated && (roles.includes("Cocinero") || roles.includes("Root")) ? rutasCocinero : []),
    ];

    return rutasPermitidas.filter((ruta, index, self) =>
        index === self.findIndex((r) => r.ruta === ruta.ruta)
    );
};

export default obtenerRutasP;
