import useSWR, { trigger, mutate, SWRConfig } from 'swr';
import axios from 'axios';
import AddStory from '../components/AddStory';

const URL = `http://localhost:3000/api/stories`;

const Stories = () => {


    const { data, error } = useSWR(URL);

    if (!data) {
        return <h1>loading...</h1>
    }

    return (
        <div>
            <ul>
                {data.data.map(story => <li key={story._id}>
                    {story.title}
                </li>)}
            </ul>
            <AddStory />
        </div>
    )
}


const index = () => {
    return (
        <div>
            <h1>stories</h1>
            <SWRConfig value={{
                fetcher: (URL) => axios(URL).then(res => res.data)
            }}>
                <Stories />
            </SWRConfig>
        </div>
    )
}

export default index
