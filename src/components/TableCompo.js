import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { CSVLink } from "react-csv";
import { useHttpClient } from "../hooks/http-hook";
import "./TableStyle.css";
import TimeClock from "./TimeClock";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import { AuthContext } from "../utils/auth-context";
import ChartsComponent from "./ChartsComponent";

const TableCompo = () => {
  const auth = useContext(AuthContext);
  const [datas, setData] = useState([]);
  const { isLoading, sendRequest } = useHttpClient();

  const headers = [
    { label: "Nombre", key: "name" },
    { label: "Correo", key: "email" },
    { label: "Pais", key: "country" },
    { label: "Genero", key: "gender" },
    { label: "Ip", key: "IPv4" },
    { label: "Creado", key: "creationDate" },
    { label: "Pantalla", key: "windowPixels" },
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
      // console.log(item.name)
      <tr
        key={k}
        style={{
          backgroundColor: "white",
          // color: "black",
          // fontFamily: "monospace",
          fontFamily: "Changa",
          fontWeight: "500",
          fontSize: "0.75em",
        }}
      >
        <td>{k + 1}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.country ? item.country : "----"}</td>
        <td>
          {item.gender ? (item.gender === "male" ? "Hombre" : "Mujer") : "----"}
        </td>
        <td>{item.IPv4 ? item.IPv4 : "----"}</td>
        <td>{moment(item.creationDate).format("L")}</td>
        <td>{moment(item.creationDate).format("LTS")}</td>
        <td>{item.windowPixels ? item.windowPixels[0] : ""}</td>
        <td>{item.windowPixels ? item.windowPixels[1] : ""}</td>
      </tr>
    ));
    return allRows;
    // }
  };

  return (
    <div>
      <TimeClock />
      {isLoading && <LoadingSpinner asOverlay />}
      <ChartsComponent data={datas}/>
      <table className="theTable table table-bordered mt-2 col-lg-6 col-md-8 col-12 ml-auto mr-auto table-sm mb-5">
        <thead>
          <tr
            style={{
              backgroundColor: "#000000",
              color: "white",
              fontFamily: "Changa",
            }}
          >
            <th></th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>País</th>
            <th>Sexo</th>
            <th>IP</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>W</th>
            <th>H</th>
          </tr>
        </thead>
        <tbody>{renderRoll()}</tbody>
      </table>
      {renderCSV()}
      <div className="col-6 downloadBtnRight">
        {" "}
        <div onClick={() => auth.logout()} size={"small"}>
          Salir
        </div>
      </div>
    </div>
  );
};

export default TableCompo;
