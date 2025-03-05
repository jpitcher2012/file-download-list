import './DownloadModal.css';
import { FileDetails } from '../FileDownloadRow/FileDownloadRow';

interface DownloadModalProps {
    showModal: boolean;
    files: Array<FileDetails>;
    closeModal: () => void;
}

export default function DownloadModal(props: DownloadModalProps){

    if(!props.showModal){
        return null;
    }

    return(
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h1 className='modal-header'>
                    Downloaded Files
                </h1>
                <div className='modal-body'>
                    <ul>
                        {props.files.map((file) => (
                            <li key={file.path}>
                                <span>{file.device}</span>
                                <span>{file.path}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='modal-footer'>
                    <button className='modal-btn' onClick={() => props.closeModal()}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    
    )
}