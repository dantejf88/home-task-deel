import { useEffect, useState } from "react";
import "./App.css";
import { Autocomplete } from "./components/Autocomplete";
import { fetchData } from "./services";
import { School } from "./types";

function App() {
  const [dataList, setDataList] = useState<School[]>([]);
  const [queryValue, setQueryValue] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState<string | undefined>();

  useEffect(() => {
    fetchData(queryValue)
      .then((data) => {
        setDataList(data.sort((a, b) => a.name.localeCompare(b.name)));
        setIsFetching(false);
      })
      .catch((error) => {
        setIsError(error.message);
      });
  }, [queryValue]);

  return (
    <div className="app-container">
      <h1>Autocomplete component:</h1>
      <Autocomplete
        dataList={dataList}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
        setQueryValue={setQueryValue}
        isError={isError}
      />
    </div>
  );
}

export default App;
