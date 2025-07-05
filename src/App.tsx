import PostWithComment from "./PostWithComment";

function App() {
  // const ingredients = ["Apples", "Bananas", "Ham", "Brea", "Bread"];

  // const someFunction = (selectedItem: string) => {
  //   console.log(`Selected ${selectedItem}`);
  // };
  return (
    <>
      {/* <Sample content="test" user="Noman" likesBy={["Noman", "Aman", "etcs"]} /> */}
      {/* <UseArrayEx /> */}
      <PostWithComment content="test" user="Noman" id={"123"} />
      {/* <AppWithRoutes /> */}
      {/* <ShoppingList groceries={ingredients} selectItem={someFunction} /> */}
    </>
  );
}

export default App;
