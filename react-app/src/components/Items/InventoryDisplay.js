const InventoryDisplay = ({ item }) => {
    return (
        <div>{item.name} {item.quantity}</div>
    )
}

export default InventoryDisplay