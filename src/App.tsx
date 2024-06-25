import "./App.css";
import { mockData } from "./MockData";
import { CardList, Footer, Header } from "./components";

function App() {
  return (
    <section className="container">
      <Header />
      <CardList cards={mockData} />
      <Footer />
    </section>
  );
}

export default App;
