import React, { useState, useEffect } from "react";
import "./Landing.css";
import BackgroundImage from "./BackgroundImage";
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
          <img 
          className='mt-3'
          src="https://res.cloudinary.com/dcvnw6hvt/image/upload/v1617084235/danny/danny_logo_iv6s5b.png" />
        </div>
        <div style={{ position: "absolute", top: "3px", right: "3px" }}>
          {opened}
        </div>
        {/* <div>
          <BackgroundImage />
        </div> */}
        <div className="actionBtn col-12">
          <Button
            onClick={() => {
              setOpened("opened");
              openCloseModal();
            }}
          >
            Action Button
          </Button>
        </div>
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
