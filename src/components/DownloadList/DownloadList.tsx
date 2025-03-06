import './DownloadList.css';
import { useState, useRef } from 'react';
import { DownloadListHeader, SelectAllStates } from '../DownloadListHeader/DownloadListHeader';
import { DownloadListRow, DownloadItem, DownloadItemField } from '../DownloadListRow/DownloadListRow';
import Modal from '../ListModal/ListModal';

interface DownloadListProps {
    items: Array<DownloadItem>;
    fields: Array<DownloadItemField>;
}

export default function DownloadList(props: DownloadListProps){

    let [selectedItems, setselectedItems] = useState<string[]>([]);
    let [selectAllState, setSelectAllState] = useState<SelectAllStates>('unchecked');
    let [showModal, setShowModal] = useState<boolean>(false);

    // The user can't select disabled items
    const numSelectable = props.items.filter(item => !item.disabled).length;

    // If there are no selectable items, disable Select All
    if(numSelectable === 0 && selectAllState !== 'disabled'){
        setSelectAllState('disabled');
    }

    const modalElement = useRef<HTMLInputElement>(null);

    /* 
     *  This is called when the user clicks an individual item.
     *  It adds/removes the item from selectedItems and updates the state of the Select All checkbox:
     *    - unchecked if no items are selected
     *    - checked if all items are selected
     *    - indeterminate if some but not all of the items are selected
     */
    function clickItem(itemId: string){
        if(!selectedItems.includes(itemId)) {
            setSelectAllState(selectedItems.length === numSelectable - 1 ? 'checked' : 'indeterminate');
            setselectedItems((selectedItems) => [...selectedItems, itemId]);
        }
        else {
            setSelectAllState(selectedItems.length === 1 ? 'unchecked' : 'indeterminate');
            setselectedItems((selectedItems) => {
                const updatedselectedItems = selectedItems.filter((id) => id !== itemId);
                return updatedselectedItems;
            });
        }
    }

    /*
     *  This is called when the user clicks the Select All checkbox.
     *  If all items are already selected, it deselects all.
     *  Otherwise, it selects all the items that are not disabled.
     */
    function clickSelectAll(){
        if(selectAllState === 'checked'){
            setSelectAllState('unchecked');
            setselectedItems([]);
        }
        else{
            setSelectAllState('checked');
            setselectedItems(props.items.filter(item => !item.disabled).map(item => item.id));
        }
    }

    // This is called to open the modal when the user clicks the download button
    function clickDownload(){
        setShowModal(true);
        setTimeout(() => {
            if(modalElement.current){
                modalElement.current.focus();
            }
        })
    }

    // This is called when the user clicks the OK button to close the modal
    function closeModal(){
        setShowModal(false);
        setSelectAllState('unchecked');
        setselectedItems([]);
    }

    // If no fields were specified, there is nothing to display
    if(props.fields.length === 0){
        return (
            <div className='placeholder'>
                There is nothing to display
            </div>
        )
    }

    return(
        <div className='wrapper'>
            <DownloadListHeader 
                numSelected={selectedItems.length}
                selectAllState={selectAllState}
                clickSelectAll={() => clickSelectAll()}
                clickDownload={() => clickDownload()}
            />
            <table>
                {/* Field headers */}
                <thead>
                    <tr className='field-headers'>
                        {
                            props.fields.map((field) => (
                                <th key={field.name} className={field.class || ''}>
                                    {field.label}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        props.items.length > 0 
                        ?
                        /* Details for each item in the payload */
                        props.items.map((item) => (
                            <DownloadListRow
                                key={item.id}
                                item={item}
                                selected={selectedItems.includes(item.id)}
                                fields={props.fields}
                                clickItem={() => clickItem(item.id)}
                            />
                        ))
                        :
                        /* Default text to display if no files were returned */
                        <tr>
                            <td colSpan={props.fields.length} className='placeholder'>
                                No items found
                            </td>
                        </tr>
                    
                    }
                </tbody>
            </table>

            
            {/* Modal to display when the user clicks the download button */}
            <Modal
                showModal={showModal}
                header='Downloaded Items'
                list={props.items.filter((item) => selectedItems.includes(item.id)).map((item) => item.shortDesc)}
                closeModal={() => closeModal()}
                ref={modalElement}
            />
        </div>
    )
}