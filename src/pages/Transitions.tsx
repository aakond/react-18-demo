import React, { useDeferredValue, useEffect, useState, useTransition } from 'react';

import { LoadingSVG } from '../loading';

import '../App.css';

const items = Array(20000)
  .fill('')
  .map((_, key) => `item ${key + 1}`);

const Transitions: React.FC = () => {
  const [queryNoHooks, setQueryNoHooks] = useState<string>('');
  const [queryUseTransition, setQueryUseTransition] = useState<string>('');
  const [queryUseDeferredValue, setQueryUseDeferredValue] = useState<string>('');

  const [filterUseTransition, setFilterUseTransition] = useState<string>('');

  const [filteredItemsNoHooks, setFilteredItemsNoHooks] = useState<string[]>(items);
  const [filteredItemsUseTransition, setFilteredItemsUseTransition] = useState<string[]>(items);
  const [filteredItemsUseDeferredValue, setFilteredItemsUseDeferredValue] = useState<string[]>(items);

  const [isPending, startTransition] = useTransition();

  const deferredValue = useDeferredValue<string>(queryUseDeferredValue);

  useEffect(() => {
    !queryNoHooks.length && setFilteredItemsNoHooks(items);
  }, [queryNoHooks]);

  useEffect(() => {
    if (!filterUseTransition.length) {
      setFilterUseTransition('');
      setFilteredItemsUseTransition(items);
    } else {
      setFilteredItemsUseTransition(items.filter((item) => item.includes(filterUseTransition)));
    }
  }, [filterUseTransition, items]);

  useEffect(() => {
    if (!deferredValue.length) {
      setQueryUseDeferredValue('');
      setFilteredItemsUseDeferredValue(items);
    } else {
      setFilteredItemsUseDeferredValue(items.filter((item) => item.includes(deferredValue)));
    }
  }, [deferredValue, items]);

  return (
    <>
      <div className="Columns">
        <div>
          <h2>Transitions</h2>
          <div>Try slowdown</div>
        </div>
        <LoadingSVG />
      </div>
      <br />
      <br />
      <div className="Columns">
        <div>
          <div>No hooks</div>
          <input
            placeholder={'search something'}
            onChange={({ target: { value } }) => {
              setQueryNoHooks(value);
              setFilteredItemsNoHooks(
                queryNoHooks.length ? items.filter((item) => item.includes(queryNoHooks)) : items,
              );
            }}
            value={queryNoHooks}
          />
          <ul>
            {!!filteredItemsNoHooks.length
              ? (filteredItemsNoHooks as string[]).map((item, key) => <li key={key}>{item}</li>)
              : 'No items'}
          </ul>
        </div>
        <div>
          <div>useTransition</div>
          <input
            placeholder={'search something'}
            onChange={({ target: { value } }) => {
              setQueryUseTransition(value);
              startTransition(() => {
                setFilterUseTransition(value);
              });
            }}
            value={queryUseTransition}
          />
          {isPending && <h4>Concurrent work</h4>}
          <ul>
            {!!filteredItemsUseTransition.length
              ? filteredItemsUseTransition.map((item, key) => <li key={key}>{item}</li>)
              : 'No items'}
          </ul>
        </div>
        <div>
          <div>useDeferredValue</div>
          <input
            placeholder={'search something'}
            onChange={({ target: { value } }) => {
              setQueryUseDeferredValue(value);
              setFilteredItemsUseDeferredValue(
                deferredValue.length ? items.filter((item) => item.includes(deferredValue)) : items,
              );
            }}
            value={queryUseDeferredValue}
          />
          <ul>
            {!!filteredItemsUseDeferredValue.length
              ? filteredItemsUseDeferredValue.map((item, key) => <li key={key}>{item}</li>)
              : 'No items'}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Transitions;
