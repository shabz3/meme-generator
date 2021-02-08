import React from "react"

class MemeGenerator extends React.Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImage: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(jsonData => jsonData.json())
            .then(usefulData => {
                const { memes } = usefulData.data
                this.setState({
                    allMemeImgs: memes
                })
            })
    }

    handleChange(event) {
        const{name, value} = event.target
        this.setState({[name]: value})
    }

    handleSubmit(event) {
        event.preventDefault()
        const randomMeme = this.state.allMemeImgs[Math.floor(Math.random() * this.state.allMemeImgs.length)].url
        
        this.setState({
            randomImage: randomMeme
        })
        console.log(this.state.randomImage)
        console.log("hi")
    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.topText} name="topText" placeholder="Top Text" onChange={this.handleChange}/>
                    <input type="text" value={this.state.bottomText} name="bottomText" placeholder="Bottom Text" onChange={this.handleChange}/>
                    <br />

                    <button>Generate Meme</button>

                </form>
                <div className="meme">
                    <img src={this.state.randomImage} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>

                </div>
            </div>
        )
    }
}

export default MemeGenerator