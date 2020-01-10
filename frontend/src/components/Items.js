import React, { Component } from 'react'
import {
    Container,
    Card, CardText, CardBody, CardFooter,
    CardTitle, CardSubtitle, Button, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import axios from 'axios';
import "./css/Item.css";
import { addCart, itemsArray } from '../actions/ItemsActions'
import { connect } from 'react-redux';
import { tokenConfig } from "../actions/authActions"
class Items extends Component {
    state = {
        items: [],
        item_count: {},
        currentPage: 1,
        perPage: 6
    }
    async componentDidMount() {
        const token = localStorage.getItem('token');
        const config = {
            'Content-Type': 'application/json'
        }
        if (token) {
            config['x-auth-token'] = token;
        }
        let x = await axios.get('http://localhost:5000/api/items', {
            headers: {
                ...config
            }
        });
        let k = {}
        for (let i = 0; i < x.data.length; i++) {
            k[x.data[i]['ItemName']] = 0
        }
        this.setState({
            items: [...this.state.items, ...x.data],
            item_count: k
        });
        this.props.items(this.state.items)

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
    handleClick = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        })
    }
    render() {
        const { items, currentPage, perPage } = this.state;
        const indexOfLastTodo = currentPage * perPage;
        const indexOfFirstTodo = indexOfLastTodo - perPage;
        const currentItems = items.slice(indexOfFirstTodo, indexOfLastTodo);
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(items.length / perPage); i++) {
            pageNumbers.push(i)
        }
        const display = (
            <Container style={{ position: 'relative', marginLeft: '19rem' }}>
                <div className="row">
                    {currentItems.map((i, index) => {
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
                                        <Button color="dark" onClick={this.handleAdd} block>Add To Cart <span role="img" aria-label="Cart_logo">&#128722;</span></Button>
                                    </CardFooter>
                                </CardBody>
                            </Card>
                        )
                    })}
                </div>
                <React.Fragment>
                    <Pagination style={{ textAlign: 'center', position: 'relative', left: '21rem' }} className="mt-4" aria-label="page Numbers">
                        {pageNumbers.map((i) => {
                            return (
                                <PaginationItem key={i}>
                                    <PaginationLink onClick={() => this.handleClick(i)}>{i}</PaginationLink>
                                </PaginationItem>
                            )
                        })}
                    </Pagination></React.Fragment>
            </Container>
        )
        const notAuthenticated = (
            <Container className="mt-3">
                <strong color="light">Please Login First...</strong>
            </Container>
        )
        const { isAuthenticated } = this.props;
        return (
            <div>
                {isAuthenticated ? display : notAuthenticated}
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (items) => dispatch(addCart(items)),
        items: (items) => dispatch(itemsArray(items)),
        settoken: () => dispatch(tokenConfig())
    }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Items)
