import React from 'react';
import './RecentHistory.css';

function RecentHistory({ history, handleHistoryClick }) {
  return (
    <div className="recent-history">
      <h3>Recent History</h3>
      {history.length === 0 ? (
        <p className = "history-elements">No recent searches.</p>
      ) : (
        <div className="history-elements">
          {history.map((entry, index) => (
            <div
              key={index}
              className="history-element"
              onClick={() => handleHistoryClick(entry.city)}
            >
              <p className = "city">{entry.city}</p>
              <p className = "timestamp">{entry.timestamp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentHistory;
