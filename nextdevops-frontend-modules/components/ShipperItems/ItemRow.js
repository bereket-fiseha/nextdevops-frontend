import React from "react";
import calculateFreightClass from '../Helper/calculateFreightClass';

class ItemRow extends React.Component {
    constructor(props) {
        super(props);
    }
    destroy = () => {
        const { onDestroy, item: { id } } = this.props
        onDestroy(id);
    }
    render() { 
        const { item: { totalWeight, lengthh, width, height, counts } } = this.props
        const freigthClass = calculateFreightClass(totalWeight, lengthh, width, height)
        return (
            <tr>
                <td>{totalWeight}</td>
                <td>{lengthh}</td>
                <td>{width}</td>
                <td>{height}</td>
                <td>{freigthClass}</td>
                <td>{counts}</td>
                {/* <td>{itemDescription}</td> */}
                <td>
                    <button onClick={this.destroy}>X</button>
                </td>
            </tr>
        );
    }
}

export default ItemRow;