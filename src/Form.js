import React from "react"

export default function Form(){

    const [memeData , setMemeData] = React.useState({})

    React.useEffect(() => {
        console.log("ma bhi chal gya")
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(responseData => setMemeData(responseData.data.memes))
    },[])

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

    function getMemeImg(){
        const randomNum = Math.floor(Math.random()*100)
        setMeme(prevMeme => ({
            ...prevMeme,
            imgUrl : memeData[randomNum].url
        }))
        }

    return(
        <>
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
                <input onClick = {getMemeImg} className="button" type = "button" value="Get a new meme image  🖼"></input>
                <div  className= "img-container">
                    {meme.imgUrl && <img className = "image" src = {meme.imgUrl}  alt = "meme"></img>}
                    {meme.imgUrl && <h2 className="meme-text top-meme-text">{meme.topText}</h2>}
                    {meme.imgUrl && <h2 className="meme-text bottom-meme-text">{meme.bottomText}</h2>}
                </div>
        </div>
        
        </>
    )
}