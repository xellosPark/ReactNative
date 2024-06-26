import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, settotal] = useState(totalItems);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbersToShow = 5; // Show 5 page numbers at a time

  const setPage = (page) => {

    console.log(`totalPages: ${totalPages} currentPage:${currentPage} page:${page}`);
    
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  useEffect(() => {
    if(total !== totalItems)
    {
      settotal(total);
      console.log("이전값 확인",currentPage,total);
      setCurrentPage(1);
      onPageChange(1);
    }
    
  }, [totalItems]);

  // Function to determine page numbers for pagination
  const paginationGroup = () => {
    const start =
      Math.floor((currentPage - 1) / pageNumbersToShow) * pageNumbersToShow;

    return new Array(pageNumbersToShow)
      .fill()
      .map((_, idx) => {
        const pageNum = start + idx + 1;
        // 전체 페이지 수를 초과하지 않는 페이지만 포함
        return pageNum <= totalPages ? pageNum : null;
      })
      .filter(Boolean); // null 항목 제거
  };

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        onPress={() => setPage(1)}
        style={[styles.navButton, styles.specialButton]}
      >
        <Text style={styles.navButtonText}>{"<<"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        style={[styles.navButton, styles.specialButton]}
      >
        <Text style={styles.navButtonText}>{"<"}</Text>
      </TouchableOpacity>
      {paginationGroup().map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.pageItem,
            currentPage === item && styles.activePageItem,
          ]}
          onPress={() => setPage(item)}
          disabled={item > totalPages}
        >
          <Text
            style={[
              styles.pageText,
              currentPage === item && styles.activePageText,
            ]}
          >
            {item > totalPages ? "" : item}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={[styles.navButton, styles.specialButton]}
      >
        <Text style={styles.navButtonText}>{">"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setPage(totalPages)}
        style={[styles.navButton, styles.specialButton]}
      >
        <Text style={styles.navButtonText}>{">>"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  pageItem: {
    marginHorizontal: 2, // 버튼 사이의 간격을 줄입니다
    width: 25, // 모든 버튼의 고정된 너비
    height: 25, // 모든 버튼의 고정된 높이
    borderWidth: 1, // 테두리 선의 두께를 줄입니다
    borderColor: "blue",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee", // 선택되지 않은 버튼의 기본 배경색
  },
  activePageItem: {
    backgroundColor: "blue", // 선택된 항목의 배경색
  },
  pageText: {
    color: "blue", // 선택되지 않은 항목의 텍스트 색상
    fontSize: 14, // 필요한 경우 글꼴 크기 조정
  },
  activePageText: {
    color: "#FFFFFF", // 선택된 항목의 텍스트 색상
  },
  navButton: {
    marginHorizontal: 2, // 버튼 사이의 간격을 줄입니다
    width: 25, // 모든 버튼의 고정된 너비
    height: 25, // 모든 버튼의 고정된 높이
    borderWidth: 1, // 테두리 선의 두께를 줄입니다
    borderColor: "blue",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 16, // 필요한 경우 글꼴 크기 조정
    color: "blue",
  },
});

export default Pagination;
