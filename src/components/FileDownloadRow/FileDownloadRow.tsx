import './FileDownloadRow.css';
import { FaCircle } from 'react-icons/fa';

interface FileDownloadRowProps {
    file: any,
    selected: boolean,
    clickFile: () => void;
}

export type FileDetails = {
    name: string;
    device: string;
    path: string;
    status: string;
}

export function FileDownloadRow(props: FileDownloadRowProps){

    let clickable = false;
    let rowClass = 'body-row';
    
    // Capitalize the first letter of the status
    let status = props.file.status.charAt(0).toUpperCase() + props.file.status.slice(1);

    // The user can only select the file if the status is Available
    if(status === 'Available'){
        clickable = true;
        rowClass += ' clickable'

        if(props.selected){
            rowClass += ' selected';
        }
    }
    
    return(
        <tr className={rowClass} onClick={clickable ? () => props.clickFile() : undefined}>
            <td className='name-field'>
                <span>
                    <input 
                        type='checkbox'
                        className='file-checkbox'
                        checked={props.selected}
                        disabled={!clickable}
                        onChange={e => {}}
                        aria-label='Select File'
                    />
                </span>
                <span>
                    {props.file.name}
                </span>
            </td>
            <td className='device-field'>
                {props.file.device}
            </td>
            <td className='path-field'>
                {props.file.path}
            </td>
            <td className='status-field'>
                {status === 'Available' && 
                    <span className='status-icon'>
                        <FaCircle size={14} style={{color: '#86CE3C'}}/>
                    </span>
                }
                <span className='status-text'>
                    {status}
                </span>
            </td>
        </tr>
    )
}