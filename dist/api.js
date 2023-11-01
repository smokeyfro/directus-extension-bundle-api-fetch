var e0 = {
    id: 'api-fetch',
    handler: (router, {env}) => {
        const apiHost = env.API_HOST.toString();

        const fetchData = async (url, res) => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const results = await response.json();
                    const items = results.map(item => ({
                        name: item.show.name || '',
                        status: item.show.status || '',
                        runtime: item.show.runtime || '',
                        network: item.show.network ? item.show.network.name || '' : '',
                        language: item.show.language || '',
                        country: item.show.network ? item.show.network.country ? item.show.network.country.name || '' : '' : '',
                        thumb: item.show.image ? item.show.image.medium || '' : '',
                        image: item.show.image ? item.show.image.original || '' : '',
                        genres: item.show.genres || [],
                        url: item.show.url || '',
                        rating: item.show.rating ? item.show.rating.average || 0 : 0
                    }));
                    res.json(items);
                } else {
                    res.status(response.status).send(response.statusText);
                }
            } catch (error) {
                console.error(error);
                res.status(500).send('An error occurred');
            }
        };

        router.get('/', async (req, res) => {
            const url = `${apiHost}?q=${req.query.q}`;
            await fetchData(url, res);
        });

    }
};

const hooks = [];const endpoints = [{name:'api-fetch-endpoint',config:e0}];const operations = [];

export { endpoints, hooks, operations };
