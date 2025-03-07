import './FileDownloadList.css';
import { useEffect } from 'react';
import { DownloadItem, DownloadItemField } from '../DownloadListRow/DownloadListRow';
import DownloadList from '../DownloadList/DownloadList';


interface FileDownloadListProps {
    data: Array<any>
}

export default function FileDownloadList(props: FileDownloadListProps){

    const FIELDS: Array<DownloadItemField> = [
        {
            name: 'name',
            label: 'Name',
            class: 'name-field'
        },
        {
            name: 'device',
            label: 'Device',
            class: 'device-field'
        },
        {
            name: 'path',
            label: 'Path',
            class: 'path-field'
        },
        {
            name: 'status',
            label: 'Status',
            class: 'status-field'
        }
    ]

    let files: Array<DownloadItem> = [];
    for(let file of props.data){
        
        // Capitalize the first letter of the status
        let status = file.status.charAt(0).toUpperCase() + file.status.slice(1);
        file.status = status;

        // The user can only select the file if the status is Available
        let disabled = status !== 'Available';

        // Display the device & path in the modal
        let shortDesc = `${file.device} - ${file.path}`;

        files.push({
            id: file.path,
            shortDesc: shortDesc,
            disabled: disabled,
            properties: file
        });
    }

    // Insert the icons for Available status
    useEffect(() => {

        // If icons have already been added, don't add them again
        let icons = document.getElementsByClassName('status-indicator');
        if(icons.length > 0){
            return;
        }

        let statusElements = document.getElementsByClassName('status-field');

        for(let i = 0; i < statusElements.length; i++){
            let element = statusElements[i];
            if(element.innerHTML === 'Available'){
                element.insertAdjacentHTML('afterbegin', '<span class="status-indicator"></span>');
            }
        }
    
      }, []);

    return (
        <DownloadList items={files} fields={FIELDS} />
    )
}