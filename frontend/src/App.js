import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { publicRoutes } from "./routes";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                {publicRoutes.map((route) => {
                    const Element = route.element;
                    return <Route path={route.path} element={<Element />} />;
                })}
            </Routes>
        </Router>
    );
}

export default App;
