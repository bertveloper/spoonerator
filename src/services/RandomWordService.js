export async function getRandomWord(type) {
    try {
        var url = 'https://api.api-ninjas.com/v1/randomword';
        if (type){
            url += ("?type=" + type);
        }
        const response = await fetch(url);
        var json = await response.json()
        .then(json => {return json.word});
        console.log("Json" + type, json.word);
        return json.word;
    } catch (error) {
        console.log(error);
        return null;
    }
}