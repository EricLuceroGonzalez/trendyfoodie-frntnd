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
import LoadingSpinner from "../UIElements/LoadingSpinner";

const FormCompo = (props) => {
  const history = useHistory();
  const { isLoading, sendRequest } = useHttpClient();
  const [hasValue, setHasValue] = useState(false);
  const [ipValue, setIpValue] = useState("");
  const [size, setSize] = useState([0, 0]);
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

  // useEffect(() => {
  //   console.log(`props.isOpen: ${props.isOpen}`);
  //   console.log(`formState.isValid: ${formState.isValid}`);
  // }, [props, formState]);

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
        // console.log(err);
      }
    };
    // To call backend
    // const callVisit = async () => {
    //   try {
    //     await sendRequest(
    //       `${process.env.REACT_APP_BACKEND_URL}/visit/visitAdd`,
    //       "POST",
    //       JSON.stringify({ ipValue }),
    //       { "Content-Type": "application/json" }
    //     );
    //   } catch (err) {
    //   }
    // };

    if (!hasValue) {
      getIPAddress();
    }
    if (hasValue && props.isOpen === "opened") {
      // callVisit();
    }

    return () => {
      // cleanup
    };
  }, [hasValue, props.isOpen, ipValue, sendRequest]);

  const sendData = async () => {
    const data = {
      name: formState.inputs.name.value,
      email: formState.inputs.email.value,
      IPv4: ipValue.IPv4,
      country: ipValue.country_name,
      city: ipValue.city,
      state: ipValue.state,
      windowW: size[0],
      windowH: size[1],
    };
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/form/send`,
        "POST",
        JSON.stringify(data),
        { "Content-Type": "application/json" }
      );
      props.openCloseModal();
      history.push('/thanks')
    } catch (err) {
    }
  };
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <Modal
        show={props.showModal}
        closeModal={() => props.openCloseModal()}
        onClear={props.errorHandler}
        // header={"DANNY DURAN"}
        footer={
          <Button disabled={!formState.isValid} onClick={() => sendData()}>
            {" "}
            Enviar{" "}
          </Button>
        }
      >
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
      </Modal>
    </React.Fragment>
  );
};

export default FormCompo;
