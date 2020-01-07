import React, { Component } from 'react'
import {Container,
    Card,  CardText, CardBody,CardFooter,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import axios from 'axios';
class Items extends Component {
    state={
        items:[]
    }
    async componentDidMount(){
        let x=await axios.get('http://localhost:5000/api/items')
        this.setState({
            items:[...this.state.items,...x.data]
        });
        console.log(this.state.items)
    }
    render() {
        return (
            <Container style={{position:'relative',marginLeft:'19rem'}}>
            <div className="row">
                {this.state.items.map((i,index)=>{
                    return(
                        <Card className="mr-4 col-sm-4 mb-3" key={index}>
                            <CardBody>
                                <CardTitle><span style={{fontWeight:100}}>ItemName: {i.ItemName}</span></CardTitle>
                                <CardSubtitle><span style={{fontWeight:100}}>ItemPrice:{i.ItemPrice}</span></CardSubtitle>
                                <CardText><span style={{fontWeight:100}}>Quantity Remaing:{i.Quantity}</span></CardText>
                                <div>
                                    <span style={{fontWeight:500}}>Select Quantity:</span>&nbsp;<span><Button size="sm">&minus;</Button></span>
                                </div>
                            <CardFooter>
                                <Button color="dark" block>Add To Cart</Button>
                            </CardFooter>
                            </CardBody>
                        </Card>
                    )
                })}
            </div>
            </Container>
        )
    }
}

export default Items
