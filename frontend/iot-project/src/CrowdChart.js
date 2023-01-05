import { Line, LineChart, XAxis, ResponsiveContainer, YAxis } from "recharts";
import { useState, useEffect } from "react";

var baseURL = "http://127.0.0.1:3000";
var timezone = 2; // UTC+2

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
        var newHour = parseInt(
          data.co2_data[0].time.split("T")[1].split(":")[0]
        );

        for (let i = 0; i < data.co2_data.length; i++) {
          var currentHour = parseInt(
            data.co2_data[i].time.split("T")[1].split(":")[0]
          );

          if (currentHour == newHour && i > 0 && i < data.co2_data.length - 1) {
            dataValuesConstructor.push({ time: "", co2: data.co2_data[i].co2 });
          } else {
            var hour = parseInt(
              data.co2_data[i].time.split("T")[1].split(":")[0]
            );
            var minute = parseInt(
              data.co2_data[i].time.split("T")[1].split(":")[1]
            );
            var second = parseInt(
              data.co2_data[i].time.split("T")[1].split(":")[2].split(".")[0]
            );

            var hourString = "";
            var minuteString = "";
            var secondString = "";

            // Convert hour to Finnish timezone
            var correctedHour = hour + timezone;
            if (correctedHour > 23) {
              correctedHour -= 24;
            }

            // If value is single digit, add a zero before
            if (correctedHour < 10) {
              hourString = "0".concat(String(correctedHour));
            } else {
              hourString = String(correctedHour);
            }
            if (minute < 10) {
              minuteString = "0".concat(String(minute));
            } else {
              minuteString = String(minute);
            }
            if (second < 10) {
              secondString = "0".concat(String(second));
            } else {
              secondString = String(second);
            }

            var timestamp = hourString.concat(":", minuteString);

            tickValuesConstructor.push(timestamp);
            dataValuesConstructor.push({
              time: timestamp,
              co2: data.co2_data[i].co2,
            });
            newHour = currentHour;
          }
        }

        setUpdateTime(hourString.concat(":", minuteString, ":", secondString));
        setTickValues(tickValuesConstructor);
        setValues(dataValuesConstructor);
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
          <XAxis dataKey="time" stroke="#B0B3B8" ticks={tickValues} />
          <YAxis tick={false} domain={["dataMin - 100", "dataMax + 100"]} />
          <Line
            type="monotone"
            dataKey="co2"
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
