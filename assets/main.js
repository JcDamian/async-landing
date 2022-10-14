const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCQzdMyuz0Lf4zo4uGcEujFw&part=snippet%2Cid&order=date&maxResults=9';

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '39fd85ae48msh0eb1e1ad0efb9d1p190f45jsn58383da33373',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

/* fetch('', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err)); */

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const videos = await fetchData(API);
        console.log(videos);

        let view = `
        ${videos.items.map(video => `
            <div class="group relative">
                <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank"><div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div></a>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                    <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                    </a>
                    </h3>
                </div>
            </div>
        `).slice(0,8).join('')}
            
        `;

        content.innerHTML = view;
    } catch (error) {
        console.error(error);
    }
})();