import useSWR, { trigger, mutate, SWRConfig } from 'swr';
import axios from 'axios';
import AddStory from '../components/AddStory';
import { Fragment } from 'react';

const URL = `/api/stories`;

const Stories = () => {

    const { data, error } = useSWR(URL);

    if (!data) {
        return <h1>loading...</h1>
    }

    return (
        <div>
            <ul>
                {data.data.map(story => <div key={story._id}>
                    <li>
                        {story.title}
                    </li>
                    <button onClick={async e => {
                        await axios.delete(`${URL}/${story._id}`)
                        trigger(URL);
                    }}>delete</button>
                </div>)}
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
