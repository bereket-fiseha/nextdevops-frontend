import React from "react";

class ItemRow extends React.Component {
    constructor(props) {
        super(props);
    }
    destroy = () => {
        const { onDestroy, item: { id } } = this.props
        onDestroy(id);
    }
    render() { 
        const { item: { firstName, lastName, email, phoneNumber } } = this.props
        return (
            <tr>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{phoneNumber}</td>
                <td>
                    <button onClick={this.destroy}>X</button>
                </td>
            </tr>
        );
    }
}

export default ItemRow;