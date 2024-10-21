import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTransaction } from "../redux/transactionReducer.js";
import { Toaster, toast } from "sonner";

const BuySell = () => {
  const coins = useSelector((state) => state.coins.coins);
  const dispatch = useDispatch(); // Inicializar dispatch
  const [selectedCoin, setSelectedCoin] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("");
  const [errorMsj, setErrorMsj] = React.useState("");
  const [msjTotal, setMsjTotal] = React.useState(0);
  const [msjValue, setMsjValue] = React.useState(0);
  const [changeTransaction, setChangeTransaction] = React.useState(1);

  const switchRef = useRef(null);

  console.log(changeTransaction);
  const handleTransactionSwitch = () => {
    setChangeTransaction(changeTransaction === 1 ? 2 : 1);
  };
  const handleCoinChange = (e) => {
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
    const value = parseFloat(selectedValue);
    let transiction = {
      idUsuario: localStorage.getItem("userID"),
      tipoOperacion: changeTransaction,
      moneda: parseInt(selectedCoin),
      cantidad: value,
      valorActual: msjTotal,
    };

    if (
      selectedCoin === "" ||
      selectedValue === "" ||
      !Number.isInteger(value)
    ) {
      toast.error("Trasaccion invalida, pruebe de nuevo");
    } else {
      setErrorMsj("");
      fetch("https://crypto.develotion.com/transacciones.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: localStorage.getItem("apiKey"),
        },
        body: JSON.stringify(transiction),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "transacción exitosa");
          dispatch(addTransaction(transiction));
          // clean fields
          setErrorMsj("");
          setSelectedCoin("");
          setSelectedValue("");
          setMsjValue(0);
          setMsjTotal(0);
          document.getElementById("selectCoinBuy").value = "";
          document.getElementById("valueBuy").value = "";
          toast.success("Se realizo la transacción con exito!");
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error al realizar la transacción");
        });
    }
  };

  return (
    <article className="containerBuy">
      <div className="headerBuy">
        <h3 className="title-buy">
          {changeTransaction === 1 ? "Comprar Criptos" : "Vender Criptos"}
        </h3>
        <label class="switch">
          <input
            type="checkbox"
            ref={switchRef}
            onChange={handleTransactionSwitch}
            checked={changeTransaction === 2}
            id="switch"
          />
          <span class="slider round"></span>
        </label>
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
            onChange={handleCoinChange}
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
        <a className="buttonBuy" onClick={buyCripto}>
          {changeTransaction === 1 ? "Comprar" : "Vender"}
        </a>
      </form>
      <h4>{errorMsj}</h4>
      <Toaster position="top-center" richColors />
    </article>
  );
};

export default BuySell;
