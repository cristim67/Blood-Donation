import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={imgUrl} alt="Imagine" className="imagineproiect"></img>
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span className="description-project">{description}</span>
        </div>
      </div>
    </Col>
  )
}
