import { Line, LineChart, XAxis, ResponsiveContainer, YAxis } from "recharts";
import { useState, useEffect } from "react";
import moment from "moment";

var baseURL = "http://127.0.0.1:3000"; // Backend API address

const dateFormatter = (date) => {
  return moment(date).format("HH:mm");
};

function Chart(props) {
  const [tickValues, setTickValues] = useState([]); // For filtering which labels are shown on x-axis
  const [values, setValues] = useState([]); // Timestamp and CO2 data for the graph
  const [updateTime, setUpdateTime] = useState(""); // The latest timestamp from the data

  var URL = (baseURL + "/" + props.name).toLowerCase();

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        var dataValuesConstructor = [];
        var tickValuesConstructor = [];
        var currentHour = "99";
        var last;

        for (let i = 0; i < data.co2_data.length; i++) {
          var timestampEpoch = moment(data.co2_data[i].time).valueOf();

          if (currentHour !== moment(timestampEpoch).format("HH")) {
            tickValuesConstructor.push(timestampEpoch);
            currentHour = moment(timestampEpoch).format("HH");
          }
          dataValuesConstructor.push({
            timestamp: timestampEpoch,
            CO2: data.co2_data[i].co2,
          });
          last = timestampEpoch;
        }

        setValues(dataValuesConstructor);
        setTickValues(tickValuesConstructor);
        setUpdateTime(moment(last).format("HH:mm:ss"));
      });
  }, []);

  return (
    <>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          width={300}
          height={100}
          data={values}
          margin={{ top: 10, left: 0, right: 60, bottom: 0 }}
        >
          <XAxis
            dataKey="timestamp"
            scale="time"
            type="number"
            stroke="#B0B3B8"
            ticks={tickValues}
            tickFormatter={dateFormatter}
            domain={["dataMin", "dataMax"]}
          />
          <YAxis tick={false} domain={[0, "dataMax + 300"]} />
          <Line
            type="monotone"
            dataKey="CO2"
            stroke="#8884D8"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="timestamp">updated {updateTime}</div>
    </>
  );
}

export default Chart;
