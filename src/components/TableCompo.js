import React, { useState, useEffect } from "react";
import moment from "moment";
import { useTable } from "react-table";
import { CSVLink } from "react-csv";
import { useHttpClient } from "../hooks/http-hook";
import './TableStyle.css'
import TimeClock from "./TimeClock";

const TableCompo = () => {
  const [datas, setData] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const headers = [
    { label: "Nombre", key: "name" },
    { label: "Correo", key: "email" },
    { label: "Pais", key: "country" },
    { label: "Ciudad", key: "city" },
    { label: "Ip", key: "IPv4" },
    { label: "Creado", key: "creationDate" },
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
          className='downloadBtn'
        >
            Descargar{" "}
            <span role="img" aria-label="memo">
              📝
            </span>
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
        console.log(data.data);
      } catch (err) {}
    };
    getData();
    //   return () => {
    //   cleanup
    //   }
  }, []);
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
        <td>{item.city ? item.city : "----"}</td>
        <td>{item.IPv4 ? item.IPv4 : "----"}</td>
        <td>{moment(item.creationDate).format("L")}</td>
      </tr>
    ));
    return allRows;
    // }
  };

  return (
    <div>
      <TimeClock />
      <table className="table table-bordered mt-2 col-lg-6 col-md-8 col-10 ml-auto mr-auto table-sm mb-5">
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
            <th>Ciudad</th>
            <th>IP</th>
            <th>Creado</th>
          </tr>
        </thead>
        <tbody>{renderRoll()}</tbody>
      </table>
      {renderCSV()}
    </div>
  );
};

export default TableCompo;
