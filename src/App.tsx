import "./App.css";
import { UsersList, Footer, Header } from "./components";

function App() {
  return (
    <div className="container">
      <Header />
      <UsersList />
      <Footer />
    </div>
  );
}

export default App;
