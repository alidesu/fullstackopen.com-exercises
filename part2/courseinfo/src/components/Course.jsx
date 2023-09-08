import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  return (
    <>
      <Header header={course[0].name} />
      <Content parts={course[0].parts} />
      <Header header={course[1].name} />
      <Content parts={course[1].parts} />
    </>
  );
};

export default Course;
