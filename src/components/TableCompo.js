import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { CSVLink } from "react-csv";
import { useHttpClient } from "../hooks/http-hook";
import "./TableStyle.css";
import TimeClock from "./TimeClock";
import pizzaImage from '../media/pizza.png'
import LoadingSpinner from "../UIElements/LoadingSpinner";
import { AuthContext } from "../utils/auth-context";
import ChartsComponent from "./ChartsComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMobile,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const TableCompo = () => {
  const route = useHistory()
  const auth = useContext(AuthContext);
  const [datas, setData] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

  const headers = [
    { label: "Nombre", key: "name" },
    { label: "Genero", key: "gender" },
    { label: "Pais", key: "country" },
    { label: "Correo", key: "email" },
    { label: "Ip", key: "IPv4" },
    { label: "Creado", key: "creationDate" },
    { label: "Pantalla (W)", key: "device.windowPixels[0]" },
    { label: "Pantalla (H)", key: "device.windowPixels[1]" },
    { label: "Pantalla", key: "device.oSystem" },
  ];

  const renderCSV = () => {
    return (
      <div>
        <CSVLink
          data={datas}
          filename={`${moment().format()}-DataSet.csv`}
          headers={headers}
          separator={","}
          target="_blank"
          className="downloadBtn"
        >
          Descargar
        </CSVLink>
      </div>
    );
  };
  useEffect(() => {
    const getData = async () => {
      try {
        let data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/form/getPeople`
        );
        setData(data.data);
      } catch (err) {}
    };
    getData();
    //   return () => {
    //   cleanup
    //   }
  }, [sendRequest]);
  const renderRoll = () => {
    // if (datas.length !== 0) {
    let allRows;
    allRows = datas.map((item, k) => (
      // if (k === 0) {
      // console.log('\n\n -------------------------');
      // }
      // console.log(`k = ${k}`)
      <tr
        key={k}
        style={{
          backgroundColor: "white",
          // color: "black",
          // fontFamily: "monospace",
          fontFamily: "Changa",
          fontWeight: "500",
          fontSize: "0.95em",
        }}
      >
        <td>{k + 1}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.country ? item.country : "----"}</td>
        <td>
          {item.gender ? (item.gender === "male" ? "Hombre" : "Mujer") : "----"}
        </td>
        <td>{moment(item.creationDate).format("L")}</td>
        <td>{moment(item.creationDate).format("LT")}</td>
        <td>{item.device.oSystem ? item.device.oSystem : ""}</td>
        <td>{item.device.windowPixels ? item.device.windowPixels[0] : ""}</td>
        <td>{item.device.windowPixels ? item.device.windowPixels[1] : ""}</td>
        <td>{item.IPv4 ? item.IPv4 : "----"}</td>
      </tr>
    ));
    return allRows;
    // }
  };

  return (
    <div style={{ backgroundColor: "whitesmoke", padding: "2rem 0" }}>
      <div className="theBrand col-12 mr-auto ml-auto">
        <img
          className={`mt-1`}
          title="The fantastic pizza"
          alt="The fantastic pizza logo"
          src={pizzaImage}
        />
        {/* )} */}
      </div>
      {isLoading && <LoadingSpinner asOverlay />}

      <ChartsComponent data={datas} />
      <table className="table table-bordered table-responsive col-12 col-md-12  mt-5 mb-5 ml-auto mr-auto">
        <thead>
          <tr
            style={{
              backgroundColor: "#000000",
              color: "white",
              fontFamily: "Changa",
            }}
          >
            <th>
              <FontAwesomeIcon icon={faUser} />
            </th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Pa??s</th>
            <th>Sexo</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>
              <FontAwesomeIcon icon={faMobileAlt} />
            </th>
            <th>W</th>
            <th>H</th>
            <th>IP</th>
          </tr>
        </thead>
        <tbody>{renderRoll()}</tbody>
      </table>
      {renderCSV()}
      <div className="col-6 downloadBtnRight">
        {" "}
        {/* auth.logout() */}
        <div onClick={() => route.push('/')} size={"small"}>
        
          Salir
        </div>
      </div>
    </div>
  );
};

export default TableCompo;
