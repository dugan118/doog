//import styles from "@/styles/Components.module.css";


export default function BoughtCells({ boughtCells, selectedCells }) {
    return(
        <div>
            <div className="">
                <h2>Bought Cells:</h2>
                <ul>
                {boughtCells.map((cellId) => (
                    <li key={cellId}>{cellId}</li>
                ))}
                </ul>
            </div>
            <br/>
            <br/>
            <div className="">
                <h2>Selected Cells:</h2>
                <ul>
                {selectedCells.map((cellId) => (
                    <li key={cellId}>{cellId}</li>
                ))}
                </ul>
            </div>
        </div>
    )
}