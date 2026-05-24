 const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  );
};

export const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  );
};
