import Navbar from "../components/navbar";

const Home: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />

      <div className="container">{children}</div>
    </>
  );
};

export default Home;
