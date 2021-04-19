import React, { useState } from "react";
import "./Landing.css";
import Button from "../UIElements/Button";
import FormCompo from "./FormComponent";
// const FormCompo = React.lazy(() => {
// import("./FormComponent");
// });

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
        {/* <div className="landing-container"> */}
        <div className="name-brand col-12 mr-auto ml-auto">
          {/* {!showModal && ( */}
            <img
              className={`mt-3 ${!showModal ? 'fade-in-left' : ''}`}
              alt="Danny Duran on a bike"
              src="https://res.cloudinary.com/dcvnw6hvt/image/upload/v1617084235/danny/danny_logo_iv6s5b.png"
            />
          {/* )} */}
        </div>
        {/* <div className=" col-12 borderA"></div> */}
        {/* <div className=" col-12 borderB"></div> */}
        <div className="d-flex flex-column flex-md-row flex-lg-column text-cover-div">
          {!showModal && (
            <div className="landing-text mt-5 col-12 col-md-6 col-lg-12 fade-in-right">
              <span className="text-1">Tengo una </span>
              <span className="text-2">sorpresa para ti</span>
              <span className="text-3">Suscríbete y descúbrela</span>
            </div>
          )}
          <div className="cover mt-5 col-12 col-md-6 col-lg-12">
            <img
              className=" fade-in-right"
              alt="Danny Duran and Alkilados making music"
              src="https://res.cloudinary.com/dcvnw6hvt/image/upload/v1618553166/danny/danny-duran-front500x500_psnfxd.jpg"
            />
          </div>
        </div>
        <div>
          <FormCompo
            isOpen={opened}
            showModal={showModal}
            errorHandler={errorHandler}
            openCloseModal={openCloseModal}
          />
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
                🐯{" "}
              </span>
              Suscríbete
            </Button>
          </div>
        )}{" "}
      </div>
    </React.Fragment>
  );
};

export default Landing;
