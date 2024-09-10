import Header from "./_components/header";
import HorizontalScrollingTutorials from "./_components/line-one";
import MainBody from "./_components/main-body";

export default function Home() {
  return (
    <>
      {/* header */}
      <Header />
      
      {/* main body */}
      <MainBody />
      <HorizontalScrollingTutorials />
    </>
  );
}
