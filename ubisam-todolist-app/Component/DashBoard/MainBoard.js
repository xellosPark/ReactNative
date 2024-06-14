import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Pagination from "./Page/Pagination";

const ITEMS_PER_PAGE = 5;

const MainBoard = ({ board, toggleModifyButton, refreshControl, filterName, selectProject }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedItems, setExpandedItems] = useState([]);
  const [boardData, setBoard] = useState([]);
  const [changeData, setChangeData] = useState([]);

  const [selectedTab, setSelectedTab] = useState('전체');
  const [tab, setTab] = useState([]);
  const [filteredName, setFilteredName] = useState('전체');
  const handleTabSelection = async (tabs) => {
    setSelectedTab(tabs); //이름
    setCurrentPage(1);
    //console.log('handleTabSelection 29', tabs, filterName, filteredName);
    if (tabs === '전체') {
      if (filterName === '전체') {
        await setChangeData(boardData);
      } else {
        await OnFilterName(tabs);
      }
      
    }
    else {
      if (filterName === '전체') {
        await filterData(tabs);
      } else {
        await OnFilterName(tabs);
      }
    }
  };

  const setData = async () => {
    const transformedData = board.map((item, i) => {
      const baseItem = {
          id: item.Index,
          key: item?.Key,
          content: item?.Content || "",
          date: item?.Date,
          changedate: item?.ChangeDate,
          projectName: selectProject,
          name: item?.Name,
          title: item?.Title,
          status: item?.Status,
          Requester: item?.Requester,
          ReqManager: item?.ReqManager,
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
    const nameTab = new Set(transformedData.map(item => item.name));
    await setTab([...initialTabs, ...nameTab]);
    
  };

  const filterData = async (tabItem) => {
    //console.log('filterName 63', filterName, tab, boardData);
    const data = await boardData.filter(item => item.name === tabItem);
    await setChangeData(data);
  };

  const OnFilterName =  async (tabs) => {
    let data =[];
    const Data = await boardData.filter(item => {
      // details가 존재하고 길이가 0보다 크면, 마지막 details의 Status를 확인
      if (item.details && item.details.length > 0) {
          return item.details[item.details.length - 1].Status === filterName;
      }
      // 그렇지 않으면, item의 Status만 확인
      return item.status === filterName;
    });
    
    
    ////name비교
    if (tabs === '전체') {
      data = Data;
    } else {
      data = await Data.filter(item => item.name === tabs);
    }
    //console.log('OnFilterName 91', filterName, tabs);
    await setChangeData(data);
  }

  useEffect(() => {
    setData();
    setSelectedTab('전체');
    setFilteredName('전체');
  }, [board]);

  useEffect(() => {
    const tabSelection = async () => {
      await setFilteredName(filterName);
      await setSelectedTab('전체');
      await setCurrentPage(1);
      await handleTabSelection('전체');
    }
    tabSelection();

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
                {`${item.id} | ${
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
              {item.content?.length > 60 && (
                <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                  <Text style={styles.moreButton}>
                    {expandedItems.includes(item.id) ? "접기" : "더 보기"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.todoColumn}>
              <View style={styles.subcontainer}>
                <Text style={styles.subcontainer}>
                  {item.changedate === null ? item.date : item.changedate}</Text>
                <Text
                  style={[
                    styles.status,
                    { backgroundColor: getStatusColor(item.details === undefined ? item.status : item.details[0].Status) },
                  ]}
                >
                  {item.details === undefined ? item.status : item.details[0].Status}
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
