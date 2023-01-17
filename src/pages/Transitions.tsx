import React, {useState, useTransition, useDeferredValue} from "react";

import '../App.css';

const items = Array(10000).fill('').map((_, key) => (`item ${key + 1}`));
const Transitions: React.FC = () => {
    const [queryNoHooks, setQueryNoHooks] = useState<string>('');
    const [queryUseTransition, setQueryUseTransition] = useState<string>('');
    const [queryUseDeferredValue, setQueryUseDeferredValue] = useState<string>('');

    const [isPending, startTransition] = useTransition();

    let filteredItemsNoHooks: string[];
    let filteredItemsUseTransition: string[];
    let filteredItemsUseDeferredValue: string[];

    filteredItemsNoHooks = queryNoHooks.length ? items.filter(item => item.includes(queryNoHooks)) : items;
    filteredItemsUseTransition = queryUseTransition.length ? items.filter(item => item.includes(queryUseTransition)) : items;
    filteredItemsUseDeferredValue = queryUseDeferredValue.length ? items.filter(item => item.includes(queryUseDeferredValue)) : items;

    const deferredItems = useDeferredValue<string[]>(filteredItemsUseDeferredValue);


    const changeQueryHandler = (value) => {
        startTransition(() => {
            setQueryUseTransition(value);
        })
    }

    return (<>
        <h2>Transitions</h2>
        <div>Try x6 slowdown</div>
        < br/>
        < br/>
        <div className="Columns">
            <div>
                <div>No hooks</div>
                <input placeholder={"search something"} onChange={({target: {value}}) => setQueryNoHooks(value)}
                       value={queryNoHooks}/>
                <ul>
                    {!!filteredItemsNoHooks.length ? (filteredItemsNoHooks as string[]).map((item, key) => <li key={key}>{item}</li>) : 'No items'}
                </ul>
            </div>
            <div>
                <div>useTransition</div>
                <input placeholder={"search something"}
                       onChange={({target: {value}}) => changeQueryHandler(value)} value={queryUseTransition}/>
                {isPending && <h4>Concurrent work</h4>}
                <ul>
                    {!!filteredItemsUseTransition.length ? (filteredItemsUseTransition as string[]).map((item, key) => <li key={key}>{item}</li>) : 'No items'}
                </ul>
            </div>
            <div>
                <div>useDeferredValue</div>
                <input placeholder={"search something"} onChange={({target: {value}}) => setQueryUseDeferredValue(value)}
                       value={queryUseDeferredValue}/>
                <ul>
                    {!!deferredItems.length ? deferredItems.map((item, key) => <li key={key}>{item}</li>) : 'No items'}
                </ul>
            </div>
        </div>
    </>);
}

export default Transitions;
