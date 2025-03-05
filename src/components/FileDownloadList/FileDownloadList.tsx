import './FileDownloadList.css';
import { useState } from 'react';
import { FileDownloadHeader, SelectAllStates } from '../FileDownloadHeader/FileDownloadHeader';
import { FileDownloadRow, FileDetails } from '../FileDownloadRow/FileDownloadRow';
import Modal from '../DownloadModal/DownloadModal';

interface FileDownloadListProps {
    data: Array<FileDetails>
}

export default function FileDownloadList(props: FileDownloadListProps){

    // List of the selected files' file paths (used as a unique identifier)
    let [selectedFiles, setSelectedFiles] = useState<string[]>([]);

    // The current state of the Select All checkbox
    // Possible values: checked, unchecked, indeterminate, disabled
    let [selectAllState, setSelectAllState] = useState<SelectAllStates>('unchecked');

    // Whether or not to display the download modal (after the user clicks Download Selected)
    let [showModal, setShowModal] = useState<boolean>(false);

    // The user can only select files with status = available
    // If no files are available, the Select All checkbox is disabled
    const numSelectable = props.data.filter(file => file.status === 'available').length;
    if(numSelectable === 0 && selectAllState !== 'disabled'){
        setSelectAllState('disabled');
    }

    // This is called when the user clicks an individual file
    // It adds/removes the file from the selectedFiles list
    // It also updates the state of the Select All checkbox:
    //   - unchecked if no files are selected
    //   - checked if all files are selected
    //   - indeterminate if some but not all of the files are selected
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

    // This is called when the user clicks the Select All checkbox
    // If all files are already selected, it deselects all
    // Otherwise, it selects all the files with status = available
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

    // This is called to open the modal when the user clicks the download button
    function clickDownload(){
        setShowModal(true);
    }

    // This is called when the user clicks the OK button to close the modal
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
                    /* Details for each file in the payload */
                    props.data.map((file) => (
                        <FileDownloadRow
                            key={file.path}
                            file={file}
                            selected={selectedFiles.includes(file.path)}
                            clickFile={() => clickFile(file.path)}
                        />
                    ))
                    :
                    /* Default text to display if no files were returned */
                    <tr>
                        <td colSpan={6} className='placeholder'>
                            No files found
                        </td>
                    </tr>
                
                }
            </tbody>

            {/* Modal to display when the user clicks the download button */}
            <Modal
                showModal={showModal}
                files={props.data.filter((file) => selectedFiles.includes(file.path))}
                closeModal={() => closeModal()}
            />
        </table>
    )
}