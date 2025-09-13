export default function Die (props) {
    return (
        <button className="dieBox" style={{ backgroundColor: props.held ? "#59E391" : "white" }} onClick={props.id} >
            {props.value}
        </button>
    )
}