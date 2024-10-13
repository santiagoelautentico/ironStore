import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [departamentos, setDepartamentos] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [ciudades, setCiudades] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  function createAcount() {
    fetch("https://crypto.develotion.com/usuarios.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: user,
        password: password,
        idDepartamento: parseInt(selectedDepartamento),
        idCiudad: parseInt(selectedCity),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al crear el usuario");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("apiKey", data.apiKey);
        console.log(data, "usuario creado exitosamente");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  useEffect(() => {
    fetch("https://crypto.develotion.com/departamentos.php")
      .then((response) => response.json())
      .then((data) => setDepartamentos(data.departamentos))
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    if (selectedDepartamento) {
      fetch(
        `https://crypto.develotion.com/ciudades.php?idDepartamento=${selectedDepartamento}`
      )
        .then((response) => response.json())
        .then((data) => setCiudades(data.ciudades))
        .catch((error) => console.error(error));
    } else {
      setCiudades([]);
    }
  }, [selectedDepartamento]);
  function handleSubmit(e) {
    e.preventDefault();
    if (!user || !password || !selectedDepartamento || !selectedCity) {
      setSuccessMessage("Por favor, complete todos los campos.");
    } else {
      createAcount();
    }
  }
  return (
    <>
      <h2>Iniciar Sesión</h2>
      <article>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Usuario</label>
            <input
              type="text"
              name="user"
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)} // Actualiza el estado del usuario
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado del password
            />
          </div>
          <div>
            <label htmlFor="departamentos">Departamento</label>
            <select
              name="departamentos"
              id="departamentos"
              value={selectedDepartamento}
              onChange={(e) => setSelectedDepartamento(e.target.value)} // Actualiza el estado del departamento seleccionado
            >
              <option value="" disabled>
                Departamento
              </option>
              {departamentos.map((departamento) => (
                <option key={departamento.id} value={departamento.id}>
                  {departamento.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ciudades">Ciudad</label>
            <select
              name="ciudades"
              id="ciudades"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)} // Actualiza la ciudad seleccionada
            >
              <option value="" disabled>
                Ciudad
              </option>
              {ciudades.map((ciudad) => (
                <option key={ciudad.id} value={ciudad.id}>
                  {ciudad.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit">Crear Cuenta</button>
          </div>
        </form>

        {/* Mostrar el mensaje de éxito o error */}
        <h2 id="SuccessMessage">{successMessage}</h2>
      </article>
    </>
  );
}

export default SignIn;
