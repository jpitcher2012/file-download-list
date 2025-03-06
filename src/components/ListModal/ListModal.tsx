import './ListModal.css';

interface ListModalProps {
    showModal: boolean;
    header: string;
    list: Array<string>;
    ref: any;
    closeModal: () => void;
}

export default function ListModal(props: ListModalProps){

    if(!props.showModal){
        return null;
    }

    return(
        <div 
            className='modal-overlay'
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-header'
            aria-describedby='modal-body'
        >
            <div className='modal-content'>

                {/* Header */}
                <h1 id='modal-header'>
                    {props.header}
                </h1>

                {/* List of items */}
                <div id='modal-body'>
                    <ul>
                        {props.list.map((item, index) => (
                            <li key={index}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Footer with button that closes modal */}
                <div className='modal-footer'>
                    <button className='modal-btn' ref={props.ref} aria-label='Close Dialog' onClick={() => props.closeModal()}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    
    )
}