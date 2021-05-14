import React, { useState } from "react";
import "./Landing.css";
import Button from "../UIElements/Button";
import FormCompo from "./FormComponent";
import { useHistory } from "react-router-dom";
// const FormCompo = React.lazy(() => {
// import("./FormComponent");
// });

const Landing = () => {
  const route = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [opened, setOpened] = useState("closed");

  const errorHandler = () => {
    setShowModal(false);
  };

  const openCloseModal = () => {
    setShowModal(!showModal);
  };

  return (
    <React.Fragment>
      <div className="total-bg">
        {/* <div className="landing-container"> */}
        {/* <div className=" col-12 borderA"></div> */}
        {/* <div className=" col-12 borderB"></div> */}
        <div className="d-flex flex-column flex-lg-column text-cover-div">
          {!showModal && (
            <div className="landing-text mt-5 col-8 col-sm-8 col-lg-4 fade-in-right mr-auto ml-auto">
              <h1 className="text-1">PIZZA DEMO </h1>
              <span className="text-2">Haz click y registrate para</span>
              <span className="text-3">obtener deliciosos descuentos</span>
            </div>
          )}
          <div>
            <FormCompo
              isOpen={opened}
              showModal={showModal}
              errorHandler={errorHandler}
              openCloseModal={openCloseModal}
            />
          </div>
          <div>
            <Button
              onClick={() => {
                route.push("/menu");
              }}
            >
              ver menu
            </Button>
          </div>
        </div>
        {!showModal && (
          <div className="actionBtn col-12 mt-5">
            <Button
              onClick={() => {
                setOpened("opened");
                openCloseModal();
              }}
            >
              <span role="img" aria-label="tiger emoji">
                🍕{" "}
              </span>
              Obtener descuento
            </Button>
          </div>
        )}{" "}
      </div>
      <div className="col-6 toConsola">
        {" "}
        <div onClick={() => route.push('privateDataAccess')} size={"small"}>
          Dashboard
        </div>
      </div>
    </React.Fragment>
  );
};

export default Landing;
