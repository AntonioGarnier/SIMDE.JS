import React, { Component } from 'react'
import RichEditor from '../RichEditor'
//import './styles.css'


class CreateProblem extends Component {
    state = {

    }


    render() {
        return (
            <div className="fullWidth" >
                <div className="centerDivs" >
                    <h1> Problem definition </h1>
                    <RichEditor />
                </div>
                <div className="centerDivs">
                    <h1> Instance </h1>
                </div>
            </div>
        )
    }
}

export default CreateProblem
