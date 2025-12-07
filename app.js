const { Component } = React;
const { createRoot } = ReactDOM;

const appData = {
  organization: "FabricLux",
  pageTitle: "Премиум ткани для дизайнеров и ателье",
  items: [
    { id: 1, name: "Итальянский шёлк", price: 3890, image: "https://images.unsplash.com/photo-1617360547704-3da8b9e2f613?w=1200" },
    { id: 2, name: "Французский лён", price: 2190, image: "https://images.unsplash.com/photo-1594737610000-37c7e4f7bbbc?w=1200" },
    { id: 3, name: "Бархат Royal Velvet", price: 4590, image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1200" },
    { id: 4, name: "Хлопок-сатин египетский", price: 1490, image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=1200" },
    { id: 5, name: "Костюмная шерсть Super 120's", price: 5290, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200" },
    { id: 6, name: "Кружево Chantilly", price: 6890, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200" },
    { id: 7, name: "Вискоза с эффектом шёлка", price: 1790, image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1200" },
    { id: 8, name: "Парча золотая", price: 7490, image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=1200" }
  ]
};

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="hero-overlay">
          <h1 className="hero-title">{this.props.organization}</h1>
          <p className="hero-subtitle">{this.props.pageTitle}</p>
        </div>
      </header>
    );
  }
}

class Navigation extends Component {
  render() {
    const views = ["home", "catalog", "gallery"];
    const labels = ["Главная", "Каталог", "Галерея"];
    return (
      <nav className="nav">
        <div className="container nav-content">
          {views.map((view, i) => (
            <button
              key={view}
              onClick={() => this.props.setView(view)}
              className={this.props.currentView === view ? "active" : ""}
            >
              {labels[i]}
            </button>
          ))}
        </div>
      </nav>
    );
  }
}

class ProductCard extends Component {
  render() {
    const { item } = this.props;
    return (
      <div className="product-card">
        <img src={item.image} alt={item.name} />
        <div className="product-info">
          <h3>{item.name}</h3>
          <p className="price">{item.price.toLocaleString()} ₽/м</p>
        </div>
      </div>
    );
  }
}

class HomeView extends Component {
  render() {
    return (
      <section className="home-view container">
        <h2 className="section-title">Популярные ткани</h2>
        <div className="products-grid">
          {this.props.items.slice(0, 6).map(item => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    );
  }
}

class CatalogView extends Component {
  render() {
    return (
      <section className="catalog-view container">
        <h2 className="section-title">Полный каталог</h2>
        <div className="products-grid catalog-grid">
          {this.props.items.map(item => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    );
  }
}

class GalleryView extends Component {
  render() {
    return (
      <section className="gallery-view container">
        <h2 className="section-title">Галерея тканей</h2>
        <div className="gallery-grid">
          {this.props.items.map(item => (
            <div key={item.id} className="gallery-item">
              <img src={item.image} alt={item.name} />
              <div className="gallery-overlay">
                <h3>{item.name}</h3>
                <p>{item.price.toLocaleString()} ₽/м</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="footer-gallery">
            {this.props.items.map(item => (
              <img key={item.id} src={`${item.image}&w=300&h=300`} alt={item.name} />
            ))}
          </div>
          <div className="footer-bottom">
            <p>© 2025 {this.props.organization} — премиум ткани оптом и в розницу</p>
            <p>Москва • Санкт-Петербург • +7 (495) 789-23-01</p>
          </div>
        </div>
      </footer>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentView: "home" };
    this.setView = this.setView.bind(this);
  }

  setView(view) {
    this.setState({ currentView: view });
  }

  render() {
    const { organization, pageTitle, items } = this.props.data;

    return (
      <div className="app">
        <Header organization={organization} pageTitle={pageTitle} />
        <Navigation currentView={this.state.currentView} setView={this.setView} />

        {this.state.currentView === "home" && <HomeView items={items} />}
        {this.state.currentView === "catalog" && <CatalogView items={items} />}
        {this.state.currentView === "gallery" && <GalleryView items={items} />}

        <Footer organization={organization} items={items} />
      </div>
    );
  }
}

const root = createRoot(document.getElementById("root"));
root.render(<App data={appData} />);