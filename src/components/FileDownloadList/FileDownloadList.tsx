import './FileDownloadList.css';
import { useState } from 'react';
import { FileDownloadHeader, SelectAllStates } from '../FileDownloadHeader/FileDownloadHeader';
import { FileDownloadRow, FileDetails } from '../FileDownloadRow/FileDownloadRow';
import Modal from '../DownloadModal/DownloadModal';

interface FileDownloadListProps {
    data: Array<FileDetails>
}

export default function FileDownloadList(props: FileDownloadListProps){

    let [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    let [selectAllState, setSelectAllState] = useState<SelectAllStates>('unchecked');
    let [showModal, setShowModal] = useState<boolean>(false);

    const numSelectable = props.data.filter(file => file.status === 'available').length;
    if(numSelectable === 0 && selectAllState !== 'disabled'){
        setSelectAllState('disabled');
    }

    function clickFile(path: string){
        if(!selectedFiles.includes(path)) {
            setSelectAllState(selectedFiles.length === numSelectable - 1 ? 'checked' : 'indeterminate');
            setSelectedFiles((selectedFiles) => [...selectedFiles, path]);
        }
        else {
            setSelectAllState(selectedFiles.length === 1 ? 'unchecked' : 'indeterminate');
            setSelectedFiles((selectedFiles) => {
                const updatedSelectedFiles = selectedFiles.filter((key) => key !== path);
                return updatedSelectedFiles;
            });
        }
    }

    function clickSelectAll(){
        if(selectAllState === 'checked'){
            setSelectAllState('unchecked');
            setSelectedFiles([]);
        }
        else{
            setSelectAllState('checked');
            setSelectedFiles(props.data.filter(file => file.status === 'available').map(file => file.path));
        }
    }

    function clickDownload(){
        setShowModal(true);
    }

    function closeModal(){
        setShowModal(false);
        setSelectAllState('unchecked');
        setSelectedFiles([]);
    }

    return(
        <table>
            <FileDownloadHeader 
                numSelected={selectedFiles.length}
                selectAllState={selectAllState}
                clickSelectAll={() => clickSelectAll()}
                clickDownload={() => clickDownload()}
            />
            <tbody>
                {
                    props.data.length > 0 
                    ? 
                    props.data.map((file) => (
                        <FileDownloadRow
                            key={file.path}
                            file={file}
                            selected={selectedFiles.includes(file.path)}
                            clickFile={() => clickFile(file.path)}
                        />
                    ))
                    :
                    <tr>
                        <td colSpan={6} className='placeholder'>
                            No files found
                        </td>
                    </tr>
                
                }
            </tbody>

            <Modal
                showModal={showModal}
                files={props.data.filter((file) => selectedFiles.includes(file.path))}
                closeModal={() => closeModal()}
            />
        </table>
    )
}