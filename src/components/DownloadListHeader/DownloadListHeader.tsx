import './DownloadListHeader.css';
import { FiDownload } from 'react-icons/fi';

interface DownloadListHeaderProps {
    numSelected: number;
    selectAllState: SelectAllStates;
    clickSelectAll: () => void;
    clickDownload: () => void;
}

export type SelectAllStates = 'checked' | 'unchecked' | 'indeterminate' | 'disabled';

export function DownloadListHeader(props: DownloadListHeaderProps){

    return(
        <div className='header'>

            {/* Select All checkbox */}
            <input
                type='checkbox'
                className='select-all-checkbox'
                checked={props.selectAllState === 'checked'}
                disabled={props.selectAllState === 'disabled'}
                onClick={() => props.clickSelectAll()}
                onChange={(e) => {}}
                ref={(input) => {
                    if (input) {
                        if (props.selectAllState === 'indeterminate') {
                            input.indeterminate = true;
                        }
                        else {
                            input.indeterminate = false;
                        }
                    }
                }}
                aria-label='Select All'
            />

            {/* Number of items selected */}
            <span className='num-selected'>
                {props.numSelected > 0 ? `Selected ${props.numSelected}` : 'None Selected'}
            </span>

            {/* Button to download items; disabled if no items are selected */}
            <span>
                <button className='download-btn' disabled={props.numSelected === 0} onClick={() => props.clickDownload()}>
                    <FiDownload className='download-icon' size={21} />
                    <span className='download-btn-text'>Download Selected</span>
                </button>
            </span>
        </div>
    )
    
}