import "./App.css";
import { Footer, Header } from "./components";
import UsersList from "./components/UsersClass/UsersClass";

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
