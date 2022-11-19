import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

const TokenDistribution = (props) => {
  !props.tooltip
    ? ChartJS.register(ArcElement)
    : ChartJS.register(ArcElement, Tooltip);

  const chartData = {
    labels: ["Tokens available", "Tokens reserved", "Tokens purchased"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          // TODO: Populate with 5 largest investors + rest
          props.token.maintainer_balance - props.token.maintainer_reserved,
          props.token.maintainer_reserved,
          props.token.investor_balance,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(75, 192, 192, 0.25)",
          "rgba(255, 99, 132, 0.1)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(75, 192, 192, .5)",
          "rgba(255, 99, 132, .5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} style={{ margin: "30px" }} />;
};

export default TokenDistribution;
