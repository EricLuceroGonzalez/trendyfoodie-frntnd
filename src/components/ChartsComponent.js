import React, { useEffect, useState } from "react";
import GenderChart from "./GenderChart";
import BarChart from "./BarChart";
import moment from "moment";
const ChartsComponent = (props) => {
  const [genderN, setGenderN] = useState({ genre: "" });
  const [countries, setCountries] = useState([]);
  const [viewports, setViewports] = useState([]);
  const [days, setDays] = useState([]);
  const [hoursOfDay, setHoursOfDay] = useState([]);

  useEffect(() => {
    if (props.data) {
      let genders;
      let thisCountry;
      let allViewports;
      let weekDays;
      let hoursAday;
      genders = props.data.map((item, k) => {
        // console.log(item.gender);
        return item.gender;
      });
      thisCountry = props.data.map((item, k) => {
        return item.country;
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
    <div style={{ margin: "4em auto" }}>
      <div className="col-12 col-md-10 mr-auto ml-auto">
        {genderN ? <GenderChart data={genderN.genre} /> : ""}
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
