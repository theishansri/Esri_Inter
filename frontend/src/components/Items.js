import React, { Component } from 'react'
import {
    Container,
    Card, CardText, CardBody, CardFooter,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import axios from 'axios';
import "./css/Item.css";
import { addCart } from '../actions/ItemsActions'
import { connect } from 'react-redux';
class Items extends Component {
    state = {
        items: [],
        item_count: {}
    }
    async componentDidMount() {
        let x = await axios.get('http://localhost:5000/api/items');
        let k = {}
        for (let i = 0; i < x.data.length; i++) {
            k[x.data[i]['ItemName']] = 0
        }
        this.setState({
            items: [...this.state.items, ...x.data],
            item_count: k
        });
    }
    handleMinus = (itemname) => {
        this.setState(prev => ({
            item_count: {
                ...prev.item_count,
                [itemname]: prev.item_count[itemname] - 1
            }
        }))
    }
    handleAdd = () => {
        let x = {}
        const { item_count } = this.state
        for (let key in item_count) {
            if (item_count[key] > 0) {
                x[key] = item_count[key]
            }
        }
        this.props.addToCart(x)
    }
    handlePlus = (itemname) => {
        this.setState(prev => ({
            item_count: {
                ...prev.item_count,
                [itemname]: prev.item_count[itemname] + 1
            }
        }))
    }
    render() {
        return (
            <Container style={{ position: 'relative', marginLeft: '19rem' }}>
                <div className="row">
                    {this.state.items.map((i, index) => {
                        return (
                            <Card className="mr-5 col-sm-4 mb-4 card" key={index}>
                                <CardBody>
                                    <CardTitle><span style={{ fontWeight: 100 }}>ItemName: {i.ItemName}</span></CardTitle>
                                    <CardSubtitle><span style={{ fontWeight: 100 }}>ItemPrice:{i.ItemPrice}</span></CardSubtitle>
                                    <CardText><span style={{ fontWeight: 100 }}>Quantity Remaing:{i.Quantity}</span></CardText>
                                    <div className="mb-3 quantity_add">
                                        <span style={{ fontWeight: 50, fontSize: '1rem', color: 'white' }}>Select Quantity:</span>&nbsp;<span style={{ marginTop: '5px' }}><Button disabled={this.state.item_count[i.ItemName] === 0 ? true : false} style={{ padding: '2px', margin: '6px', width: '2rem' }} onClick={() => this.handleMinus(i.ItemName)}>&minus;</Button>
                                            &nbsp;<span style={{ color: 'white', marginTop: '4px' }}>{this.state.item_count[i.ItemName]}</span>&nbsp;<Button disabled={this.state.item_count[i.ItemName] === i.Quantity ? true : false} onClick={() => this.handlePlus(i.ItemName)} style={{ padding: '2px', margin: '6px', width: '2rem' }}>&#43;</Button></span>
                                    </div>
                                    <CardFooter>
                                        <Button color="dark" onClick={this.handleAdd} block>Add To Cart &#128722;</Button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (items) => dispatch(addCart(items)),
        // items:(items)=>dispatch(itemsArray(items))
    }
}
export default connect(null, mapDispatchToProps)(Items)
