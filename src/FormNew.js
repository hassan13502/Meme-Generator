import React from "react"

export default function Form(){
    const [meme, setMeme] = React.useState({
        topText : "",
        bottomText : "",
        imgUrl : ""
    })

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name] : value
        }))
    }

    const getMemeImg = function (event){
        const fileList = event.target.files
        const file = fileList[0];
        const reader = new FileReader();
        reader.onload = function(e){
            setMeme({
                topText : "",
                bottomText : "",
                imgUrl : e.target.result
            })
        }
        reader.readAsDataURL(file)
        // console.log(JSON.stringify(event.target))
        // setMeme({
        //     topText : "",
        //     bottomText : "",
        //     imgUrl : event.target.files[0]
        // })
        }
    
        const downloadImage = function(){
        console.log("download ran")
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const maxWidth = 720; 

            const originalWidth = img.naturalWidth;
            const originalHeight = img.naturalHeight;

            const scaleFactor = Math.min(maxWidth / originalWidth, 1);

            canvas.width = originalWidth * scaleFactor;
            canvas.height = originalHeight * scaleFactor;
      
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
            ctx.font = '36px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(meme.topText, canvas.width * .35, canvas.width*.07);
            ctx.fillText(meme.bottomText, canvas.width * .35, canvas.height - 30);
      
            const dataURL = canvas.toDataURL('image/png');
            const alink = document.createElement('a')
            alink.href = dataURL;
            alink.download = "meme.png"
            alink.click()
          };
      
          img.src = meme.imgUrl;
        }

    return(
        <div className = "formDiv">
                <input className="form-input" 
                    type="text" 
                    placeholder = "Top Text here"
                    name = "topText"
                    value = {meme.topText}
                    onChange={handleChange}
                ></input>
                <input className="form-input" 
                    type="text" 
                    placeholder = "Bottom Text here"
                    name = "bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                ></input>
                <button className="button"> Upload new meme
                <input onChange = {getMemeImg} className="fileupload" type = "file" value="" accept="image/*"></input></button>
                {meme.imgUrl && <input onClick = {downloadImage} type="button" className="button" value ="Download"></input>}
                <div  className= "img-container">
                    {meme.imgUrl && <img type = "file" className = "image" src = {meme.imgUrl}   alt = "meme"></img>}
                    {meme.imgUrl && <h2 className="meme-text top-meme-text">{meme.topText}</h2>}
                    {meme.imgUrl && <h2 className="meme-text bottom-meme-text">{meme.bottomText}</h2>}
                </div>

                
        </div>
    )
}