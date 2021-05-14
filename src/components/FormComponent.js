import React, { useState, useLayoutEffect, useEffect } from "react";
import { useForm } from "../hooks/form-hook";
import Modal from "./Modal";
import Input from "../UIElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../utils/validators";
import Button from "../UIElements/Button";
import { useHttpClient } from "../hooks/http-hook";
import { useHistory } from "react-router-dom";

const FormCompo = (props) => {
  const history = useHistory();
  const { sendRequest } = useHttpClient();
  const [hasValue, setHasValue] = useState(false);
  const [ipValue, setIpValue] = useState("");
  const [size, setSize] = useState([0, 0]);
  const [gender, setGender] = useState("");
  const [acceptData, setAcceptData] = useState(true);
  const [animate, setAnimate] = useState(false);
  // Initialize state with form-hook
  const [formState, inputHandler] = useForm(
    {
      name: { value: "", isValid: false },
      email: { value: "", isValid: false },
    },
    false
  );
  //! Get window size
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const getGender = async () => {
      let gen = await sendRequest(
        `https://api.genderize.io/?name=${
          formState.inputs.name.value.split(" ")[0]
        }`
      );
      setGender(gen.gender);
    };

    if (formState.inputs.name.value) {
      getGender();
      return () => {};
    }
  }, [formState.inputs.name.value, sendRequest]);

  useEffect(() => {
    // get IP
    
    const getIPAddress = async () => {
      try {
        let ipValues = await sendRequest(
          `https://geolocation-db.com/json/${process.env.REACT_APP_IP_DOMAIN_KEY}`
        );
        setIpValue(ipValues);
        setHasValue(true);
      } catch (err) {
        console.log(err);
      }
    };

    if (!hasValue) {
      getIPAddress();
    }

    return () => {
      // setHasValue(false);
    };
  }, [hasValue, props.isOpen, ipValue, sendRequest]);

  const sendData = async () => {
    const data = {
      name: formState.inputs.name.value,
      email: formState.inputs.email.value,
      gender: gender,
      IPv4: ipValue.IPv4,
      country: ipValue.country_name,
      city: ipValue.city,
      state: ipValue.state,
      windowW: size[0],
      windowH: size[1],
    };
    if (formState.isValid && acceptData) {
      setAnimate(!animate);
      // console.log(data);

      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/form/send`,
          "POST",
          JSON.stringify(data),
          { "Content-Type": "application/json" }
        );
        props.openCloseModal();
        history.push("/thanks");
      } catch (err) {}
    }
  };

  const AcceptData = () => {
    setAcceptData(!acceptData);
  };
  return (
    <React.Fragment>
      {/* {isLoading && <LoadingSpinner asOverlay />} */}
      <Modal
        show={props.showModal}
        closeModal={() => props.openCloseModal()}
        onClear={props.errorHandler}
        // header={"DANNY DURAN"}
        footer={
          <Button
            animate={animate ? "roll-out-blurred-right" : ""}
            disabled={!formState.isValid || !acceptData}
            onClick={() => sendData()}
          >
            {" "}
            Enviar{" "}
          </Button>
        }
      >
        {animate && (
          <div className="loading-form">
            {" "}
            <span role="img" aria-label="tiger emoji">
              🍕{" "}
            </span>
            Loading
            <span role="img" aria-label="tiger emoji">
              🍕{" "}
            </span>
          </div>
        )}
        {!animate && (
          <React.Fragment>
            <Input
              element="input"
              id="name"
              type="text"
              label="Nombre"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
              errorText="Introduce un nombre"
              onInput={inputHandler}
            />
            <Input
              element="input"
              id="email"
              type="text"
              label="Correo"
              validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
              errorText="Introduce un correo válido"
              onInput={inputHandler}
            />
            <div className="col-12 col-md-6 col-lg-10 d-flex">
              <input
                type="checkbox"
                defaultChecked={true}
                onChange={() => {
                  AcceptData();
                }}
              />
              <label
                style={{
                  marginLeft: "6px",
                  color: "whitesmoke",
                  fontFamily: "Arial",
                  fontSize: "0.5em",
                }}
              >
                Sí, acepto las políticas de privacidad de TargetFoodie y recibir
                noticias, contenidos, comunicaciones relacionados a la marca.
              </label>
            </div>
          </React.Fragment>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default FormCompo;
