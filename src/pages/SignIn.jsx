import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUsername } from "../redux/userName.js";
import { useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";
function SignIn() {
  const [departamentos, setDepartamentos] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [ciudades, setCiudades] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("apiKey");
    localStorage.removeItem("userID");
  }, []);

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
        localStorage.setItem("userID", data.id);
        dispatch(setUsername(user));
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error al crear el usuario");
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
      toast.error("Todos los campos son obligatorios");
    } else {
      createAcount();
    }
  }
  return (
    <>
      <section className="sectionLogin">
        <form onSubmit={handleSubmit} className="formSign">
          <h1>Iniciar Sesión</h1>
          <div className="inputContainer">
            <label htmlFor="email">Usuario</label>
            <input
              type="text"
              name="user"
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)} // Actualiza el estado del usuario
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado del password
            />
          </div>
          <div className="city-container">
            <div className="inputContainer">
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
            <div className="inputContainer">
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
          </div>
          <div>
            <button type="submit" className="btnLogin buttonBuy">
              Crear Cuenta
            </button>
          </div>
        </form>
        <Toaster position="top-center" richColors />
      </section>
    </>
  );
}

export default SignIn;
