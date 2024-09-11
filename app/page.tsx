import Header from "./_components/header";
import HorizontalScrollingTutorials from "./_components/line-one";
import HorizontalScrollingTutorialsTwo from "./_components/line-two";
import MainBody from "./_components/main-body";

export default function Home() {
  return (
    <>
      {/* header */}
      <Header />
      <hr />
      {/* main body */}
      <MainBody />
      <HorizontalScrollingTutorials />
      <HorizontalScrollingTutorialsTwo />
    </>
  );
}
