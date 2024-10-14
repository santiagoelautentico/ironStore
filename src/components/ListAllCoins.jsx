import React from "react";
import { useSelector } from "react-redux";

function ListAllCoins() {
  const coins = useSelector((state) => state.coins.coins);

  console.log(coins, "lista de las monedas");

  function addAnimation() {
    scroller.forEach((scroller) => {
      scroller.setAttribute('data-animated', true);

      const scrollerInner = scroller.querySelector('.scroller_inner');
      const scrollerContent = Array.from(scrollerInner.children);
      
      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute('aria-hidden', true);
        scrollerInner.appendChild(duplicatedItem);
      })

    })
  }

  const scroller = document.querySelectorAll(".scroller");
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation()
  }
  return (
    <>
      <section className="sectionCoins">
        <article className="scroller">
          <ul className="listCoins scroller_inner">
            {coins.map((coin) => (
              <li key={coin.id} className="coinValueContainer">
                <h3 className="coinName">{coin.nombre} <span className="coinValue">$ {coin.cotizacion}</span></h3>
                {/* <h3 className="coinValue">$ {coin.cotizacion}</h3> */}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </>
  );
}

export default ListAllCoins;
