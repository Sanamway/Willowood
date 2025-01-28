import HomePage from "@/components/Home";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard/Dashboard";
import { Provider } from "react-redux";
import appStore from "@/utils/appStore";

export default function Home() {
  return (
    <Provider store={appStore}>
      <Layout>
        <Dashboard></Dashboard>
      </Layout>
    </Provider>


  );
}
