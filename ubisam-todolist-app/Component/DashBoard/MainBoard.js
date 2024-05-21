import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
  TouchableWithoutFeedback
} from "react-native";
import Pagination from "./Page/Pagination";
import FloatingButton from "../Layouts/MainView/FloatingButton/FloatingButton";

const ITEMS_PER_PAGE = 5;

const MainBoard = ({ board, toggleModifyButton, refreshControl, filterName }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItems, setExpandedItems] = useState([]);
  const [boardData, setBoard] = useState([]);
  const [changeData, setChangeData] = useState([]);

  const [selectedTab, setSelectedTab] = useState('전체');
  const [tab, setTab] = useState([]);
  //const [filterName, setFilterName] = useState('전체');
  const handleTabSelection = async (tabs) => {
    setSelectedTab(tabs);
    //console.log('handleTabSelection 29', tabs, filterName);
    if (tabs === '전체') {
      if (filterName === '전체') {
        await setChangeData(boardData);
      } else {
        OnFilterName(tabs);
      }
      
    }
    else {
      if (filterName === '전체') {
        await filterData(tabs);
      } else {
        OnFilterName(tabs);
      }
    }
  };

  const setData = async () => {
    // const data = Array.from({ length: board.length }, (_, i) => {
    //   const item = board[i];
    //   if (item.details && item.details.length > 0) {
    //     return {
    //       id: i + 1,
    //       key: item.Key,
    //       content: item?.Content === undefined ? "" : item.Content,
    //       date: item?.Date,
    //       changedate: item?.ChangeDate,
    //       name: item?.Name,
    //       title: item?.Title,
    //       status: item?.Status,
    //       details: item?.details,
    //     };
    //   }
    //   else {
    //     return {
    //       id: i + 1,
    //       key: item.Key,
    //       content: item?.Content === undefined ? "" : item.Content,
    //       date: item?.Date,
    //       changedate: item?.ChangeDate,
    //       name: item?.Name,
    //       title: item?.Title,
    //       status: item?.Status,
    //     };
    //   }
      
    // });
    const transformedData = board.map((item, i) => {
      const baseItem = {
          id: i + 1,
          key: item?.Key,
          content: item?.Content || "",
          date: item?.Date,
          changedate: item?.ChangeDate,
          name: item?.Name,
          title: item?.Title,
          status: item?.Status,
      };
      if (item.details && item.details.length > 0) {
          return {
              ...baseItem,
              details: item.details,
          };
      }
      return baseItem;
  });
    setBoard(transformedData);
    await setChangeData(transformedData);

    
    // 먼저 '전체'를 포함하는 배열 생성
    const initialTabs = ['전체'];
    // 데이터에서 이름 추출 후 중복 제거
    const naneTab = new Set(transformedData.map(item => item.name));
    await setTab([...initialTabs, ...naneTab]);
    
  };

  const filterData = async (tabItem) => {
    //console.log('filterName 63', filterName, tab, boardData);
    const data = await boardData.filter(item => item.name === tabItem);
    console.log('filter data', data);
    await setChangeData(data);
  };

  const OnFilterName =  async (tabs) => {
    //console.log('OnFilterName 81', filterName);
    let data =[];
    ///////////////
    ///데이터 일부 사라져있음 다시 확인할 필요있음 2222222
    //////////////
    const Data = await boardData.filter(item => item.status === filterName);
    if (tabs === '전체') {
      //console.log('여기 85');
      data = Data;
    } else {
      data = await Data.filter(item => item.name === tabs);
    }
    
    //console.log('OnFilterName 91', filterName, tabs);
    await setChangeData(data);
  }

  useEffect(() => {
    //console.log('MainBoard 95', );
    setData();
    setSelectedTab('전체');
  }, [board]);

  useEffect(() => {
    //setData();
    //filterData(tab);
    //console.log('filterName 변경', filterName);
    setSelectedTab('전체');
    handleTabSelection('전체');
    
  }, [filterName]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = changeData?.slice(indexOfFirstItem, indexOfLastItem);

  const toggleExpand = (id) =>
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const handlePress = (item) => {
    toggleModifyButton(item);
  };

  ////////////////////////////////////////////////////////////

  ////
  return (
    <View style={styles.parentContainer}>
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
      {currentItems.length > 0 ? (
      <FlatList style={styles.flatlist}
        data={currentItems}
        keyExtractor={(item) => `${item.key}`} // 유일한 키 보장 id -> key로 변경(DB와 맞춤)
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)} activeOpacity={0.7}>
          <View style={styles.row}>
            <View style={styles.contentColumn}>
              <Text style={[styles.title, styles.titleSpacing]}>
                {`${item.key} | ${
                  item.title.length > 25 ? item.title.slice(0, 25) + "..." : item.title
                }`}
              </Text>
              <Text style={styles.todo}>👤{item.name}</Text>
  
              <Text
                style={styles.content}
                numberOfLines={expandedItems.includes(item.id) ? null : 3}
              >
                {item.content}
              </Text>
              {item.content?.length > 100 && (
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
          </TouchableOpacity>
          
        )}
        ListFooterComponent={
          <Pagination style={styles.page}
            totalItems={changeData.length}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        }
        refreshControl={refreshControl}
      />
    ) : (
      <View style={styles.other}>
        <Text>해당 To Do List 없음!</Text>
      </View>
    )}
    {/* {currentItems.length > 0 ? (
      <Pagination
        style={styles.page} // 간격 없이 직접 추가
        totalItems={changeData.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      /> ) : (<Text></Text>)} */}
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
  parentContainer: {
    flex:1
  },
  flatlist: {
    flex:1
  },
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
  other: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 12,
    margin: 20,
  },
});

export default MainBoard;
