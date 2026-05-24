import { Header } from './Header.jsx'
import { Total } from './Total.jsx'
import { Content } from './Part.jsx'

  const Course = (props) => {
    return (
      <div>
        <Header course={props.course.name}/>
        <Content parts={props.course.parts}/>
        <Total parts={props.course.parts}/>
      </div>
    )
  }

export default Course