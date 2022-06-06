import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

const DoughnutChart = (props) => {
  ChartJS.register(ArcElement, Tooltip);

  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 140).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";
        var text = props.label,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  const options = {
    cutout: props.cutout,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Doughnut
      data={props.data}
      options={options}
      plugins={plugins}
      style={{ marginTop: "30px" }}
    />
  );
};

export default DoughnutChart;
