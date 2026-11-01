import "./Menu.css";

const itens = [
  {
    id: 1,
    nome: "Café Coado",
    descricao: "Café fresquinho passado na hora",
    preco: "R$ 5,00",
  },
  {
    id: 2,
    nome: "Pão de Queijo",
    descricao: "Pão de queijo caseiro quentinho",
    preco: "R$ 4,00",
  },
  {
    id: 3,
    nome: "Bolo de Chocolate",
    descricao:
      "Bolo caseiro de chocolate com recheio e cobertura de sua preferência (sob encomenda)",
    preco: "R$ 35,00",
  },
  {
    id: 4,
    nome: "Bolo de Cenoura",
    descricao:
      "Bolo caseiro de cenoura com recheio e cobertura de sua preferência (sob encomenda)",
    preco: "R$ 35,00",
  },
];

function Menu() {
  return (
    <section id="menu-section" className="menu-section">
      <h2 className="menu-title">Cardápio</h2>
      <div className="menu-list">
        {itens.map((item) => (
          <div key={item.id} className="menu-item">
            <div className="menu-item-info">
              <h3>{item.nome}</h3>
              <p>{item.descricao}</p>
            </div>
            <span className="menu-item-price">{item.preco}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu;
