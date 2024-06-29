import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/Login";
import { SignupPage } from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import History from "./Pages/History";
import Bills from "./Pages/Bills";

function App() {
  // const { data, isSuccess, isError, error } = useFetchDefaultQuery();

  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log(data);
  //   }

  //   if (isError) {
  //     console.log(error.response.data);
  //   }
  // }, [isSuccess, isError, data, error]);

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/bills" element={<Bills />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
