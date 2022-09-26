const p = new Promise((reslove, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.eaxmple.com');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                reslove(xhr.response);
            } else {
                reject(xhr.status);
            }
        }
    }
}).then(res=>{
    console.log(res);
})