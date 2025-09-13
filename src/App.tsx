import { useGetRoomsQuery } from "./redux/api/api";


function App() {
  const room = useGetRoomsQuery()
  console.log(room);
  return (
    <>
      <p className="">some code</p>
    </>
  );
}

export default App;
