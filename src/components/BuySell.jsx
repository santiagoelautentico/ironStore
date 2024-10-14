import React from "react";
import { useSelector } from "react-redux";

const BuySell = () => {
  const coins = useSelector((state) => state.coins.coins);
  const [selectedCoin, setSelectedCoin] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("");
  const [errorMsj, setErrorMsj] = React.useState("");
  const [msjTotal, setMsjTotal] = React.useState(0);
  const [msjValue, setMsjValue] = React.useState(0);

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    setSelectedCoin(selectedId);
    console.log(selectedId, "ID de la cripto seleccionada");
    const selectedCoinData = coins.find(
      (coin) => coin.id === parseInt(selectedId)
    );
    setMsjValue(selectedCoinData ? selectedCoinData.cotizacion : 0);
    setMsjTotal(0); // Resetea msjTotal cuando se selecciona una nueva cripto
  };

  const handleValueChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    console.log(value, "valor de la cripto seleccionada");
    const selectedCoinData = coins.find(
      (coin) => coin.id === parseInt(selectedCoin)
    );
    setMsjTotal(selectedCoinData ? selectedCoinData.cotizacion * value : 0);
  };

  const buyCripto = () => {
    if (selectedCoin === "" || selectedValue === "") {
      setErrorMsj("Por favor, selecciona una cripto y un monto");
    } else {
      setErrorMsj(""); // Limpiar mensaje de error
      // Llamada a la API para comprar cripto
      fetch("https://crypto.develotion.com/transacciones.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: localStorage.getItem("apiKey"),
        },
        body: JSON.stringify({
          idUsuario: 3018,
          tipoOperacion: 1, // Tipo de operación (compra)
          moneda: parseInt(selectedCoin), // ID de la moneda seleccionada
          cantidad: selectedValue, // Cantidad seleccionada
          valorActual: msjTotal, // Valor total calculado
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "transacción exitosa");
          setErrorMsj("");
          // Limpiar campos y estados
          setSelectedCoin("");
          setSelectedValue("");
          setMsjValue(0);
          setMsjTotal(0);
          document.getElementById("selectCoinBuy").value = "";
          document.getElementById("valueBuy").value = "";
        })
        .catch((error) => {
          console.error("Error:", error);
          setErrorMsj("Error al realizar la transacción");
        });
    }
  };

  return (
    <article className="containerBuy">
      <div className="headerBuy">
        <h3 className="title-buy">Compra Criptos</h3>
        <h3>Venta Criptos</h3>
      </div>
      <form action="" className="formBuy">
        <div className="inputContainer">
          <div className="headerLabelBuy">
            <label htmlFor="">Cripto</label>
            {msjValue > 0 && <h3>{`Cotización actual: ${msjValue}`}</h3>}
          </div>
          <select
            name="selectCoin"
            id="selectCoinBuy"
            onChange={handleSelectChange}
          >
            <option value="" defaultValue={"Selecciona una cripto"}>
              Selecciona una cripto
            </option>
            {coins.map((coin) => (
              <option value={coin.id} key={coin.id}>
                {coin.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="inputContainer">
          <div className="headerLabelBuy">
            <label htmlFor="">Cantidad</label>
            {msjTotal > 0 && <h3>{`Valor total: ${msjTotal.toFixed(2)}`}</h3>}
          </div>
          <input
            type="number"
            placeholder="Selecciona un monto"
            onChange={handleValueChange}
            id="valueBuy"
          />
        </div>
        <a className="buttonBuy" onClick={buyCripto}>Comprar</a>
      </form>
      <h4>{errorMsj}</h4>
    </article>
  );
};

export default BuySell;
