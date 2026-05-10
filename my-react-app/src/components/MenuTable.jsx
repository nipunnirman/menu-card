import React from 'react';

const MenuTable = ({ items }) => {
  // Check if any item in the current list has multiple prices
  const hasMultiPrice = items.some(item => item.prices);

  return (
    <div className="table-container">
      <table className="menu-table">
        <thead>
          <tr>
            <th className="th-item">Item (සිංහල / தமிழ் / English)</th>
            {hasMultiPrice ? (
              <>
                <th className="th-price">Normal</th>
                <th className="th-price">Full</th>
              </>
            ) : (
              <th className="th-price" style={{ textAlign: 'center' }}>Price</th>
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="td-item">
                <div className="item-names">
                  <span className="name-si">{item.names.si}</span>
                  <span className="name-ta">{item.names.ta}</span>
                  <span className="name-en">{item.names.en}</span>
                </div>
              </td>
              {hasMultiPrice ? (
                // If the category has multi-prices, show two columns
                <>
                  {item.prices ? (
                    <>
                      <td className="td-price">Rs. {item.prices.normal}</td>
                      <td className="td-price">Rs. {item.prices.full}</td>
                    </>
                  ) : (
                    <>
                      <td className="td-price">Rs. {item.price}</td>
                      <td className="td-price td-empty">-</td>
                    </>
                  )}
                </>
              ) : (
                // If the category only has single prices, show one centered column
                <td className="td-price" style={{ textAlign: 'center' }}>Rs. {item.price}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuTable;
