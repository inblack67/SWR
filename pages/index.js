import useSWR, { SWRConfig } from 'swr'

const Crimes = () => {

  const url = `https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10`

  const { data, error } = useSWR(url);

  if (error) {
    console.error(error);
    return;
  }

  if (!data) {
    return <h3>Loading...</h3>
  }

  return (
    <div>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

export default function Home() {

  const fetcher = (...args) => fetch(...args).then(res => res.json());

  // revalidateOnFocus - on browser tab focus, revalidates if data is changed and show it accordingly

  return (
    <SWRConfig value={{fetcher, revalidateOnFocus: false}}> 
      <Crimes />
    </SWRConfig>
  )
}
