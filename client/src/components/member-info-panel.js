import "../styles/containers.scss";

function MemberInfoPanel(props) {
  const details = [
    {
      title: "Nombre Completo",
      text: props.member["name"]
        ? props.member["name"].replace(/\(CN-[0-9]+\)/, "")
        : "- - -",
    },
    {
      title: "Código",
      text: props.member["code"] ?? "- - -",
    },
    {
      title: "Direccion",
      text: props.member["address"] ?? "- - -",
    },
    {
      title: "Telefono",
      text: props.member["phone"] ?? "- - -",
    },
    {
      title: "Correo",
      text: props.member["email"] ?? "- - -",
    },
  ];

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
