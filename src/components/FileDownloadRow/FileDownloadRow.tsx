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
    
    let status = props.file.status.charAt(0).toUpperCase() + props.file.status.slice(1);
    if(status === 'Available'){
        clickable = true;
        rowClass += ' clickable'

        if(props.selected){
            rowClass += ' selected';
        }
    }
    
    return(
        <tr className={rowClass} onClick={clickable ? () => props.clickFile() : undefined}>
            <td className='checkbox-field'>
                <input type='checkbox' className='file-checkbox' checked={props.selected} disabled={!clickable}></input>
            </td>
            <td className='name-field'>{props.file.name}</td>
            <td className='device-field'>{props.file.device}</td>
            <td className='path-field'>{props.file.path}</td>
            <td className='status-icon'>
                {status === 'Available' && <FaCircle style={{color: '#86CE3C'}}/>}
            </td>
            <td className='status-field'>{status}</td>
        </tr>
    )
}