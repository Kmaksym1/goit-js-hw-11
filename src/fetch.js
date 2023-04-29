function fetchArr(name, page = 1){

const URL='https://pixabay.com/api/?';
const USER_KEY='key=35846376-315ddb2ec9e5a392dda98a3e5';
    return fetch(`${URL}${USER_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
        .then((resp) => {
            if(!resp.ok){
            throw new Error(resp.status)
            }
            // console.log('resp.json()',resp.json())
            return resp.json()
        })
        
}

export {fetchArr}
