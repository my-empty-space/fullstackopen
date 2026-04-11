const Total = (props) => {
  const { parts } = props.course;

  const totalExercises = parts
    .map((e) => e.exercises)
    .reduce((acumulator, actualValue) => acumulator + actualValue);

  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
