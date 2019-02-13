export function randomString(length = 8){
    const characters = 'aAbBcCdDeEfFgGhHiIjJkKlLmMoOpPqQrRsStTuUvVwWxXyYzZ0123456789';
    let output = '';

    for(let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random() * characters.length);

        output += characters[randomIndex];
    }

    return output;
}

export function formatPostData(data){
    //formate in a way that php can read
    const urlParams = new URLSearchParams();//build a query string for you
    //destructuring array
    for(let [key, value] of Object.entries(data)){ //takes all the key value pairs in a object and put it into an array
       //console.log('key:', key, 'value:', value);

        urlParams.append(key, value);
    }

    return urlParams;
}