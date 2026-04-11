import { Children, useState } from 'react'

const Statics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad
  let average = (good - bad) / total
  let positive = ((good / total) * 100)

  if (!total) {
    return (<>
      <h2>Statics</h2>
      <p>No feedback given</p>
    </>)
  }

  return (<>
    <h2>Statics</h2>
    <table>
      <tbody>
        <StatisticLine label="Good" value={good} />
        <StatisticLine label="Neutral" value={neutral} />
        <StatisticLine label="Bad" value={bad} />
        <tr><td>-----</td></tr>
        <StatisticLine label="Total" value={total} />
        <StatisticLine label="Average" value={average} />
        <StatisticLine label="Positive" value={positive + "%"} />
      </tbody>
    </table>
  </>)
}

const StatisticLine = ({ label, value }) => {
  return <tr>
    <th style={{ textAlign: 'left' }}>{label}:</th>
    <td>{value}</td>
  </tr>
}

const Button = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)}>good</Button>
      <Button onClick={() => setNeutral(neutral + 1)}>neutral</Button>
      <Button onClick={() => setBad(bad + 1)}>bad</Button>

      <br />

      <Statics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App