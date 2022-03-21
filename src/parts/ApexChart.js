import React, { Component } from "react";

import Chart from "react-apexcharts";

export default class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          background: "#fff",
        },
        colors: "#5C5470",
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "May",
            "Apr",
            "June",
            "July",
            "Aug",
            "Sept",
            "Dec",
          ],
          labels: {
            style: {
              colors: "#5C5470",
            },
          },
        },
      },
      series: [
        {
          data: [430, 490, 620, 240, 710, 520, 460, 530, 420],
        },
      ],
    };
  }
  render() {
    return (
      <div className=" bg-slPurple px-6 pt-6 pb-3 rounded-2xl ">
        <h1 className=" text-white text-xl font-bold text-center mb-4">
          Total Visits
        </h1>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={320}
        />
      </div>
    );
  }
}
