import React from 'react'
import { Container } from 'reactstrap';

function Article(props) { 
    return <Container fluid style= {{"padding":"0px","width": "100%","height": "800px", 
                "backgroundColor": "rgba(255,125,0,0.4)",
                height: '800px'}}>
                    i am an article
            </Container> 
}

export default Article;