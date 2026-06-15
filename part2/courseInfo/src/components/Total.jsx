const Total = (props) => {
  const { parts } = props.course;

  const totalExercises = parts.reduce((acumulator, actualValue) => (
    acumulator + actualValue.exercises
  ), 0);

  return <p><b>Total of {totalExercises} exercises</b></p>;
};

export default Total;
