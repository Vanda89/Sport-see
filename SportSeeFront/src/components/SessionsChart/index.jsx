import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function SessionsChart(props) {
  const XAxisName = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const data = [
    { day: '', value: 0 },
    ...props.sessions.sessions.map((session, index) => ({
      day: XAxisName[index % XAxisName.length],
      value: session.sessionLength,
    })),
    { day: '', value: 75 },
  ];

  const CustomCursor = (props) => {
    const { points } = props;
    const { x } = points[0];
    const rectangleWidth = 500;
    return (
      <foreignObject
        x={x - rectangleWidth}
        y={0}
        width={rectangleWidth}
        height={400}
      >
        <div
          style={{
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        />
      </foreignObject>
    );
  };

  CustomCursor.propTypes = {
    points: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }),
    ),
  };

  const ActiveDot = ({ cx, cy }) => (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={10}
        strokeWidth={2}
        fill="#f9fafb"
        fillOpacity={0.3}
      />
      <circle cx={cx} cy={cy} r={4} fill="#fff" />
    </g>
  );

  ActiveDot.propTypes = {
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
  };

  return (
    <div className="profile-average-sessions h-full w-64 bg-primary  text-15 rounded-md">
      <LineChart
        width={256}
        height={264}
        data={data}
        margin={{ top: 30, bottom: 15, left: -15, right: -15 }}
        cursor={{ stroke: 'rgba(255, 0, 0, 0.5)', strokeWidth: 2 }}
      >
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload) {
              return (
                <div className="bg-white w-10 h-6 flex items-center justify-center text-8 font-medium">
                  {payload[0].value} min
                </div>
              );
            }
          }}
          cursor={<CustomCursor />}
        />
        <XAxis
          dataKey="day"
          tick={{ fill: 'rgba(255, 255, 255, 0.5)' }}
          axisLine={false}
          tickLine={false}
          style={{ fontSize: '12px' }}
        />
        <YAxis hide={true} domain={['dataMin-20', 'dataMax+10']} />

        <Legend
          content={() => (
            <div
              style={{ color: 'rgba(255, 255, 255, 0.5)', marginLeft: '35px' }}
            >
              Durée moyenne des sessions
            </div>
          )}
          verticalAlign="top"
          width={180}
        />
        <defs>
          <linearGradient id="colorLine" x1="1" x2="0">
            <stop offset="5%" stopColor="#fff" stopOpacity={1} />
            <stop offset="95%" stopColor="#fff" stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <Line
          type="natural"
          dataKey="value"
          stroke="url(#colorLine)"
          strokeWidth={2}
          dot={false}
          activeDot={ActiveDot}
        />
      </LineChart>
    </div>
  );
}

SessionsChart.propTypes = {
  sessions: PropTypes.shape({
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        sessionLength: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default SessionsChart;
