import React from 'react';

const LogItem = ({ id, date, summary, children, onDelete, onEdit, type }) => {
    // Basic log item structure, can be customized further based on 'type'
    return (
        <li>
            <span className="log-date">{date}</span>
            {summary && <span className="log-summary">{summary}</span>}
             {children} {/* For more complex content like journal previews */}
            <span className="log-actions">
                {/* Conditionally show Edit button */}
                {type !== 'journal' && type !== 'medication' && onEdit && (
                     <a href="#" onClick={(e) => { e.preventDefault(); onEdit(id); }} title="Edit">
                         <i className="icon-placeholder icon-edit"></i> Edit
                     </a>
                 )}
                 {/* Always show Delete button */}
                 {onDelete && (
                     <a href="#" className="delete-btn" onClick={(e) => { e.preventDefault(); onDelete(id); }} title="Delete">
                         <i className="icon-placeholder icon-delete"></i> Delete
                     </a>
                 )}
            </span>
        </li>
    );
};

export default LogItem;