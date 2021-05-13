import React, { useEffect, useState } from "react";
import menuData from "../media/menu-cart.json";

const MenuComponent = () => {
  const [fullMenu, setFullMenu] = useState();
  useEffect(() => {
    console.log(menuData);
    setFullMenu(menuData);
    console.log("asdasdasd");

    return () => {};
  }, [menuData]);

  const renderStarters = () => {
    if (fullMenu) {
      return fullMenu.starters.map((starter, key) => {
        console.log("asd");
        console.log(starter.name);
        console.log(starter.price);

        return (
          <div key={key} className="col-12 col-md-8 mr-auto ml-auto">
            <div className="d-flex mt-5">
              <h2 style={{ color: "red" }}>{starter.name}</h2>
              <h6 style={{ color: "black", marginLeft: "20px" }}>
                {starter.price}
              </h6>
            </div>
            <p style={{ color: "gray", textAlign: "left" }}>{starter.about}</p>
          </div>
        );
      });
    }
  };

  const renderPizzas = () => {
    if (fullMenu) {
      console.log(fullMenu);
      let aaa;
      return fullMenu.pizza.map((starter, key) => {
        console.log("asd");
        console.log(starter.name);
        console.log(starter.price);

        return (
          <div key={key} className="col-12 col-md-8 mr-auto ml-auto">
            <div className="d-flex mt-5">
              <h2 style={{ color: "red" }}>{starter.name}</h2>
              <h6 style={{ color: "black", marginLeft: "20px" }}>
                {starter.price}
              </h6>
            </div>
            <p style={{ color: "gray", textAlign: "left" }}>{starter.about}</p>
          </div>
        );
      });
    }
  };
  const renderPastas = () => {
    console.log("\n\n\n\n\n\nerrrer");

    if (fullMenu) {
      console.log(fullMenu);
      let aaa;
      return fullMenu.pasta.map((starter, key) => {
        console.log("asd");
        console.log(starter.name);
        console.log(starter.price);

        return (
          <div key={key} className="col-12 col-md-8 mr-auto ml-auto">
            <div className="d-flex mt-5">
              <h2 style={{ color: "red" }}>{starter.name}</h2>
              <h6 style={{ color: "black", marginLeft: "20px" }}>
                {starter.price}
              </h6>
            </div>
            <p style={{ color: "gray", textAlign: "left" }}>{starter.about}</p>
          </div>
        );
      });
    }
  };

  return (
    <div>
      <div className="mt-5">
        <h2>menu</h2>
      </div>
      <div>
        <h1
          style={{
            color: "white",
            backgroundColor: "black",
            padding: "1em 0em",
          }}
        >
          Starters
        </h1>
        {renderStarters()}
      </div>
      <div>
        <h1
          style={{
            color: "white",
            backgroundColor: "black",
            padding: "1em 0em",
          }}
        >
          Pizzas
        </h1>
        {renderPizzas()}
      </div>
      <div>
        <h1
          style={{
            color: "white",
            backgroundColor: "black",
            padding: "1em 0em",
          }}
        >
          Pastas
        </h1>
        {renderPastas()}
      </div>
    </div>
  );
};

export default MenuComponent;
