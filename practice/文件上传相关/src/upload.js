
const upload_input = document.querySelector('input')
const upload_button = document.querySelector('button')
const upload_progress = document.querySelector('.progress')

changeBuffer = function (file) {
    reader = new FileReader()
    spark = new SparkMD5.ArrayBuffer()
    return new Promise(resolve => {

        reader.readAsArrayBuffer(file)
        reader.onload =function (e) {
            spark.append(e.target.result)
            resolve(spark.end())
        }
    }
    )
    // console.log(file);
    // )
}

upload_input.addEventListener('change', async function () {
    file = upload_input.files[0]
    // console.log(file);
    let HASH=await changeBuffer(file),
        max=1024*1000,
        part=1,
        chunks=[],
        suffix = file.name.match(/.[^.]+$/)[0];
    if(file.size>max){
        part=Math.ceil(file.size/max)
    }
    for(let i=0;i<part;i++){
        chunks.push({filename:`${HASH}-${i}${suffix}`,file:file.slice(i*max,(i+1)*max)})
    }
    console.log(chunks);
})