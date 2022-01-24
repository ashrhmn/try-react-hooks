import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useInput from "../hooks/useInput";
import useTimeout from "../hooks/useTimeout";

export default function Home() {
  const nameInput = useInput("Hello");
  const searchInput = useInput("");

  const [count, setCount] = useState(0);

  const timeOutCallbackFn = () => {
    console.log("Timeout callback");
    setCount((count) => count + 100);
  };

  useDebounce(
    () => alert(`Fetching search result for ${searchInput.value}`),
    1000,
    [searchInput.value]
  );

  const handleAsyncTest = async () => {
    const num = [1, 10, 100, 1000, 10000];
    for (const n of num) {
      console.log({
        n,
        res: await (
          await fetch("https://irocky-api.ashrhmn.com/api/random/" + n)
        ).json(),
      });
    }
  };

  const handleAsyncTestInParallel = async () => {
    const num = [1, 10, 100, 1000, 10000];
    await Promise.all(
      num.map(async (n) => {
        console.log({
          n,
          res: await (
            await fetch("https://irocky-api.ashrhmn.com/api/random/" + n)
          ).json(),
        });
      })
    );
  };

  const { clear, reset } = useTimeout(timeOutCallbackFn, 4000);

  const increment = async () => {
    console.log(
      await (await fetch("https://irocky-api.ashrhmn.com/api/random/")).json()
    );
    setCount((count) => count + 1);
  };

  return (
    <>
      <h1>Hooks</h1>
      <input {...nameInput} type="text" />
      <p>{nameInput.value}</p>
      <p>{count}</p>
      <button onClick={increment}>Inc</button>
      <button onClick={reset}>Reset</button>
      <button onClick={clear}>Clear</button>

      <br />

      <input {...searchInput} type="text" placeholder="Search" />
      <p>Search Value : {searchInput.value}</p>

      <button onClick={handleAsyncTest}>Async Test</button>
      <button onClick={handleAsyncTestInParallel}>Parallel Async Test</button>
    </>
  );
}
