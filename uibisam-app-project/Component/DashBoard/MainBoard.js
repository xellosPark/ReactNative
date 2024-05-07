import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import Pagination from "./Page/Pagination";
import FloatingButton from "../Layouts/MainView/FloatingButton/FloatingButton";

const ITEMS_PER_PAGE = 5;

const MainBoard = ({ board, selected }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItems, setExpandedItems] = useState([]);
  const [boardData, setBoard] = useState([]);
  const [changeData, setChangeData] = useState([]);

  const [selectedTab, setSelectedTab] = useState('전 체');
  const [tab, setTab] = useState([]);
  const handleTabSelection = async (tab) => {
    console.log('tab 클릭 25', tab);
    setSelectedTab(tab);
    if (tab === '전 체') {
      console.log('전 체 클릭, ', boardData);
      await setChangeData(boardData);
    }
    else await filterData(tab);

  };

  const setData = async () => {
    console.log("setData 17");
    const data = Array.from({ length: board.length }, (_, i) => {
      const item = board[i];
      return {
        id: i + 1,
        content: item?.Content === undefined ? "" : item.Content,
        date: item?.Date,
        changedate: item?.ChangeDate,
        name: item?.Name,
        title: item?.Title,
        ToDoList: `${
          new Date(2024, 3, 22 + i).toISOString().split("T")[0]
        } - Test ${i + 1}`,
        status: item?.Status,
      };
    });
    //console.log("data 31", data);
    setBoard(data);
    await setChangeData(data);

    
    // 먼저 '전체'를 포함하는 배열 생성
    const initialTabs = ['전 체'];
    // 데이터에서 이름 추출 후 중복 제거
    const naneTab = new Set(data.map(item => item.name));
    await setTab([...initialTabs, ...naneTab]);
    
  };

  const filterData = async (tab) => {
    const data = boardData.filter(item => item.name === tab );
    await setChangeData(data);
  };

  useEffect(() => {
    setData();
  }, [board]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = changeData?.slice(indexOfFirstItem, indexOfLastItem);

  const toggleExpand = (id) =>
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  ////////////////////////////////////////////////////////////

  ////
  return (
    <View>
      <View style={styles.tabsContainer}>
        {tab.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab ? styles.activeTab : {}
            ]}
            onPress={() => handleTabSelection(tab)}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={currentItems}
        keyExtractor={(item) => `${item.id}`} // 유일한 키 보장
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.contentColumn}>
              <Text style={[styles.title, styles.titleSpacing]}>
                {`${item.id} | ${
                  item.title.length > 25 ? item.title.slice(0, 25) + "..." : item.title
                }`}
              </Text>
              <Text style={styles.todo}>👤{item.name}</Text>
  
              <Text
                style={styles.content}
                numberOfLines={expandedItems.includes(item.id) ? null : 1}
              >
                {item.content}
              </Text>
              {item.content?.length > 50 && (
                <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                  <Text style={styles.moreButton}>
                    {expandedItems.includes(item.id) ? "접기" : "더 보기"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.todoColumn}>
              <View style={styles.subcontainer}>
                <Text style={styles.subcontainer}>{item.date}</Text>
                <Text
                  style={[
                    styles.status,
                    { backgroundColor: getStatusColor(item.status) },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
      <Pagination
        style={styles.page} // 간격 없이 직접 추가
        totalItems={changeData.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </View>
  );
};

function getStatusColor(status) {
  switch (status) {
    case "대기":
      return "#CCCCFF"; // 대기 상태일 때 파란색
    case "진행중":
      return "#ADD8E6"; // 진행중 상태일 때 주황색
    case "완료":
      return "#FFD700"; // 완료 상태일 때 녹색
    case "이슈":
      return "#FFC0CB"; // 이슈가 있을 때 빨간색
    default:
      return "#CCCCFF"; // 기본 색상
  }
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#375A7F',
    paddingVertical: 7
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 5
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    paddingHorizontal: 0, // 좌우 여백 추가로 밑줄 길이 감소
    marginHorizontal: 5, // 가로 여백 추가로 밑줄 가운데 위치
  },
  tabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  row: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    padding: 10,
  },
  container: {
    flexDirection: "row", // 자식 요소들을 수평으로 배열
    justifyContent: "space-between", // 요소들을 양쪽 끝에 정렬
    alignItems: "center", // 요소들을 세로 방향으로 중앙에 정렬
  },
  subcontainer: {
    textAlign: "right",
  },
  contentColumn: {
    flex: 10,
  },
  todoColumn: {},
  title: {
    fontWeight: "bold",
    fontSize: 14,
  },
  titleSpacing: {
    marginBottom: 5, // 타이틀과 컨텐츠 사이의 간격 추가
  },
  moreButton: {
    color: "blue",
  },
  todo: {
    fontSize: 12,
  },
  status: {
    fontSize: 12,
    color: "#2e2e2e",
    padding: 4,
    borderRadius: 10,
    display: "flex",
    textAlign: "center",
    marginLeft: 15,
  },
  page: {
    borderBottomWidth: 1,
  },
  content: {
    marginTop: 10,
  },
});

export default MainBoard;
