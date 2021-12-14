import "../styles/containers.scss";

const details = [
  {
    title: "Nombre Completo",
    text: "Jose Angel Bautista",
  },
  {
    title: "Código",
    text: "CN-0093",
  },
  {
    title: "Direccion",
    text: "C/ Independencia #88, Sonador Bonao",
  },
  {
    title: "Telefono",
    text: "(809) 123-0943",
  },
  {
    title: "Correo",
    text: "joseangelb2371@gmail.com",
  },
];

function MemberInfoPanel() {
  return (
    <div id="member-info-panel" className="panel light col-12">
      <h2>Informacion personal</h2>
      <hr />
      <ul>
        {details.map((d) => {
          return (
            <li>
              <TitleText title={d.title} text={d.text} />{" "}
            </li>
          );
        })}
      </ul>
      <button className="btn btn-outline-dark">Editar</button>
    </div>
  );
}

function TitleText(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.text}</p>
    </div>
  );
}

export default MemberInfoPanel;
