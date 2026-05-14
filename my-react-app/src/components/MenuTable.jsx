import React from 'react';

const MenuTable = ({ items }) => {
  // Find the first item with multiple prices to determine headers dynamically
  const multiPriceItem = items.find(item => item.prices);
  const priceHeaders = multiPriceItem ? Object.keys(multiPriceItem.prices) : [];

  return (
    <div className="table-container">
      <table className="menu-table">
        <thead>
          <tr>
            <th className="th-item">Item (සිංහල / தமிழ் / English)</th>
            {priceHeaders.length > 0 ? (
              priceHeaders.map(header => (
                <th key={header} className="th-price" style={{ textTransform: 'capitalize' }}>
                  {header} (Rs.)
                </th>
              ))
            ) : (
              <th className="th-price" style={{ textAlign: 'center' }}>Price (Rs.)</th>
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="td-item">
                <div className="item-names">
                  {item.names.si && <span className="name-si">{item.names.si}</span>}
                  {item.names.ta && <span className="name-ta">{item.names.ta}</span>}
                  <span className="name-en">{item.names.en}</span>
                </div>
              </td>
              {priceHeaders.length > 0 ? (
                // If the category has multi-prices, show dynamic columns
                priceHeaders.map(header => (
                  <td key={header} className={`td-price ${!item.prices || !item.prices[header] ? 'td-empty' : ''}`}>
                    {item.prices && item.prices[header] ? item.prices[header] : '-'}
                  </td>
                ))
              ) : (
                <td className="td-price" style={{ textAlign: 'center' }}>
                  {item.price ? item.price : '-'}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuTable;
