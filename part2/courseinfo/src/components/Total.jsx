
export const Total = (props) => {
  return (
    <h3>
      total of {props.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
    </h3>
  );
};
