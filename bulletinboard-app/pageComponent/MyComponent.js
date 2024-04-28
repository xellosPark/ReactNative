import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Pagination from './Pagination';

// Suppose you have a data array of items
const data = new Array(100).fill(null).map((_, index) => ({
  id: index + 1,
  content: `Item ${index + 1}`,
}));

const ITEMS_PER_PAGE = 5;

const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the items to be shown on the current page
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Additionally, here you could load data for the new page if not already loaded
  };

  return (
    <View>
      {currentItems.map((item) => (
        <Text key={item.id}>{item.content}</Text>
      ))}
      <Pagination
        totalItems={data.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </View>
  );
};

export default MyComponent;