import './FileDownloadHeader.css';
import { FiDownload } from 'react-icons/fi';

interface FileDownloadHeaderProps {
    numSelected: number;
    selectAllState: SelectAllStates;
    clickSelectAll: () => void;
    clickDownload: () => void;
}

export type SelectAllStates = 'checked' | 'unchecked' | 'indeterminate' | 'disabled';

export function FileDownloadHeader(props: FileDownloadHeaderProps){

    return(
        <thead>
            <tr className='download-controls'>
                <th colSpan={6}>
                    <input 
                        type='checkbox'
                        className='select-all-checkbox'
                        checked={props.selectAllState === 'checked'}
                        disabled={props.selectAllState === 'disabled'}
                        ref={(input)=>{
                            if(input){
                                if(props.selectAllState === 'indeterminate'){
                                    input.indeterminate = true;
                                }
                                else{
                                    input.indeterminate = false;
                                }
                            }
                        }}
                        onClick={() => props.clickSelectAll()}
                    />
                
                    <span className='num-selected'>
                        {props.numSelected > 0 ? `Selected ${props.numSelected}` : 'None Selected'}
                    </span>

                    <span>
                        <button className='download-btn' disabled={props.numSelected === 0} onClick={() => props.clickDownload()}>
                            <FiDownload className='download-icon' size={21}/>
                            <span className='download-btn-text'>Download Selected</span>
                        </button>
                    </span>
                </th>
            </tr>
            <tr className='field-headers'>
                <th></th>
                <th>Name</th>
                <th>Device</th>
                <th>Path</th>
                <th></th>
                <th>Status</th>
            </tr>
        </thead>
    )
}