# Custom Hook

Checkout on netifly: https://task22-customhook.netlify.app/

First of all, I created a useFetch.js file in assets.
Then i wrote a custom hook named useFetch.
Hooks are basically a function.

## useFetch.js

        function useFetch(apiurl){

        <!-- These are useState hooks in action. We have a data, loading and error. -->

            const [data, setData] = useState(null);
            const [loading, setLoading] = useState(false);
            const [error, setError] = useState(null);

            useEffect(()=>{

                <!-- whenever data is being fetched from api, we set this true. So we can show a text "Loading..." -->
                setLoading(true); 

                const fetchData = async () => {
                    try {
                    const response = await fetch(apiurl);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const result = await response.json();
                    setData(result);
                    } catch (error) {
                    setError(error.message);
                    } finally {
                    setLoading(false);
                    }
                };
            
                fetchData();
                }, [apiurl]);
                
                <!-- whenever the url changes call this function again, so apiurl is a dependancy. -->

            return {data, loading, error};
        }

        export default useFetch

We have used basic async function, we can also use promises.
We are returing three things our data, laoding and error.

## App.jsx

In our App.jsx we are using this function or say custom hook.
Firstly we imported it.

        import useFetch from './assets/useFetch';

We are now declaring it. and passing our url in the default state.

        const {data, loading, error} = useFetch("https://jsonplaceholder.typicode.com/photos");

If there is an error show this div of error.

        if (error){
            return <div className="loading">Error: {error}</div>;
        } 

if the api is being fetched then show this div.
            
        if (loading) {
            return <div className="loading">Loading...</div>;
        }


The data we are getting from the api is in json form, so we have to display it using map.
we have taken 'post' as a temporary object for going through the data one by one.
 we are displaying an image and a title.


        return (
            <div className='container'>
            {data && data.map((post) => (

                <div key={post.id} className='card'>

                    <img src={post.url} alt="..." />
                    <h2>{post.title}</h2>

                </div>
            ))}
            </div>
        );