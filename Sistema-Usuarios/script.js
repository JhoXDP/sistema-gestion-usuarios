// ===== LOGIN ===== //
const users = [
    { id: 1, username: "admin", password: "admin123", role: "admin" },
    { id: 2, username: "empleado", password: "empleado123", role: "empleado" }
];

// Función para manejar el login
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "dashboard.html";
        } else {
            document.getElementById("error-message").classList.remove("hidden");
        }
    });
}

// ===== DASHBOARD (CRUD) ===== //
if (document.getElementById("userForm")) {
    // Datos iniciales (simulando base de datos)
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Cargar usuarios en la tabla
    function renderUsers() {
        const tbody = document.querySelector("#usersTable tbody");
        tbody.innerHTML = "";

        storedUsers.forEach(user => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button onclick="editUser(${user.id})">Editar</button>
                    <button onclick="deleteUser(${user.id})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Agregar nuevo usuario
    document.getElementById("userForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const role = document.getElementById("role").value;

        const newUser = {
            id: Date.now(),
            name,
            email,
            role
        };

        storedUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(storedUsers));
        renderUsers();
        this.reset();
    });

    // Cerrar sesión
    document.getElementById("logoutBtn").addEventListener("click", function() {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    });

    // Verificar autenticación al cargar el dashboard
    if (!localStorage.getItem("currentUser")) {
        window.location.href = "index.html";
    } else {
        renderUsers();
    }

    // Funciones para editar y eliminar (simuladas)
    window.editUser = function(id) {
        alert(`Editar usuario con ID: ${id} (Función en desarrollo)`);
    };

    window.deleteUser = function(id) {
        if (confirm("¿Eliminar este usuario?")) {
            storedUsers = storedUsers.filter(user => user.id !== id);
            localStorage.setItem("users", JSON.stringify(storedUsers));
            renderUsers();
        }
    };
}