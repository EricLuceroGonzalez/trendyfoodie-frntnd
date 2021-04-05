import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { useHttpClient } from "../hooks/http-hook";

const TableCompo = () => {
  const [datas, setData] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
    if (datas.length === 0) {          
      let allRows;
      allRows = datas.map((item, k) => {
        <tr
          key={k}
          style={{
            backgroundColor: "red",
            color: "black",
            fontFamily: "monospace",
            fontSize: "0.75em",
          }}
        >
          <td>2:{k + 1}</td>
          <td>2:{item.email}</td>
          <td>2:{item.email}</td>
          <td>2:{item.email}</td>
        </tr>;
      });
      console.log(allRows);
      
      return allRows;
    }
  };

  return (
    <div>
      <table className="table table-bordered col-12 ml-auto mr-auto table-sm mb-5">
        <thead>
          <tr
            style={{
              backgroundColor: "rgba(155,74,177,0.75)",
              color: "white",
              fontFamily: "Montserrat-ExtraBold",
            }}
          >
            <th></th>
            <th>Correo</th>
            <th>Nombre</th>
            <th>Clase</th>
          </tr>
        </thead>
        <tbody>{renderRoll()}</tbody>
      </table>
    </div>
  );
};

export default TableCompo;
