import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Input from "../UIElements/Input";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../utils/validators";
import { useForm } from "../hooks/form-hook";
import "./Landing.css";
import BackgroundImage from "./BackgroundImage";
import Button from "../UIElements/Button";

const Landing = () => {
  const [showModal, setShowModal] = useState(false);
  // Initialize state with form-hook
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: { value: "", isValid: false },
      email: { value: "", isValid: false },
      country: { value: "", isValid: false },
    },
    false
  );

  const errorHandler = () => {
    setShowModal(false);
  };

  const openCloseModal = () => {
    setShowModal(!showModal);
  };

  return (
    <React.Fragment>
      <div className="total-bg">
        <div className="name-brand col-10 mr-auto ml-auto">
          <h1>Danny Duran</h1>
          <h5 className="col-4 mr-auto ml-auto">Music</h5>
        </div>
        <div>
          <BackgroundImage />
        </div>
        <div className="actionBtn">
          <Button onClick={() => openCloseModal()}>Action Button</Button>
        </div>
        <div>
          <Modal
            show={showModal}
            closeModal={() => openCloseModal()}
            //   title={props.category}
            //   products={props.products}
            onClear={errorHandler}
            header={"DANNY DURAN"}
            footer={
              <Button onClick={() => openCloseModal()}>
                {" "}
                ENVIAR{" "}
                <span alt="Music Note" aria-label="music">
                  🎵
                </span>
              </Button>
            }
          >
            <Input
              element="input"
              id="name"
              type="text"
              label="Nombre"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name"
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="email"
              type="text"
              label="Correo"
              validators={[VALIDATOR_EMAIL, VALIDATOR_REQUIRE()]}
              errorText="Please enter a name"
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="country"
              type="text"
              label="País"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name"
              onInput={inputHandler}
            />
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Landing;
