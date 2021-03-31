import React, { useState, useLayoutEffect, useEffect } from "react";
import { useForm } from "../hooks/form-hook";
import Modal from "./Modal";
import Input from "../UIElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../utils/validators";
import PhoneInputs from "./PhoneInput";
import Button from "../UIElements/Button";
import { useHttpClient } from "../hooks/http-hook";
import { useHistory } from "react-router-dom";

const FormCompo = (props) => {
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [hasValue, setHasValue] = useState(false);
  const [ipValue, setIpValue] = useState("");
  const [phone, setPhone] = useState("");
  const [size, setSize] = useState([0, 0]);
  // Initialize state with form-hook
  const [formState, inputHandler, setFormData] = useForm(
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
    console.log(`props.isOpen: ${props.isOpen}`);
  }, [props]);

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
    // To call backend
    const callVisit = async () => {
      console.log("here in callVisit()");

      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/visit/visitAdd`,
          "POST",
          JSON.stringify({ ipValue }),
          { "Content-Type": "application/json" }
        );
      } catch (err) {
        console.log(err);
      }
    };
    console.log(`hasValue: ${hasValue}`);

    if (!hasValue) {
      console.log(ipValue);

      getIPAddress();
    }
    if (hasValue && props.isOpen === "opened") {
      callVisit();
    }

    return () => {
      // cleanup
    };
  }, [hasValue, props.isOpen]);

  const sendData = async () => {
    console.log('send');
          history.push('/thanks')
    // const data = {
    //   name: formState.inputs.name.value,
    //   email: formState.inputs.email.value,
    //   IPv4: ipValue.IPv4,
    //   country: ipValue.country_name,
    //   city: ipValue.city,
    //   state: ipValue.state,
    //   lat: ipValue.latitude,
    //   lon: ipValue.longitude,
    //   windowW: size[0],
    //   windowH: size[1],
    // };
    // console.log(data);

    // try {
    //   await sendRequest(
    //     `${process.env.REACT_APP_BACKEND_URL}/form/send`,
    //     "POST",
    //     JSON.stringify(data),
    //     { "Content-Type": "application/json" }
    //   );
    //   props.openCloseModal();
    //   // history.push('/thanks')
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <React.Fragment>
      <Modal
        show={props.showModal}
        closeModal={() => props.openCloseModal()}
        //   title={props.category}
        //   products={props.products}
        onClear={props.errorHandler}
        header={"DANNY DURAN"}
        footer={<Button onClick={() => sendData()}> ENVIAR </Button>}
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
        {/* <Input
          id="phone"
          type="text"
          element="phonenumber"
          label="Número de teléfono"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          value={phone}
          errorText="número de teléfono no valido"
          initialValue={formState.inputs.phone.value}
          onInput={inputHandler}
          theComponent={
            <PhoneInputs
              countrySelectProps={{ unicodeFlags: true }}
              defaultCountry={"PA"}
              value={phone}
              //  || ls.get("phone")}
              onChange={(e) => setPhone(e)}
              // initialValue={ls.get('phone')}
            ></PhoneInputs> */}
        } />
      </Modal>
    </React.Fragment>
  );
};

export default FormCompo;
