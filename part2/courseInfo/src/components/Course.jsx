import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ courses }) => {
  return (<>
    <h1>Web development curriculum</h1>

    {courses.map((course) => (
      <div key={course.id}>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    ))}
  </>);
};

export default Course;