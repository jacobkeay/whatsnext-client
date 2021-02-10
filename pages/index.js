import Layout from "../components/Layout";
import RenderItems from "../components/RenderItems";
import LogoutButton from "../components/LogoutButton";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <RenderItems />
        <LogoutButton />
      </div>
    </Layout>
  );
}
