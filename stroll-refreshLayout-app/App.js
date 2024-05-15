// 필요한 라이브러리를 임포트합니다.
import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, RefreshControl, StyleSheet } from 'react-native';

const App = () => {
  // 게시글을 저장할 상태와 새로고침 상태를 정의합니다.
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // 새로고침 함수를 정의합니다.
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPosts().then(() => setRefreshing(false));
  }, []);

  // 게시글을 불러오는 함수를 정의합니다.
  const fetchPosts = async () => {
    const fetchedPosts = Array.from({ length: 30 }, (_, index) => ({
      id: index,
      title: `게시글 ${index + 1}`
    }));
    setPosts(fetchedPosts);
  };

  // 컴포넌트가 마운트될 때 게시글을 불러옵니다.
  useEffect(() => {
    fetchPosts();
  }, []);

  // 화면에 보여질 컴포넌트를 렌더링합니다.
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.post}>{item.title}</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

// 스타일을 정의합니다.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  post: {
    padding: 20,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default App;