import React, {Component} from 'react';
import Particles from 'react-particles-js';

class ParticleSettings extends Component{
    render(){
        return(
            <div>
                <Particles
                    height = "100vh"
                    width = "100vw"
                    id = "tsparticles"
                    options = {{
                        background: {
                            color: {
                                value: "#0d4741"
                            },
                        },
                        fpsLimit: 60,
                        interactivity:{
                            detectsOn: "canvas",
                            events: {
                                onClick: {
                                    enable: true,
                                    mode: "push"
                                },
                                onHover: {
                                    enable: true,
                                    mode: "repulse"
                                },
                                resize: true 
                            }
                        }
                    }}
                />
            </div>
        )
    }
}

export default ParticleSettings;