import { Outlet } from "react-router";
import CommonLayout from "./components/layout/commonLayout";
import { generateRoute } from "./utils/generateRoute";

function App() {
  console.log(generateRoute);
  return (
    <CommonLayout>
      <Outlet />
    </CommonLayout>
  );
}

export default App;
