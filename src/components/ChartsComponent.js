import React, { useEffect, useState } from "react";
import GenderChart from "./GenderChart";
import BarChart from "./BarChart";
import moment from "moment";
import LineChart from "./LineChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserCheck} from "@fortawesome/free-solid-svg-icons"
const ChartsComponent = (props) => {
  const [genderN, setGenderN] = useState({ genre: "" });
  const [countries, setCountries] = useState([]);
  const [viewports, setViewports] = useState([]);
  const [days, setDays] = useState([]);
  const [hoursOfDay, setHoursOfDay] = useState([]);
  const [timeSerie, setTimeSerie] = useState([]);
  const [totalN, setTotalN] = useState("");

  useEffect(() => {
    if (props.data) {
      setTotalN(props.data.length);

      let genders;
      let thisCountry = [];
      let allViewports;
      let weekDays;
      let hoursAday;
      let timeline;
      genders = props.data.map((item, k) => {
        return item.gender;
      });
      props.data.map((item, k) => {
        if (!item.country) {
          thisCountry.push("Undefined");
        } else {
          thisCountry.push(item.country);
        }

        // return item.country;
      });
      allViewports = props.data.map((item, k) => {
        return (
          item.windowPixels[0].toString() +
          "x" +
          item.windowPixels[1].toString()
        );
      });

      weekDays = props.data.map((item, k) => {
        return moment(item.creationDate).format("dddd");
      });
      hoursAday = props.data.map((item, k) => {
        return moment(item.creationDate).format("LT").split(":")[0];
      });

      timeline = props.data.map((item, k) => {
        return moment(item.creationDate).format("l").split(":")[0];
      });

      setGenderN((prevState) => ({
        ...prevState,
        genre: {
          hombres: countFreq(genders, "male"),
          mujeres: countFreq(genders, "female"),
        },
      }));
      setCountries(foo(thisCountry));
      setViewports(foo(allViewports));
      setDays(foo(weekDays));
      setHoursOfDay(foo(hoursAday));
      setTimeSerie(foo(timeline));
    }
  }, [props]);

  const foo = (arr) => {
    var a = [],
      b = [],
      prev;

    arr.sort();
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== prev) {
        a.push(arr[i]);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }

      prev = arr[i];
    }
    // console.log(a);
    // console.log(b);

    return [a, b];
  };

  const countFreq = (a, variable) => {
    const aCount = new Map(
      [...new Set(a)].map((x) => [x, a.filter((y) => y === x).length])
    );
    return aCount.get(variable);
  };

  return (
    <div className='col-12 col-md-6 col-lg-8 ml-auto mr-auto'>
      <div className="d-flex col-12">
        <div className="col-4 totalN row align-items-center">
          <div className='mr-auto ml-auto'>
            {totalN}{" "}
            <FontAwesomeIcon icon={faUserCheck} />
            </div>
        </div>
        {genderN ? <GenderChart data={genderN.genre} /> : ""}
      </div>
      <div className="col-12 col-md-10 mr-auto ml-auto">
        {timeSerie ? <LineChart chartTitle={"Trafico"} data={timeSerie} /> : ""}
        {countries ? <BarChart chartTitle={"Países"} data={countries} /> : ""}
        {viewports ? <BarChart chartTitle={"Pantalla"} data={viewports} /> : ""}
        {days ? <BarChart chartTitle={"Dias"} data={days} /> : ""}
        {hoursOfDay ? (
          <BarChart chartTitle={"Hora del dia (0 - 24)"} data={hoursOfDay} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ChartsComponent;
