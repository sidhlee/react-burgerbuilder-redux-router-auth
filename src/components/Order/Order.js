import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    console.log("[order] props: ", props);
    //TODO: map directly from Object.keys(props.ingredients) ?
    /* const ingredients = [];
    for (let i in props.ingredients) {
        ingredients.push({
            name: i,
            amount: props.ingredients[i]
        })
    }
    const ingredientsOutput = ingredients.map(o => (
        <span 
        key={o.name}
        style={{
            textTransform: 'capitalize',
            border: "1px solid #bbb",
            borderRadius: "7px",
            padding: "0 7px",
            margin: "3px",
            fontSize: "0.8em",
            display: "inline-block"
            
        }}
        >{o.name} ({o.amount})</span>
    )); */

    const ingredientsOutput = Object.keys(props.ingredients)
        .map(v => (
        <span className={classes.IngSpan} key={v}>
            {v} ({props.ingredients[v]})
        </span> 
        ));

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: 
                <strong> USD {Number.parseFloat(props.price).toFixed(2)}</strong>
            </p>
        </div>
    );   
}


export default order;
