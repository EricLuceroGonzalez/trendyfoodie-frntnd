import React, { useState } from "react";
import "./Landing.css";
import Button from "../UIElements/Button";
import FormCompo from "./FormComponent";

const Landing = () => {
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
        <div className="name-brand col-12 mr-auto ml-auto">
          {!showModal && (
            <img
              className="mt-3 fade-in-left"
              alt='Danny Duran on a bike'
              src="https://res.cloudinary.com/dcvnw6hvt/image/upload/v1617084235/danny/danny_logo_iv6s5b.png"
            />
          )}
        </div>
        <div className="landing-text col-8">
          <p className="text-1">Tengo una sorpresa para ti</p>
          <p className="text-2">
            Suscríbete y descubre a mi contenido exclusivo{" "}
          </p>
          <p className="text-3">
            <span role="img" aria-label="sheep">
              😈
            </span>
            +Música+Fotos+Videos
            <span role="img" aria-label="sheep">
              😈
            </span>
          </p>
        </div>
        {!showModal && (
          <div className="actionBtn col-12">
            <Button
              onClick={() => {
                setOpened("opened");
                openCloseModal();
              }}
            >
              Suscríbete gratis
            </Button>
          </div>
        )}{" "}
        <div>
          <FormCompo
            isOpen={opened}
            showModal={showModal}
            errorHandler={errorHandler}
            openCloseModal={openCloseModal}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Landing;
