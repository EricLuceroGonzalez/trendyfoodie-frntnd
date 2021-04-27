import React, { useEffect, useState } from "react";
// import Chart from "chart.js";
import {
  Chart,
  Title,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
Chart.register(Title, BarController, BarElement, LinearScale, CategoryScale);

// import {Chart} from 'chart.js';

const BarChart = (props) => {
  const [dataValues, setDataValues] = useState();
  const [dataLabels, setDataLabels] = useState();
  const [canvasRef, setCanvasRef] = useState(React.createRef());
  // const ref = React.createRef();
  // var ctx = document.getElementById('myChart').getContext('2d'); // 2d context

  useEffect(() => {
    // console.log("\n_____________  props");
    // console.log(props.data);
    // console.log(props.data[0]);
    // console.log(props.data[1]);
    setDataLabels(props.data[0]);
    setDataValues(props.data[1]);
    // setDataLabels(Object.keys(props.data[0]));
    // setDataValues(Object.values(props.data[1]));
    return () => {};
  }, [props.data]);

  useEffect(() => {
    var colors = ["#42C748", "#509453", "#47D64E", "#169C1C", "#679C69"];
    var mychart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        datasets: [
          {
            data: dataValues,
            backgroundColor: colors,
            hoverOffset: 9,
            hoverBackgroundColor: ["#A3E319"],
          },
        ],
        labels: dataLabels,
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        maintainAspectRatio: false,
        legend: {
          display: true,
          labels: {
            color: "rgb(255,1, 1)",
          },
        },
        plugins: {
          title: {
            display: true,
            text: props.chartTitle,
          },
          datalabels: {
            color: "red",
          },
          labels: {
            render: "percentage",
          },
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    });

    return () => {
      // setDataValues("");
      // setDataLabels("");
      // setCanvasRef("");
      mychart.destroy();
    };
    // }, [dataValues, dataLabels]);
  }, [canvasRef, dataValues, dataLabels, props]);
  return (
    <React.Fragment>
      <div style={{ margin: "4em auto" }}>
        <canvas ref={canvasRef} width="250" height="250"></canvas>
      </div>
    </React.Fragment>
  );
};

export default BarChart;