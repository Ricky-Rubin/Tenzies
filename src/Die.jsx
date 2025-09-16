export default function Die (props) {
    return (
        <button className="dieBox" 
                style={{ backgroundColor: props.held ? "#59E391" : "white" }} 
                onClick={props.id}
                aria-pressed={props.held}
                aria-label={`Die with value ${props.value}, 
                ${props.held} ? "held" : "not held" `} >
            {props.value}
        </button>
    )
}