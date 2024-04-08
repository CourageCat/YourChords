import React from 'react';

function ListSplitter({ data, groupSize }) {
    const newGroup = []
    for (let i = 0; i < data.length; i += groupSize) {
        const group = data.slice(i, i + groupSize)
        newGroup.push(group)
    }
    return (
        newGroup
    );
}

export default ListSplitter;
