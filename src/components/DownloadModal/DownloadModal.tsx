import './DownloadModal.css';
import { FileDetails } from '../FileDownloadRow/FileDownloadRow';

interface DownloadModalProps {
    showModal: boolean;
    files: Array<FileDetails>;
    ref: any;
    closeModal: () => void;
}

export default function DownloadModal(props: DownloadModalProps){

    if(!props.showModal){
        return null;
    }

    return(
        <div 
            className='modal-overlay'
            role='dialog'
            aria-modal='true'
            aria-labelledby='download-modal-header'
            aria-describedby='download-modal-body'
        >
            <div className='modal-content'>

                {/* Header */}
                <h1 id='download-modal-header'>
                    Downloaded Files
                </h1>

                {/* List of selected/downloaded files */}
                <div id='download-modal-body'>
                    <ul>
                        {props.files.map((file) => (
                            <li key={file.path}>
                                <span>{file.device}</span>
                                <span>{file.path}</span>
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