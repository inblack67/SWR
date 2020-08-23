import useSWR, { SWRConfig, trigger, mutate } from 'swr';
import axios from 'axios';

// target - refetchQueries in gql
// mutate - update the cache, then server call ...

const URL = `https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10`

const Crimes = () => {

    const { data, error } = useSWR(URL);

    if (error) {
        console.error(error);
    }

    if (!data) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    )
}

const Posts = () => {

    return (
        <h1>hello</h1>
    )
}


const index = () => {
    return (
        <div>
            <SWRConfig value={{
                fetcher: (URL) => axios(URL).then(res => res.data),
                dedupingInterval: 5000  // 1 call per 5 second, no matter the usage
            }}>
                <Posts />
                <Crimes />
            </SWRConfig>
        </div>
    )
}

export default index

