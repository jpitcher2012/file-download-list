import './DownloadListRow.css';

interface DownloadListRowProps {
    item: DownloadItem;
    selected: boolean;
    fields: Array<DownloadItemField>;
    clickItem: () => void;
}

export type DownloadItem = {
    id: string;
    shortDesc: string;
    disabled?: boolean;
    properties: any;
}

export type DownloadItemField = {
    name: string;
    label: string;
    class?: string;
}

export function DownloadListRow(props: DownloadListRowProps){

    let rowClass = 'body-row';

    if(!props.item.disabled){
        rowClass += ' clickable'

        if(props.selected){
            rowClass += ' selected';
        }
    }

    // If no fields were specified or the item has no properties, there is nothing to display
    if(props.fields.length === 0 || !props.item.properties || Object.keys(props.item.properties).length === 0){
        return null;
    }
    
    return(
        <tr className={rowClass} onClick={props.item.disabled ? undefined : () => props.clickItem()}>
            
            {/* Checkbox and first field*/}
            <td className={'first-field ' + (props.fields[0].class || '')}>
                <span>
                    <input 
                        type='checkbox'
                        className='item-checkbox'
                        checked={props.selected}
                        disabled={props.item.disabled}
                        onChange={e => {}}
                        aria-label='Select Item'
                    />
                </span>
                <span>
                    {props.item.properties[props.fields[0].name]}
                </span>
            </td>

            {
                /* Remaining fields */
                props.fields.slice(1).map((item) => (
                    <td key={item.name} className={item.class || ''}>
                        {props.item.properties[item.name]}
                    </td>
                ))
            }                           
        </tr>
    )
}