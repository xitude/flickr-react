import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import './css/App.css';
import NavigationBar from "./components/NavigationBar";
import JSONP from "jsonp";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: []
        };

        JSONP('http://api.flickr.com/services/feeds/photos_public.gne?format=json',{"param": "jsoncallback"},(e, json) => {
            this.setState({images: json.items});
        })

    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <Grid>
                    <Row className="show-grid">
                        {this.state.images.map(item => {
                            return (
                                <Col xs={12} md={3} sm={2}>
                                    <div className="panel panel-default">
                                        <div className="panel-image hide-panel-body">
                                            <img src={item.media.m} className="panel-image-preview" />
                                        </div>
                                        <div className="panel-footer text-center">
                                            <a href={item.link}>{item.title}</a> by <a href={"https://www.flickr.com/people/"+item.author_id}>Author</a>
                                        </div>
                                        <div className="panel-body">
                                            <p >{item.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;
